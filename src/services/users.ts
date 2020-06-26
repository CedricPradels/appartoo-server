import UserModel from "../models/User";
import CustomError from "./customError";

const UsersServices = {
  async read() {
    try {
      const queryId = await UserModel.find()
        .select("-hash -token -salt")
        .populate("friends");

      return queryId;
    } catch (err) {
      throw err;
    }
  },
};

export default UsersServices;
