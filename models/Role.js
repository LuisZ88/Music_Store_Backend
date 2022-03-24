const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    name: String,
  },
  { versionKey: false }
);
module.exports = mongoose.model("Role", roleSchema)