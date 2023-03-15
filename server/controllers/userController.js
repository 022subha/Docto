import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  const { email, username, password } = req.body;
  try {
    let existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(200)
        .json({ status: false, message: "User Already Exists!!" });
    }
    let newUser = new User({ email, name: username, password });
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(password, salt);
    await newUser.save();
    return res
      .status(201)
      .json({ status: true, message: "User Registered Successfully!!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ status: false, message: "Internal Server Error!!" });
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    let existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(201).json({ message: "User doesn't exist!!" });
    }
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res
        .status(202)
        .json({ status: false, message: "Invalid Credentials" });
    }

    const payload = {
      id: existingUser._id,
      username: existingUser.name,
      created_at: new Date().getTime(),
    };
    const secret = process.env.JWT_SECRET;
    let token = jwt.sign(payload, secret);
    return res
      .status(200)
      .json({ status: true, message: "Login Successfully", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const authController = async (req, res, next) => {
  try {
    console.log(req.body);
    const user = await User.findOne({ _id: req.body.userId });
    if (!user) {
      return res.status(200).send({
        message: "user not found",
        success: false,
      });
    } else {
      res.status(200).send({
        success: true,
        data: {
          name: user.name,
          email: user.email,
        },
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "auth error",
      success: false,
      error,
    });
  }
};
