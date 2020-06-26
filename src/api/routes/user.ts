import { Router } from "express";

import UserServices from "../../services/user";

const route = Router();

route.post("/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await UserServices.create({ username, password });

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

route.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await UserServices.check({ username, password });

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

export default route;
