#![feature(decl_macro, proc_macro_hygiene)]
#[macro_use]
extern crate diesel;
extern crate dotenv;
extern crate r2d2;
extern crate r2d2_diesel;
#[macro_use]
extern crate rocket;
extern crate rocket_contrib;
#[macro_use]
extern crate serde_derive;

use dotenv::dotenv;
use rocket::http::Method;
use rocket_cors::{AllowedHeaders, AllowedOrigins};

mod connection;
mod enjoyer;
mod schema;

#[get("/check")]
fn index() -> &'static str {
    "Rust server running!"
}

fn main() -> () {
    dotenv().ok();

    let allowed_origins = AllowedOrigins::All;

    let cors = rocket_cors::CorsOptions {
        allowed_origins,
        allowed_methods: vec![Method::Get, Method::Post]
            .into_iter()
            .map(From::from)
            .collect(),
        allowed_headers: AllowedHeaders::all(),
        allow_credentials: true,
        ..Default::default()
    }
    .to_cors()
    .unwrap_or_else(|e| panic!("{}", e));

    let launch_error = rocket::ignite()
        .manage(connection::init_pool())
        .mount("/api", routes![index])
        .mount("/api/enjoyers", enjoyer::router::create_routes())
        .attach(cors)
        .launch();

    drop(launch_error)
}
