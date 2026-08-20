import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGODB = process.env.MONGODB;

const connect = mongoose
  .connect(MONGODB)
  .then(console.log("Mongo DB is connected"));

export default connect;
