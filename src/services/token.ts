import UserModel from "../models/User";
import CustomError from "./customError";

const token = {
  async check(token: string) {
    const WrongToken = new CustomError(402, "Wrong token");

    if (!token) throw WrongToken;
    if (typeof token !== "string") throw WrongToken;

    token = token.replace("Bearer ", "");

    try {
      const queryToken = await UserModel.findOne({ token });
      if (!!!queryToken) throw WrongToken;
    } catch (err) {
      throw err;
    }
  },
};

export default token;
