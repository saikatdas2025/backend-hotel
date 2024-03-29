import mongoose from "mongoose";
export const connectDatabase = async () => {
  try {
    const connectResponse = await mongoose.connect(
      `${process.env.DATABASE_URI}/hotelbooking`
    );
    console.log("MONGODB CONNECTED SUCCESSFULLY");
  } catch (error) {
    console.log("MONGODB CONNECTION FAILED:-> ", Error);
    process.exit(1);
  }
};
