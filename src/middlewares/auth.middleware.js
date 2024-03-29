import { User } from "../db/models/user.models.js";
import jwt from "jsonwebtoken";

export const generateToken = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    return res
      .status(400)
      .json({ message: "User not found || Wrong user id, Generate tokens" });
  }

  const token = jwt.sign(
    {
      _id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: process.env.TOKEN_EXPIRY,
    }
  );
  return token;
};

export const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.cookies?.auth_token ||
      req.header("Authorization")?.replace("Bearer", " ");

    // console.log("Token: ", token);
    if (!token) {
      return res.status(401).json({ message: "Unauthorized token" });
    }
    const decodeToken = jwt.verify(token, process.env.TOKEN_SECRET);
    // console.log("DecodedToken: ", decodeToken);

    const user = await User.findById(decodeToken._id);
    // console.log(user);
    if (!user) {
      return res
        .status(401)
        .json({ message: "Unauthorized token, you broken the rules." });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Unauthorized token access error" });
  }
};
