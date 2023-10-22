import mongoose from "mongoose";

export async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log(">>> DB is connected");
    });
    connection.on("error", (err) => {
      console.log(">>> DB connection error:", err);
    });
  } catch (error) {
    console.log("Something went wrong!");
    console.log(error);
  }
}
