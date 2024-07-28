use crate::schema::users;
use serde::{Deserialize, Serialize};
use diesel::{Queryable, Insertable};

#[derive(Queryable, Insertable, Debug, Deserialize, Serialize)]
#[table_name = "users"]
pub struct User {
    pub id: i32,
    pub username: String,
    pub password: String,
}