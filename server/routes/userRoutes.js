import express from "express";
const router = express.Router();

import {
  loginController,
  registerController,
} from "../controllers/userController.js";

router.route("/login").post(loginController);
router.route("/register").post(registerController);
router.route("/test").get((req, res) => {
  res.send("Hello");
});

export default router;
