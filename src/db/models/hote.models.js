import mongoose, { Schema } from "mongoose";

const hotelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Hotel name is required"],
    },
    city: {
      type: String,
      required: [true, "Hotel city is required"],
    },
    country: {
      type: String,
      required: [true, "Hotel country is required"],
    },
    adultCount: {
      type: Number,
      required: [true, "How much person is adult that counts is required"],
    },
    childCount: {
      type: Number,
      required: [true, "How much person is child that counts is required"],
    },
    facilities: [
      {
        type: String,
        required: [true, "Hotel facilities is required"],
      },
    ],
    pricePerNight: {
      type: Number,
      required: [true, "Hotel per night price is required"],
    },
    type: {
      type: String,
      required: [true, "Hotel type is required"],
    },
    description: {
      type: String,
      required: [true, "Hotel description is required"],
    },
    starRating: { type: Number, required: true, min: 1, max: 5 },
    photos: [
      {
        type: String,
        required: [true, "Hotel Photos are required"],
      },
    ],
    hotelOwner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Hotel = mongoose.model("Hotel", hotelSchema);
