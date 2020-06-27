import user from "./user";
import users from "./users";

const doc = {
  openapi: "3.0.3",
  info: {
    title: "Appartoo Pangolin API",
    version: "0.0.0",
  },
  server: [{ url: "to be defined" }],
  paths: {
    ...user,
    ...users,
  },
  components: {
    securitySchemes: {
      bearerToken: {
        type: "http",
        description: "Token use for certain operations",
        in: "header",
        scheme: "bearer",
      },
    },
  },
};

export default doc;
