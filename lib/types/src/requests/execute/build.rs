use resolver_api::derive::Request;
use serde::{Deserialize, Serialize};
use typeshare::typeshare;

use crate::entities::update::Update;

//

#[typeshare]
#[derive(Serialize, Deserialize, Debug, Clone, Request)]
#[response(Update)]
pub struct RunBuild {
    pub build_id: String,
}
