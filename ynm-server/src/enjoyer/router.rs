use rocket;

use crate::connection;
use crate::enjoyer;

#[get("/check")]
fn index() -> &'static str {
    "Rust server running!"
}

pub fn create_routes() {
    rocket::ignite()
        .manage(connection::init_pool())
        .mount("/api", routes![index])
        .mount(
            "/api/enjoyers",
            routes![
                enjoyer::handler::create_enjoyer,
                enjoyer::handler::get_enjoyer,
                enjoyer::handler::update_enjoyer
            ],
        )
        .launch();
}
