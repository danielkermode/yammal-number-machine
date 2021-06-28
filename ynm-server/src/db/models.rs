use diesel::sql_types::Uuid;

#[derive(Queryable)]
pub struct Enjoyer {
    pub id: Uuid,
    pub enjoyername: String,
    pub password: String,
}

use super::schema::enjoyers;

#[derive(Insertable)]
#[table_name = "enjoyers"]
pub struct NewPost<'a> {
    pub enjoyername: &'a str,
    pub password: &'a str,
}
