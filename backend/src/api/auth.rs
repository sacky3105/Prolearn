use actix_web::{post, web, HttpResponse};
use jsonwebtoken::{encode, decode, Header, Algorithm, Validation, EncodingKey, DecodingKey};
use serde::{Deserialize, Serialize};
use chrono::{Utc, Duration};

#[derive(Debug, Serialize, Deserialize)]
struct Claims {
    sub: String,
    exp: usize,
}

const SECRET_KEY: &[u8] = b"your_secret_key";

#[post("/login")]
async fn login(user: web::Json<User>) -> HttpResponse {
    // ユーザー認証のロジックをここに追加
    let expiration = Utc::now()
        .checked_add_signed(Duration::seconds(60))
        .expect("valid timestamp")
        .timestamp() as usize;

    let claims = Claims { sub: user.username.clone(), exp: expiration };
    let token = encode(&Header::default(), &claims, &EncodingKey::from_secret(SECRET_KEY)).unwrap();

    HttpResponse::Ok().json(token)
}

#[post("/verify")]
async fn verify(token: web::Json<String>) -> HttpResponse {
    let token_data = decode::<Claims>(
        &token.into_inner(),
        &DecodingKey::from_secret(SECRET_KEY),
        &Validation::new(Algorithm::HS256),
    );

    match token_data {
        Ok(_) => HttpResponse::Ok().finish(),
        Err(_) => HttpResponse::Unauthorized().finish(),
    }
}

pub fn init(cfg: &mut web::ServiceConfig) {
    cfg.service(login);
    cfg.service(verify);
}

#[derive(Deserialize)]
struct User {
    username: String,
    password: String,
}
