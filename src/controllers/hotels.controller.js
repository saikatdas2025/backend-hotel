import mongoose from "mongoose";
import { Hotel } from "../db/models/hote.models.js";
import { cloudinaryUpload } from "../utils/cloudinary.setup.js";

export const addHotel = async (req, res) => {
  try {
    /*
    1. get hotel data
    2. get photos of hotels
    3. upload photo ot cloudinary
    4. search db for already added this hotels or not
    5. save hotels data in db
    */

    // to get data from body is two way -
    // const newHotel = req.body;

    const {
      name,
      city,
      country,
      adultCount,
      childCount,
      facilities,
      pricePerNight,
      type,
      description,
      starRating,
    } = req.body;

    // validation
    if (
      [
        name,
        city,
        country,
        adultCount,
        childCount,
        facilities,
        pricePerNight,
        type,
        description,
        starRating,
      ].some((field) => typeof field === "string" && field?.trim() === "")
    ) {
      return res.status(400).send(`All fields are required.`);
    }

    // check if hotel are alredy existed or not
    const existedHotel = await Hotel.find({ name: name });
    if (existedHotel.length > 0) {
      return res.status(400).json({ message: "Hotel are already existed" });
    }

    // cloudinary upload process
    const photos = req.files?.hotels;
    const photoArray = [];
    photos.map(async (photo) => {
      photoArray.push(photo?.path);
    });

    const arrayUrl = photoArray.map(async (photo) => {
      const uploadhotels = await cloudinaryUpload(photo);
      return uploadhotels.url;
    });

    photoArray.length = 0;
    photoArray.push(await Promise.all(arrayUrl));
    const cloudinaryUploadUrl = photoArray[0];

    // hotel owner
    const user = req.user;

    // created new hotel.
    const newHotel = await Hotel.create({
      name,
      city,
      country,
      adultCount,
      childCount,
      facilities,
      pricePerNight,
      type,
      description,
      starRating,
      photos: cloudinaryUploadUrl,
      hotelOwner: user._id,
    });

    return res
      .status(201)
      .json({ newHotel, message: "Hotel created successfully" });
  } catch (error) {
    console.log("Error occured, Add hotel. : ", error);
    return res.status(400).send(error.message);
  }
};

export const getAllHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find({
      hotelOwner: req.user?._id,
    });
    if (hotels.length < 0) {
      return res.status(400).send("Your hotels not found");
    }
    return res.status(200).json({ hotels, message: "Get all hotels" });
  } catch (error) {
    console.log("Get all hotels: ", error);
    return res.status(400).send(error.message);
  }
};

export const getHotelById = async (req, res) => {
  try {
    const hotel = await Hotel.findOne({ _id: req.params.id });
    if (hotel.length < 0) {
      return res.status(400).send("Your hotels not found");
    }
    return res
      .status(200)
      .json({ hotel, message: "Get your hotels details by id" });
  } catch (error) {
    console.log("Get hotels by id: ", error);
    return res.status(400).send(error.message);
  }
};

export const updateHotel = async (req, res) => {
  try {
    const {
      name,
      city,
      country,
      adultCount,
      childCount,
      facilities,
      pricePerNight,
      type,
      description,
      starRating,
    } = req.body;

    // validation
    if (
      [
        name,
        city,
        country,
        adultCount,
        childCount,
        facilities,
        pricePerNight,
        type,
        description,
        starRating,
      ].some((field) => typeof field === "string" && field?.trim() === "")
    ) {
      return res.status(400).send(`All fields are required.`);
    }

    // cloudinary upload process
    const photos = req.files?.hotels;
    const photoArray = [];
    photos?.map(async (photo) => {
      photoArray.push(photo?.path);
    });

    const arrayUrl = photoArray.map(async (photo) => {
      const uploadhotels = await cloudinaryUpload(photo);
      return uploadhotels.url;
    });

    photoArray.length = 0;
    photoArray.push(await Promise.all(arrayUrl));
    const cloudinaryUploadUrl = photoArray[0];

    // hotel owner
    const existedHotel = await Hotel.findOne(req.params._id);
    if (!existedHotel) {
      return res.status(400).send("Hotel not found.!");
    }

    // created new hotel.
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          name,
          city,
          country,
          adultCount,
          childCount,
          facilities,
          pricePerNight,
          type,
          description,
          starRating,
          photos: cloudinaryUploadUrl,
        },
      },
      { $new: true }
    );

    return res
      .status(201)
      .json({ updatedHotel, message: "Hotel details updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(400).send(error.message);
  }
};
