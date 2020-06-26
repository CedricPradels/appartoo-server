import UserModel from "../models/User";
import CustomError from "./customError";
import authentication from "./authentication";

interface ICreateUser {
  username: string;
  password: string;
}

const UserServices = {
  async create({ username, password }: ICreateUser) {
    try {
      if (!!!username || !!!password)
        throw new CustomError(400, "Missing username and/or password");
      if (typeof username !== "string" || typeof password !== "string")
        throw new CustomError(
          400,
          "Password or/and username has wrong data types"
        );
      const queryUser = await UserModel.findOne({ username });
      if (!!queryUser) throw new CustomError(400, "Username already exist");

      const authenticationData = await authentication.create(password);

      await UserModel.create({
        username,
        ...authenticationData,
      });

      const safeUser = await UserModel.findOne({ username }).select(
        "username _id"
      );

      if (!!!safeUser) throw new CustomError(500, "Db sage failed.");

      return safeUser;
    } catch (err) {
      throw err;
    }
  },
};

export default UserServices;
