import express from "express";

import env from "../config/environment";

import cors from "cors";

const initExpress = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.all("*", (req, res) => {
    res.status(404).json({ message: "Page not found" });
  });

  app.listen(env.port, () => console.log("server's running"));
};

export default initExpress;
