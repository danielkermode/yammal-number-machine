#![allow(proc_macro_derive_resolution_fallback)]
extern crate bcrypt;

use crate::enjoyer::model::Enjoyer;
use crate::enjoyer::model::EnjoyerInfo;
use bcrypt::{hash, DEFAULT_COST};
use diesel;
use diesel::prelude::*;
use diesel::result::Error;

use crate::schema::enjoyers;
use crate::schema::enjoyers::dsl::*;
use uuid::Uuid;

pub fn create_enjoyer(new_enjoyer: EnjoyerInfo, conn: &PgConnection) -> QueryResult<Enjoyer> {
    // Hash password before inserting into DB
    let hashed_password =
        hash(new_enjoyer.password, DEFAULT_COST).map_err(|_| Error::__Nonexhaustive)?;
    let hashed_enjoyer = EnjoyerInfo {
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

pub fn get_enjoyer_by_name(name: &str, connection: &PgConnection) -> QueryResult<Enjoyer> {
    enjoyers::table
        .filter(enjoyername.eq(name))
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
