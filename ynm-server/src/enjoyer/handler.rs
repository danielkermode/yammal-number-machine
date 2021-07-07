use diesel::result::{DatabaseErrorKind, Error};
use rocket::http::Cookie;
use rocket::http::Cookies;
use rocket::http::Status;
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
    let enjoyer_result =
        enjoyer::repository::get_enjoyer_by_name(login_info.enjoyername, &connection);

    let enjoyer_id = enjoyer_result.as_ref().unwrap().id.to_string();
    cookies.add_private(Cookie::new("user_id", enjoyer_id));

    return enjoyer_result
        .map(|enjoyer| verify_enjoyer(enjoyer, login_info))
        .map_err(|error| error_status(error));
}

fn verify_enjoyer(enjoyer: Enjoyer, login_info: Json<EnjoyerInfo>) -> Json<Uuid> {
    let _valid = verify(login_info.password, &enjoyer.password).unwrap();

    Json(enjoyer.id)
}

#[get("/<id>")]
pub fn get_enjoyer(id: String, connection: DbConn) -> Result<Json<Enjoyer>, Status> {
    let uuid = Uuid::from_str(&id).expect("valid UUID string");
    enjoyer::repository::get_enjoyer(uuid, &connection)
        .map(|enjoyer| Json(enjoyer))
        .map_err(|error| error_status(error))
}

#[put("/<id>", format = "application/json", data = "<enjoyer>")]
pub fn update_enjoyer(
    id: String,
    enjoyer: Json<Enjoyer>,
    connection: DbConn,
) -> Result<Json<Enjoyer>, Status> {
    let uuid = Uuid::from_str(&id).expect("valid UUID string");
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
