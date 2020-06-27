import read from "./read";
import update from "./update";
import login from "./login";
import register from "./register";
import removeFriend from "./removeFriend";
import addFriend from "./addFriend";
import readFriends from "./readFriends";

const user = {
  "/api/user/{id}": { ...read, ...update },
  "/api/user/register": { ...register },
  "/api/user/login": { ...login },
  "/api/user/friend/{id}": { ...removeFriend, ...addFriend },
  "/api/user/friends": { ...readFriends },
};

export default user;
