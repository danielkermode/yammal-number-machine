table! {
    enjoyers (id) {
        id -> Uuid,
        enjoyername -> Varchar,
        password -> Varchar,
    }
}

table! {
    tracks (id) {
        id -> Uuid,
        uri -> Varchar,
        name -> Varchar,
        streams -> Nullable<Int8>,
    }
}

allow_tables_to_appear_in_same_query!(enjoyers, tracks,);
