extern crate dotenv;
#[macro_use]
extern crate serde_derive;
use dotenv::dotenv;
use postgres::{Client, NoTls};
use std::env;

#[derive(Deserialize, Debug)]
#[serde(rename_all = "camelCase")]
struct Statistics {
    view_count: String,
}

#[derive(Deserialize, Debug)]
struct ResponseItem {
    statistics: Statistics,
}

#[derive(Deserialize, Debug)]
struct Response {
    items: Vec<ResponseItem>,
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    dotenv().ok();
    let url = format!(
        "https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id={}&key={}",
        env::var("YOUTUBE_VIDEO_ID")?,
        env::var("API_KEY")?
    );
    let resp: Response = reqwest::blocking::get(url)?.json()?;

    let view_count = resp.items[0].statistics.view_count.parse::<i64>()?;
    let db_url = env::var("DATABASE_URL")?;
    let mut client = Client::connect(&db_url, NoTls)?;
    let track_name = env::var("TRACK_NAME")?;
    client
        .execute(
            "update tracks set streams=$1 where name=$2;",
            &[&view_count, &track_name],
        )
        .expect("Error executing query");
    Ok(())
}
