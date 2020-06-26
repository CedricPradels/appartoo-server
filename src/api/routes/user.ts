import { Router } from "express";

import UserServices from "../../services/user";
import TokenServices from "../../services/token";

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

route.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;

    const user = await UserServices.read(id);

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

export default route;
