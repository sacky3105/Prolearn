use super::super::schema::users;
use serde::Deserialize;

#[derive(Queryable, Insertable, Debug, Deserialize)]
#[table_name = "users"]
pub struct User {
    pub id: i32,
    pub username: String,
    pub password: String,
}
