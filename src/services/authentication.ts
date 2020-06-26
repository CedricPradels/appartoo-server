import randomstring, { generate } from "randomstring";
import encBase64 from "crypto-js/enc-base64";
import SHA256 from "crypto-js/sha256";
import UserModel from "../models/User";

interface ICreateHash {
  password: string;
  salt: string;
}

const createHash = ({ password, salt }: ICreateHash) =>
  SHA256(salt + password).toString(encBase64);

const authentication = {
  async create(password: string) {
    const salt = randomstring.generate(64);
    let token;
    let queryToken;
    do {
      token = randomstring.generate(64);
      const queryToken = await UserModel.findOne({ token });
    } while (!!queryToken);
    const hash = createHash({ salt, password });
    return { token, hash, salt };
  },
};

export default authentication;
