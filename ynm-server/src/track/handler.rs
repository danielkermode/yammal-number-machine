use rocket::http::Status;
use rocket_contrib::json::Json;

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
