import UserModel from "../models/User";
import CustomError from "./customError";
import authentication from "./authentication";

interface ICreateUser {
  username: string;
  password: string;
}

interface ICheckUser {
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
      const queryUsername = await UserModel.findOne({ username });
      if (!!queryUsername) throw new CustomError(400, "Username already exist");

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

  async check({ username, password }: ICheckUser) {
    try {
      const AuthenticationFailed = new CustomError(
        402,
        "Authentication failed"
      );
      if (!!!username || !!!password) throw AuthenticationFailed;
      if (typeof username !== "string" || typeof password !== "string")
        throw AuthenticationFailed;
      const queryUser = await UserModel.findOne({ username });
      if (!!!queryUser) throw AuthenticationFailed;

      const isChecked = authentication.check({
        password,
        salt: queryUser.salt,
        hash: queryUser.hash,
      });

      if (!isChecked) throw AuthenticationFailed;

      const safeUser = {
        username: queryUser.username,
        token: queryUser.token,
        id: queryUser._id,
      };

      return safeUser;
    } catch (err) {
      throw err;
    }
  },

  async read(id: string) {
    const UserDoesNotExist = new CustomError(400, "User does not exist");

    try {
      const queryId = await UserModel.findById(id)
        .select("-hash -token -salt")
        .populate("friends");

      if (!!!queryId) throw UserDoesNotExist;

      return queryId;
    } catch (err) {
      throw err;
    }
  },
};

export default UserServices;
