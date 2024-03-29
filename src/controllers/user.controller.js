import { User } from "../db/models/user.models.js";
import dotenv from "dotenv";
dotenv.config();
import bcrypt from "bcryptjs";
import { generateToken } from "../middlewares/auth.middleware.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { firstname, lastname, email, password } = req.body;
    if (
      [firstname, lastname, email, password].some(
        (field) => field?.trim() === ""
      )
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
      return res.status(400).json({ message: "User already existed" });
    }

    const newUser = await User.create({ firstname, lastname, email, password });
    console.log(newUser);

    return res
      .status(201)
      .json({ User: "", message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      User: error,
      message: "Something went wrong when you registerd user",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!(email || password)) {
      return res.status(500).json({
        message: "Email and Password was required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({
        message: "Incorrect email id",
      });
    }

    const existedUser = await User.findById(user._id).select("-password");

    const verifyPassword = await user.isPasswordCorrect(password);
    if (!verifyPassword) {
      return res.status(500).json({
        message: "Email id and Password is wrong.",
      });
    }

    // console.log(verifyPassword);
    const token = await generateToken(user._id);

    const options = {
      httpOnly: true,
      secure: true,
      maxAge: 86400000,
    };
    return res
      .status(200)
      .cookie("auth_token", token, options)
      .json({ existedUser, message: "User logged in successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: error.message,
      message: "Something went wrong when you login",
    });
  }
};

export const comeHome = async (req, res) => {
  try {
    // console.log(req.cookies);
    return res.status(200).send(true);
  } catch (error) {
    console.log(error);
  }
};

export const logOut = async (req, res) => {
  try {
    /*
    const token = req.cookie?.auth_token;
    const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decodeToken._id);
    */

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .clearCookie("auth_token", options)
      .json({ message: "User logged out successfully." });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};
