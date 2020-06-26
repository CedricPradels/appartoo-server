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

route.delete("/friend/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const token = await TokenServices.check(req.headers.authorization || "");

    const user = await UserServices.friend.delete(token, id);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

route.post("/friend/:id", async (req, res, next) => {
  try {
    const { id } = req.params;

    const token = await TokenServices.check(req.headers.authorization || "");

    const user = await UserServices.friend.add(token, id);
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

route.get("/friends", async (req, res, next) => {
  try {
    const token = await TokenServices.check(req.headers.authorization || "");

    const friends = await UserServices.friends.read(token);

    res.status(200).json({ friends });
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

route.put("/:id", async (req, res, next) => {
  try {
    const { race, age, family, food } = req.body;

    const id = req.params.id;

    const token = await TokenServices.check(req.headers.authorization || "");

    const user = await UserServices.update(
      { token, id },
      { race, age, family, food }
    );

    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
});

export default route;
