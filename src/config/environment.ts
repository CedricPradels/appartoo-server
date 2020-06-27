import dotenv from "dotenv";
dotenv.config();

const { PORT, MONGODB_URI } = process.env;

export default {
  port: PORT || 4000,
  mongodbUri: String(MONGODB_URI) || "mongodb://localhost:27017/appartoo",
};
