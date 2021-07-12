#![allow(proc_macro_derive_resolution_fallback)]
use diesel::{PgConnection, QueryResult, RunQueryDsl};

use crate::schema::tracks;

use super::model::Track;

pub fn get_all_tracks(connection: &PgConnection) -> QueryResult<Vec<Track>> {
    tracks::table.load::<Track>(connection)
}
