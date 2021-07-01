#![allow(proc_macro_derive_resolution_fallback)]
extern crate bcrypt;

use crate::enjoyer::model::Enjoyer;
use crate::enjoyer::model::NewEnjoyer;
use bcrypt::{hash, DEFAULT_COST};
use diesel;
use diesel::prelude::*;

use uuid::Uuid;

use crate::schema::enjoyers;

pub fn create_enjoyer(new_enjoyer: NewEnjoyer, conn: &PgConnection) -> QueryResult<Enjoyer> {
    // Hash password before inserting into DB
    let hashed_password = hash(new_enjoyer.password, DEFAULT_COST).unwrap();
    let hashed_enjoyer = NewEnjoyer {
        enjoyername: new_enjoyer.enjoyername,
        password: &hashed_password,
    };
    diesel::insert_into(enjoyers::table)
        .values(&hashed_enjoyer)
        .get_result(conn)
}

pub fn get_enjoyer(enjoyer_id: Uuid, connection: &PgConnection) -> QueryResult<Enjoyer> {
    enjoyers::table
        .find(enjoyer_id)
        .get_result::<Enjoyer>(connection)
}

pub fn update_enjoyer(
    enjoyer_id: Uuid,
    enjoyer: Enjoyer,
    connection: &PgConnection,
) -> QueryResult<Enjoyer> {
    diesel::update(enjoyers::table.find(enjoyer_id))
        .set(&enjoyer)
        .get_result(connection)
}
