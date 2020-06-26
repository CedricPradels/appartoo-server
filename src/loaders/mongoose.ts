import mongoose from "mongoose";

import env from "../config/environment";

const initMongoose = () => {
  mongoose.connect(env.mongodbUri, { useNewUrlParser: true });
};

export default initMongoose;
