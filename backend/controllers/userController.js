import { User } from "../models/User.js";
import jwt from "jsonwebtoken";
import sendMail from "../middlewares/sendMail.js";

export const loginUser = async (req, res) => {
  try {
    const { email } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({ email });
    }
    const otp = Math.floor(Math.random() * 1000000);
    const verifyToken = jwt.sign({ user, otp }, process.env.Activation_sec, {
      expiresIn: "5m",
    });
    await sendMail(email, "ChatBot", otp);
    res.json({
      message: "OTP sent to your email",
      verifyToken,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const verifyUser = async (req, res) => {
  try {
    const { otp, verifyToken } = req.body;
    const verify = jwt.verify(verifyToken, process.env.Activation_sec);
    if (!verify) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }
    if (verify.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }
    const token = jwt.sign({ _id: verify.user._id }, process.env.Jwt_sec, {
      expiresIn: "5d",
    });
    res.json({
      message: "User Logged In successfully",
      user: verify.user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
export const myProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
