import UserModel from "../models/User";
import CustomError from "./customError";
import authentication from "./authentication";
import { query } from "express";

interface ICreateUser {
  username: string;
  password: string;
}

interface ICheckUser {
  username: string;
  password: string;
}

interface IUpdateUserData {
  race: string;
  age: number;
  family: string;
  food: string;
}

interface IUpdateUserAuth {
  id: string;
  token: string;
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

  async update(
    { token, id }: IUpdateUserAuth,
    { race, age, family, food }: IUpdateUserData
  ) {
    if (!!!race && !!!age && !!!family && !!!food)
      throw new CustomError(400, "Nothing to update");
    try {
      const queryToken = await UserModel.findOne({ token });
      const queryId = await UserModel.findById(id);
      if (!!!queryToken || !!!queryId)
        throw new CustomError(400, "User does not exist");

      if (queryToken._id.toString() !== queryId._id.toString())
        throw new CustomError(401, "Unauthorized");

      const update = {
        race: race || queryId.race,
        age: age || queryId.age,
        family: family || queryId.family,
        food: food || queryId.food,
      };

      const updatedUser = await UserModel.findByIdAndUpdate(id, update, {
        new: true,
      }).select("-salt -hash -token");

      return updatedUser;
    } catch (err) {
      throw err;
    }
  },

  friend: {
    async delete(token: string, id: string) {
      try {
        const queryToken = await UserModel.findOne({ token });
        if (!!!queryToken) throw new CustomError(400, "User does not exist");

        if (!!!queryToken.friends || queryToken.friends.length === 0)
          throw new CustomError(400, "No friend to delete");

        if (!queryToken.friends.some((x) => x.toString() === id))
          throw new CustomError(400, "This user is not in your friends list");

        const friends = queryToken.friends.filter(
          (friendId) => friendId.toString() !== id
        );

        const updatedUser = await UserModel.findByIdAndUpdate(
          queryToken._id.toString(),
          { friends },
          {
            new: true,
          }
        ).select("-salt -hash -token");

        return updatedUser;
      } catch (err) {
        throw err;
      }
    },

    async add(token: string, id: string) {
      try {
        const queryFriend = await UserModel.findById(id);
        if (!!!queryFriend) throw new CustomError(400, "Invalid friend Id");

        const queryToken = await UserModel.findOne({ token });
        if (!!!queryToken) throw new CustomError(400, "User does not exist");

        const friends = queryToken.friends
          ? [
              ...queryToken.friends.filter(
                (friend) => friend.toString() !== id
              ),
              id,
            ]
          : [id];

        const updatedUser = await UserModel.findByIdAndUpdate(
          queryToken._id.toString(),
          { friends },
          {
            new: true,
          }
        ).select("-salt -hash -token");

        return updatedUser;
      } catch (err) {
        throw err;
      }
    },
  },
  friends: {
    async read(token: string) {
      try {
        const queryToken = await UserModel.findOne({ token }).populate({
          path: "friends",
          select: "-token -salt -hash",
          populate: {
            path: "friends",
            select: "username",
          },
        });

        if (!!!queryToken) throw new CustomError(400, "User not found");

        const friends = queryToken.friends || [];

        return friends;
      } catch (err) {
        throw err;
      }
    },
  },
};

export default UserServices;
