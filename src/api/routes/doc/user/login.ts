const login = {
  post: {
    tags: ["User"],
    description: "Login user",
    requestBody: {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            required: ["username", "password"],
            properties: {
              username: { type: "string" },
              password: { type: "string" },
            },
          },
        },
      },
    },
    responses: {
      "200": {
        description: "Logged user data",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user: {
                  type: "object",
                  properties: {
                    username: { type: "string" },
                    _id: { type: "string" },
                    token: { type: "string" },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default login;
