#![allow(proc_macro_derive_resolution_fallback)]

use crate::schema::tracks;
#[derive(Queryable, Identifiable, Serialize, Deserialize)]
#[table_name = "tracks"]
pub struct Track {
    pub id: uuid::Uuid,
    pub uri: String,
    pub name: String,
    pub streams: Option<i64>,
}
