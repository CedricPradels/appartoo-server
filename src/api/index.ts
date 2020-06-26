import { Router } from "express";
import routes from "./routes";

const route = Router();

route.use("/api", routes);

export default route;
