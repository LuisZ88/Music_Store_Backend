const res = require("express/lib/response");
const User = require("../models/User");
const auth = require("../middlewares/authjwt")

const userCtrl = require("../controllers/auth.controller"),
  express = require("express"),
  router = express.Router(),
  bcrypt = require("bcryptjs");
require("dotenv").config();


router.post("/signUp", userCtrl.signUp);
router.post("/login", userCtrl.login);
router.put("/updateUser",auth.verifyToken, userCtrl.updateUser);
router.delete("/deleteUser",auth.verifyToken, userCtrl.deleteUser);
router.get("/allUser/",[auth.verifyToken, auth.isAdmin], userCtrl.getAllUser);
router.get("/getUser/:id",auth.verifyToken, userCtrl.getUserById);
router.get("/getUser",auth.verifyToken, userCtrl.getUser);
router.get('/validateUser', auth.verifyToken, userCtrl.validateUser)
router.get('/validateAdmin', [auth.verifyToken, auth.isAdmin],userCtrl.validateAdmin)
router.put('/updateInvoice', auth.verifyToken, userCtrl.uploadInvoice)


module.exports = router;
