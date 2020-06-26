import initExpress from "./express";
import initMongoose from "./mongoose";

const runLoaders = () => {
  initExpress();
  initMongoose();
};

export default runLoaders;
