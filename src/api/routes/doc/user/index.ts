import read from "./read";
import login from "./login";
import register from "./register";
import removeFriend from "./removeFriend";
import addFriend from "./addFriend";

const user = {
  "/api/user/{id}": { ...read },
  "/api/user/register": { ...register },
  "/api/user/login": { ...login },
  "/api/user/friend/{id}": { ...removeFriend, ...addFriend },
};

export default user;
