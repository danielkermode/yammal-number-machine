use diesel::result::{DatabaseErrorKind, Error};
use rocket::http::Status;
use std::env;

pub fn host() -> String {
    env::var("ROCKET_ADDRESS").expect("ROCKET_ADDRESS must be set")
}

pub fn port() -> String {
    env::var("ROCKET_PORT").expect("ROCKET_PORT must be set")
}

pub fn error_status(error: Error) -> Status {
    match error {
        Error::NotFound => Status::NotFound,
        Error::DatabaseError(DatabaseErrorKind::UniqueViolation, _err) => Status::Conflict,
        _ => Status::InternalServerError,
    }
}
