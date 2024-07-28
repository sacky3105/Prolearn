use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use actix_web::{web, HttpResponse, post};
use serde::Deserialize;
use std::env;
use crate::models::user::User;  // ユーザーモデルのインポート

type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

#[derive(Debug, Deserialize)]
struct NewUser {
    username: String,
    password: String,
}

#[post("/create_user")]
async fn create_user(pool: web::Data<DbPool>, user: web::Json<NewUser>) -> HttpResponse {
    use crate::schema::users::dsl::*;

    let conn = pool.get().expect("couldn't get db connection from pool");

    // ユーザー作成のロジックをここに追加
    let new_user = User {
        id: 0,
        username: user.username.clone(),
        password: user.password.clone(),
    };

    HttpResponse::Ok().finish()
}

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(create_user);
}

pub fn establish_connection() -> DbPool {
    dotenv::dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    let manager = ConnectionManager::<PgConnection>::new(database_url);
    r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create pool.")
}
