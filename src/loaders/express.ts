import express, { ErrorRequestHandler } from "express";
import env from "../config/environment";
import api from "../api";
import cors from "cors";
import CustomError from "../services/customError";

const initExpress = () => {
  const app = express();

  app.use(cors());

  app.use(express.json());

  app.use(api);

  app.all("*", (req, res, next) => {
    throw new CustomError(404, "Page not found");
  });

  const finalHandle: ErrorRequestHandler = (err, req, res, next) => {
    res.status(err.statusCode || 400).json({
      success: "failed",
      statusCode: err.statusCode || 400,
      message: err.message,
    });
  };

  app.use(finalHandle);

  app.listen(env.port, () => console.log("server's running"));
};

export default initExpress;
