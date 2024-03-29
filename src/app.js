import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const app2 = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// import path from "path";
// const __dirname = path.dirname(new URL(import.meta.url).pathname);
// app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// define route
import { userRouter } from "./routes/user.routes.js";
import { hotelRouter } from "./routes/hotels.routes.js";

app.use("/api/v1/users", userRouter);
app.use("/api/v1/hotels", hotelRouter);

export { app };
