use crate::track;
use rocket;
use rocket::Route;

pub fn create_routes() -> Vec<Route> {
    routes![track::handler::get_tracks]
}
