use rocket::http::Status;
use rocket_contrib::json::Json;
use std::str::FromStr;
use uuid::Uuid;

use super::model::Track;
use crate::connection::DbConn;
use crate::shared::helpers;
use crate::track;

#[get("/list")]
pub fn get_tracks(connection: DbConn) -> Result<Json<Vec<Track>>, Status> {
    track::repository::get_all_tracks(&connection)
        .map(|tracks| Json(tracks))
        .map_err(|error| helpers::error_status(error))
}

#[post("/increment/<uuid>")]
pub fn increment_track_stream(uuid: String, connection: DbConn) -> Result<Json<Track>, Status> {
    let uuid = Uuid::from_str(&uuid).map_err(|_| Status::BadRequest)?;

    track::repository::increment_track_stream(uuid, &connection)
        .map(|track| Json(track))
        .map_err(|error| helpers::error_status(error))
}
