import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import User from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { email, name, password } = req.body;
  try {
    let user = User.findOne({ email });
    if (user) {
      return res
        .status(200)
        .json({ status: false, message: "User Already Exists!!" });
    }
    user = new User({ email, name, password });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    await user.save();
    res
      .status(200)
      .json({ status: true, message: "User Registered Successfully!!" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error!!" });
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "User doesn't exist!!" });
    }
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ status: false, message: "Invalid Credentials" });
    }

    const payload = { username: user.name, created_at: new Date().getTime() };
    const secret = process.env.JWT_SECRET;
    let token = jwt.sign(payload, secret);
    res
      .status(200)
      .json({ status: true, message: "Login Successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
