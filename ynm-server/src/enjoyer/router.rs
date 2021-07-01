use rocket;

use crate::connection;
use crate::enjoyer;

pub fn create_routes() {
    rocket::ignite()
        .manage(connection::init_pool())
        .mount(
            "/enjoyers",
            routes![
                enjoyer::handler::create_enjoyer,
                enjoyer::handler::get_enjoyer,
                enjoyer::handler::update_enjoyer
            ],
        )
        .launch();
}
