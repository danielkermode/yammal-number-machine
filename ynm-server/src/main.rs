use diesel::{QueryDsl, RunQueryDsl};

#[macro_use]
extern crate diesel;
extern crate dotenv;

mod db;
fn main() {
    let connection = db::establish_connection();

    use db::schema::enjoyers::dsl::*;

    let results = enjoyers.select(enjoyername).load::<String>(&connection);

    println!("{:?}", results);
}
