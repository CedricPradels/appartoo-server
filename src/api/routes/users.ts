import { Router } from "express";

import UsersServices from "../../services/users";

const route = Router();

route.get("/", async (req, res, next) => {
  try {
    const users = await UsersServices.read();

    res.status(200).json({ users });
  } catch (err) {
    next(err);
  }
});

export default route;
