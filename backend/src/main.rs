use actix_web::{web, App, HttpServer, Responder, HttpResponse};
use std::process::Command;
mod api;
mod utils;
mod models;
mod schema;

async fn start_lsp_server() -> impl Responder {
    // rust-analyzerを起動するコマンド
    Command::new("rust-analyzer")
        .spawn()
        .expect("Failed to start rust-analyzer");
    HttpResponse::Ok().body("LSP server started")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    utils::logger::init();

    let pool = api::database::establish_connection(); // データベース接続の確立

    HttpServer::new(move || {
        App::new()
            .route("/lsp/start", web::get().to(start_lsp_server))
            .app_data(web::Data::new(pool.clone())) // プールをアプリケーションに追加
            .configure(api::auth::init)
            .configure(api::database::init)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
