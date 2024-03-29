import {
  addHotel,
  getAllHotels,
  getHotelById,
  updateHotel,
} from "../controllers/hotels.controller.js";
import { verifyToken } from "../middlewares/auth.middleware.js";
import { upload } from "../utils/multer.setup.js";
import express from "express";

const hotelRouter = express();

hotelRouter.post(
  "/add-hotels",
  upload.fields([{ name: "hotels", maxCount: 2 }]),
  verifyToken,
  addHotel
);

hotelRouter.get("/getAllHotels", verifyToken, getAllHotels);
hotelRouter.post("/getHotelByid/:id", verifyToken, getHotelById);
hotelRouter.post(
  "/updateHotel/:id",
  upload.fields([{ name: "hotels", maxCount: 2 }]),
  verifyToken,
  updateHotel
);

export { hotelRouter };
