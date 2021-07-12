#![allow(proc_macro_derive_resolution_fallback)]
use std::io::stdin;

use crate::schema::tracks::dsl::*;
use diesel::prelude::*;
use diesel::{PgConnection, QueryResult, RunQueryDsl};
use uuid::Uuid;

use crate::schema::tracks;

use super::model::Track;

pub fn get_all_tracks(connection: &PgConnection) -> QueryResult<Vec<Track>> {
    tracks::table.load::<Track>(connection)
}

pub fn increment_track_stream(uuid: Uuid, connection: &PgConnection) -> QueryResult<Track> {
    diesel::update(tracks::table.find(uuid))
        .set(streams.eq(streams + 1))
        .get_result(connection)
}
