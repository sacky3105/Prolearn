use actix_web::{post, web, App, HttpResponse, HttpServer, Responder};

#[post("/compile")]
async fn compile_code(code: web::Json<String>) -> impl Responder {
    // コードコンパイルロジックをここに追加
    HttpResponse::Ok().json("コンパイル結果")
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    HttpServer::new(|| {
        App::new()
            .service(compile_code)
    })
    .bind("127.0.0.1:8080")?
    .run()
    .await
}
