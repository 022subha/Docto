import express from "express";
const router = express.Router();

import {
  loginController,
  registerController,
} from "../controllers/userController.js";

router.route("/login").post(loginController);
router.route("/register").post(registerController);

export default router;
