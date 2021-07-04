use serde::{Deserialize, Serialize};
use std::{
    fs::File,
    io::{BufReader, BufWriter},
    path::PathBuf,
};
use structopt::StructOpt;

#[derive(StructOpt)]
#[structopt(name = "ynm-blockchain", about = "CLI tool for the ynm blockchain")]
struct Cli {
    /// Generate new blockchain
    #[structopt(short, long)]
    new: bool,
    /// The path to the file to read
    #[structopt(parse(from_os_str), name = "FILE", required_if("new", "false"))]
    blockchain_file_name: Option<PathBuf>,
}

#[derive(Serialize, Deserialize, Debug, PartialEq)]
struct NewBlockchain {
    number: u16,
    thing: String,
}

fn main() {
    println!("Welcome to the ynm blockchain.");
    let args = Cli::from_args();

    // let new_bc = NewBlockchain {
    //     number: 12,
    //     thing: "thing".to_string(),
    // };

    // let file = File::create("bc.dat").unwrap();
    // let writer = BufWriter::new(file);

    // let _res = bincode::serialize_into(writer, &new_bc);

    let f = File::open("bc.dat").unwrap();
    let reader = BufReader::new(f);
    let red_data: Result<NewBlockchain, Box<bincode::ErrorKind>> =
        bincode::deserialize_from(reader);

    println!("{:?}", red_data.unwrap());
}
