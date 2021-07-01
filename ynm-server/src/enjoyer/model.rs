#![allow(proc_macro_derive_resolution_fallback)]

use crate::schema::enjoyers;

#[derive(Queryable, AsChangeset, Serialize, Deserialize, Debug)]
#[table_name = "enjoyers"]
pub struct Enjoyer {
    pub id: uuid::Uuid,
    pub enjoyername: String,
    pub password: String,
}

#[derive(Insertable, Serialize, Deserialize)]
#[table_name = "enjoyers"]
pub struct NewEnjoyer<'a> {
    pub enjoyername: &'a str,
    pub password: &'a str,
}
