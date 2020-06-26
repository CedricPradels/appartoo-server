import { Router } from "express";
import user from "./user";
import users from "./users";

const route = Router();

route.use("/user", user);
route.use("/users", users);

export default route;
