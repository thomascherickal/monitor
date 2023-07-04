use resolver_api::derive::Request;
use serde::{Deserialize, Serialize};
use typeshare::typeshare;

use crate::entities::{
    server::{PartialServerConfig, Server},
    update::Update,
};

//

#[typeshare]
#[derive(Serialize, Deserialize, Debug, Clone, Request)]
#[response(Server)]
pub struct CreateServer {
    pub name: String,
    pub config: PartialServerConfig,
}

//

#[typeshare]
#[derive(Serialize, Deserialize, Debug, Clone, Request)]
#[response(Server)]
pub struct DeleteServer {
    pub id: String,
}

//

#[typeshare]
#[derive(Serialize, Deserialize, Debug, Clone, Request)]
#[response(Server)]
pub struct UpdateServer {
    pub id: String,
    pub config: PartialServerConfig,
}

//

#[typeshare]
#[derive(Serialize, Deserialize, Debug, Clone, Request)]
#[response(Update)]
pub struct RenameServer {
    pub id: String,
    pub name: String,
}
