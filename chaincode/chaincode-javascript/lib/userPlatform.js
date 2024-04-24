/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Contract } = require("fabric-contract-api");

class UserPlatform extends Contract {
  async InitLedger(ctx) {
    const users = [
      {
        ID: "user1",
        Username: "John",
        Email: "john@gmail.com",
        Mob: "9988776655",
      },
      {
        ID: "user2",
        Username: "rohn",
        Email: "rohn@gmail.com",
        Mob: "9988776655",
      },
      {
        ID: "user3",
        Username: "bob",
        Email: "bob@gmail.com",
        Mob: "9988776655",
      },
    ];

    for (const user of users) {
      user.docType = "user";
      await ctx.stub.putState(user.ID, Buffer.from(JSON.stringify(user)));
      console.info(`User data ${user.ID} initialized`);
    }
  }

  // Create new users and store them into the couchdb database
  async CreateUser(ctx, id, username, email, mob) {
    const user = {
      ID: id,
      Username: username,
      Email: email,
      Mob: mob,
    };
    ctx.stub.putState(id, Buffer.from(JSON.stringify(user)));
    return JSON.stringify(user);
  }

  // Return user with given ID
  async getUser(ctx, id) {
    const userJSON = await ctx.stub.getState(id); // get the asset from chaincode state
    if (!userJSON || userJSON.length === 0) {
      throw new Error(`The user ${id} does not exist`);
    }
    return userJSON.toString();
  }

  // UpdateAsset updates an existing asset in the world state with provided parameters.
  async UpdateUser(ctx, id, username, email, mob) {
    const exists = await this.UserExists(ctx, id);
    if (!exists) {
      throw new Error(`The user ${id} does not exist`);
    }
    const updatedUser = {
      ID: id,
      Username: username,
      Email: email,
      Mob: mob,
    };
    return ctx.stub.putState(id, Buffer.from(JSON.stringify(updatedUser)));
  }

  // Returns true when user with given ID exists.
  async UserExists(ctx, id) {
    const userJSON = await ctx.stub.getState(id);
    return userJSON && userJSON.length > 0;
  }

  // Get history with given ID
  async getUserHistory(ctx, id) {
    const userJSON = await ctx.stub.getHistoryForKey(id);
    if (!userJSON || userJSON.length === 0) {
      throw new Error(`The user ${id} does not exist`);
    }
    const userData = userJSON.toString();
    return JSON.stringify(userData)
  }
}

module.exports = UserPlatform;
