"use strict";
// db.js
import mongoose from "mongoose";

export default async function () {
  try {
    if (mongoose.connection.readyState !== 1) {
      mongoose.set("autoIndex", true);
      await mongoose.connect(process.env.MONGODB_HOST, {
        autoIndex: true,
      });
    }
  } catch (e) {
    console.log(e);
  }
}
