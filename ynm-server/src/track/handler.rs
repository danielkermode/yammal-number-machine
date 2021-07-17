use rocket::http::Status;
use rocket_contrib::json::Json;
use std::str::FromStr;
use uuid::Uuid;

use super::model::Track;
use super::repository;
use crate::connection::DbConn;
use crate::shared::helpers;

#[get("/list")]
pub fn get_tracks(connection: DbConn) -> Result<Json<Vec<Track>>, Status> {
    repository::get_all_tracks(&connection)
        .map(Json)
        .map_err(helpers::error_status)
}

#[post("/increment/<uuid>")]
pub fn increment_track_stream(uuid: String, connection: DbConn) -> Result<Json<Track>, Status> {
    let uuid = Uuid::from_str(&uuid).map_err(|_| Status::BadRequest)?;

    repository::increment_track_streams(uuid, &connection)
        .map(Json)
        .map_err(helpers::error_status)
}
