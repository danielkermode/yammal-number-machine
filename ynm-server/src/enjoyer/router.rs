use crate::enjoyer;
use rocket;
use rocket::Route;

pub fn create_routes() -> Vec<Route> {
    routes![
        enjoyer::handler::create_enjoyer,
        enjoyer::handler::get_enjoyer,
        enjoyer::handler::update_enjoyer,
        enjoyer::handler::login,
        enjoyer::handler::logout
    ]
}
