const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const Role = require("../models/Role");
const User = require("../models/User");
require("dotenv").config();

const auth = {
  verifyToken: (req, res, next) => {
    try {
      const token = req.header("Authorization");
      if (!token) {
        return res.status(403).send({
          success: false,
          message: "Invalid authentification",
        });
      }

      jwt.verify(token, process.env.SECRET, async (err, user) => {
        if (err) {
          return res.status(400).send({
            success: false,
            msg: "Invalid authentification(2)",
          });
        }
        req.user = user;
        
        next();
      });
    } catch (error) {
      return res.status(400).send({
        success: false,
        msg: error.message,
      });
    }
  },
  isAdmin: async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const roles = await Role.findOne({ _id: user.roles });

      if (roles.name === "admin") {
        next();
        return;
      }
      return res.status(403).send({
        success: false,
        msg: "Not enought permisions",
      });
    } catch (error) {
      return res.status(500).send({
        success: false,
        msg: error.message,
      });
    }
  },
};
module.exports = auth;
