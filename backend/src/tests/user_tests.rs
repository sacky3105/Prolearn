use actix_web::{test, App};
use diesel::prelude::*;
use diesel::r2d2::{self, ConnectionManager};
use std::env;
use crate::api::{create_user, establish_connection};
use crate::models::user::User;

type DbPool = r2d2::Pool<ConnectionManager<PgConnection>>;

#[actix_rt::test]
async fn test_create_user() {
    dotenv::from_filename(".env.test").ok();

    let pool = establish_connection();

    let mut app = test::init_service(
        App::new()
            .app_data(test::Data::new(pool.clone()))
            .service(create_user)
    ).await;

    let payload = r#"
    {
        "username": "testuser",
        "password": "testpassword"
    }
    "#;

    let req = test::TestRequest::post()
        .uri("/create_user")
        .set_payload(payload)
        .header("Content-Type", "application/json")
        .to_request();

    let resp = test::call_service(&mut app, req).await;
    assert!(resp.status().is_success());

    // 確認のためにデータベースをチェック
    let conn = pool.get().expect("couldn't get db connection from pool");
    let users: Vec<User> = users::dsl::users.load(&conn).expect("Error loading users");

    assert_eq!(users.len(), 1);
    assert_eq!(users[0].username, "testuser");
}
