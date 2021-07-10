use diesel::result::{DatabaseErrorKind, Error};
use rocket::http::Cookie;
use rocket::http::Cookies;
use rocket::http::RawStr;
use rocket::http::Status;
use rocket::request::{self, FromRequest, Request};
use rocket::response::status;
use rocket_contrib::json::Json;
use std::env;
use std::str::FromStr;
use uuid::Uuid;

use crate::connection::DbConn;
use crate::enjoyer;
use crate::enjoyer::model::Enjoyer;
use crate::enjoyer::model::EnjoyerInfo;
use crate::enjoyer::model::EnjoyerResponse;

use bcrypt::verify;

pub struct VerifiedEnjoyerUuid {
    value: Uuid,
}

impl<'a, 'r> FromRequest<'a, 'r> for VerifiedEnjoyerUuid {
    fn from_request(req: &'a Request<'r>) -> request::Outcome<Self, Self::Error> {
        let segment: &RawStr = req
            .get_param(0)
            .and_then(|r| r.ok())
            .unwrap_or("bad segment".into());
        let uuid = Uuid::from_str(segment)
            .map_err(|_| (Status::BadRequest, "Invalid uuid in segment".to_string()))?;
        req.cookies().get_private("ynm_auth").map_or(
            request::Outcome::Failure((Status::Forbidden, "No auth cookie".to_string())),
            |c| compare_cookie_to_uuid(c, uuid),
        )
    }

    type Error = String;
}

fn compare_cookie_to_uuid(
    c: Cookie,
    uuid: Uuid,
) -> request::Outcome<VerifiedEnjoyerUuid, <VerifiedEnjoyerUuid as FromRequest>::Error> {
    let valid_cookie = Uuid::from_str(c.value())
        .map_err(|_| (Status::Forbidden, "Invalid cookie uuid".to_string()))?;
    if valid_cookie == uuid {
        request::Outcome::Success(VerifiedEnjoyerUuid { value: uuid })
    } else {
        request::Outcome::Failure((Status::Forbidden, "Cookie does not match uuid".to_string()))
    }
}

#[post("/", format = "application/json", data = "<new_enjoyer>")]
pub fn create_enjoyer(
    new_enjoyer: Json<EnjoyerInfo>,
    connection: DbConn,
) -> Result<status::Created<Json<EnjoyerResponse>>, Status> {
    enjoyer::repository::create_enjoyer(new_enjoyer.into_inner(), &connection)
        .map(|enjoyer| enjoyer_created(enjoyer))
        .map_err(|error| error_status(error))
}

#[post("/login", format = "application/json", data = "<login_info>")]
pub fn login(
    login_info: Json<EnjoyerInfo>,
    mut cookies: Cookies,
    connection: DbConn,
) -> Result<Json<Uuid>, Status> {
    let enjoyer = enjoyer::repository::get_enjoyer_by_name(login_info.enjoyername, &connection)
        .map_err(|error| error_status(error))?;

    let enjoyer_id = (&enjoyer.id).to_string();
    let mut auth_cookie = Cookie::new("ynm_auth", enjoyer_id);
    auth_cookie.set_secure(true);
    cookies.add_private(auth_cookie);

    let valid_password =
        verify(login_info.password, &enjoyer.password).map_err(|_| Status::InternalServerError)?;

    if valid_password {
        Ok(Json(enjoyer.id))
    } else {
        Err(Status::Forbidden)
    }
}

#[get("/<_uuid>")]
pub fn get_enjoyer(
    _uuid: String,
    verified_uuid: VerifiedEnjoyerUuid,
    connection: DbConn,
) -> Result<Json<EnjoyerResponse>, Status> {
    enjoyer::repository::get_enjoyer(verified_uuid.value, &connection)
        .map(|enjoyer| {
            Json(EnjoyerResponse {
                id: enjoyer.id,
                enjoyername: enjoyer.enjoyername,
            })
        })
        .map_err(|error| error_status(error))
}

#[put("/<id>", format = "application/json", data = "<enjoyer>")]
pub fn update_enjoyer(
    id: String,
    enjoyer: Json<Enjoyer>,
    connection: DbConn,
) -> Result<Json<Enjoyer>, Status> {
    let uuid = Uuid::from_str(&id).map_err(|_| Status::BadRequest)?;
    enjoyer::repository::update_enjoyer(uuid, enjoyer.into_inner(), &connection)
        .map(|enjoyer| Json(enjoyer))
        .map_err(|error| error_status(error))
}

fn enjoyer_created(enjoyer: Enjoyer) -> status::Created<Json<EnjoyerResponse>> {
    let enjoyer_response = EnjoyerResponse {
        id: enjoyer.id,
        enjoyername: enjoyer.enjoyername,
    };
    status::Created(
        format!(
            "{host}:{port}/enjoyer/{id}",
            host = host(),
            port = port(),
            id = enjoyer.id
        )
        .to_string(),
        Some(Json(enjoyer_response)),
    )
}

fn host() -> String {
    env::var("ROCKET_ADDRESS").expect("ROCKET_ADDRESS must be set")
}

fn port() -> String {
    env::var("ROCKET_PORT").expect("ROCKET_PORT must be set")
}

fn error_status(error: Error) -> Status {
    match error {
        Error::NotFound => Status::NotFound,
        Error::DatabaseError(DatabaseErrorKind::UniqueViolation, _err) => Status::Conflict,
        _ => Status::InternalServerError,
    }
}
