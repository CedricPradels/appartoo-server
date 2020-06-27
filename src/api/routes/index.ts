import { Router } from "express";
import user from "./user";
import users from "./users";
import swaggerUi from "swagger-ui-express";
import documentation from "./doc";

const route = Router();

route.use("/doc", swaggerUi.serve, swaggerUi.setup(documentation));
route.use("/user", user);
route.use("/users", users);

export default route;
