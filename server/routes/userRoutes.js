import express from "express";
const router = express.Router();

import {
  authController,
  loginController,
  registerController,
} from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

router.route("/login").post(loginController);
router.route("/register").post(registerController);
router.route("/userData").post(authMiddleware, authController);

export default router;
