const mongoose = require("mongoose"),
  User = require("../models/User"),
  bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const Role = require("../models/Role");

const userCtrl = {
  validateUser: async (req,res) =>{
    return res.json({auth: true,})
  },
  validateAdmin: async (req,res) =>{
    return res.json({auth: true,})
  },
  signUp: async (req, res) => {
    const { name, surname, email, password, roles } = req.body;

    try {
      if (!name || !surname || !email || !password) {
        return res.json({
          success: false,
          message: "empty fields",
        });
      }
      if (!isNaN(name) || !isNaN(surname))
        return res.json({
          success: false,
          message: "Letters only",
        });
      if ((name.length = 0) && (surname.length = 0))
        return res.json({ message: "empty field", success: false,});
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return res.json({
          success: false,
          message: "You have entered an invalid email address!",
        });
      }
      if (password.length < 5) {
        return res.json({
          success: false,
          message: "Password is too short!",
        });
      } else {
        let newUser = new User({
          name,
          surname,
          email,
          password: await User.encryptPassword(password),
        });

        if (roles) {
          const foundRoles = await Role.find({ name: { $in: roles } });
          newUser.roles = foundRoles.map((role) => role._id);
        } else {
          const role = await Role.findOne({ name: "client" });
          newUser.roles = [role._id];
        }
        const savedUser = await newUser.save();
        const token = jwt.sign({ id: savedUser._id }, process.env.SECRET, {
          expiresIn: 90000, //15 minutos //
        });
        return res.status(200).send({
          success: true,
          token,
          message: "Usuario creado",
          name: newUser.name,
          role: newUser.roles.name,
          expiresIn: "90000",
        });
      }
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }
  },
  updateUser: async (req, res) => {
    const id = req.user.id;
    const { email, password, adress, newPassword } = req.body;
    let userFound = await User.findById(id);

    let passwordOk = await User.comparePassword(password, userFound.password);

    try {
      if (!passwordOk) {
        return res.status(400).send({
          succes: false,
          message: "Wrong password",
        });
      }
      if (!newPassword || newPassword.length < 6) {
        return res.status(400).send({
          succes: false,
          message: "Create a new password",
        });
      }
      await User.findByIdAndUpdate(id, {
        password: await User.encryptPassword(newPassword),
        adress,
      });
      return res.status(200).send({
        success: true,
        message: "User modified",
      });
    } catch (error) {
      return res.status(500).send({
        succes: false,
        message: error.message,
      });
    }
  },
  deleteUser: async (req, res) => {
    const id = req.user.id;

    try {
      await User.findByIdAndDelete(id);
      return res.status(200).send({
        succes: true,
        message: "Usuario borrado",
      });
    } catch (error) {
      return res.status(500).send({
        succes: false,
        message: error.message,
      });
    }
  },
  getAllUser: async (req, res) => {
    try {
      let users = await User.find({});
      return res.status(200).send({
        succes: true,
        users,
      });
    } catch (error) {
      return res.status(500).send({
        succes: false,
        message: error.message,
      });
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      let user = await User.findById(id, { password: 0, roles: 0 });
      if (user != null) {
        return res.status(200).send({
          succes: true,
          user,
        });
      } else {
        return res.status(400).send({
          succes: false,
          message: "User not found",
        });
      }
    } catch (error) {
      return res.status(500).send({
        succes: false,
        message: error.message,
      });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      let userFound = await User.findOne({ email: email }).populate("roles");
      if (!userFound) {
        return res.json({
          success: false,
          message: "User not found",
        });
      }
      let passwordOk = await User.comparePassword(password, userFound.password);

      if (!passwordOk) {
        return res.json({
          success: false,
          message: "Contraseña incorrecta",
          token: null,
        });
      }
      const token = jwt.sign({ id: userFound._id }, process.env.SECRET, {
        expiresIn: 90000, //15 minutos //
      });
      return res.status(200).send({
        success: true,
        message: "Successful login",
        name: userFound.name,
        token: token,
        role: userFound.roles.name,
        expiresIn: "90000"
      });
    } catch (error) {
      return res.json({
        success: false,
        message: error.message,
      });
    }
  },
  getUser: async (req, res) => {
    const id = req.user.id;

    try {
      let user = await User.findById(id, { password: 0, roles: 0 });
      if (user != null) {
        return res.status(200).send({
          succes: true,
          user,
        });
      } else {
        return res.status(400).send({
          succes: false,
          message: "User not found",
        });
      }
    } catch (error) {
      return res.status(500).send({
        succes: false,
        message: error.message,
      });
    }
  },
  uploadInvoice: async (req, res) => {
    const id = req.user.id;
    const invoice = req.body;
    try {
      let user = await User.findByIdAndUpdate(id, { $push: {invoices: invoice } });
      return res.json({
        success: true,
      })
    } catch (error) {
      return res.status(500).send({
        succes: false,
        message: error.message,
      });
    }
  },
};
module.exports = userCtrl;
