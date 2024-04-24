/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const userPlatform= require("./lib/userPlatform");

module.exports.UserPlatform = userPlatform;
module.exports.contracts = [userPlatform];
