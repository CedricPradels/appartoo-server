import dotenv from "dotenv";
dotenv.config();

const { PORT, MONGODB_URI } = process.env;

export default {
  port: PORT,
  mongodbUri: String(MONGODB_URI),
};
