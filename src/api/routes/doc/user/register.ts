const register = {
  post: {
    tags: ["User"],
    description: "Create a new user",
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
        description: "Registered user data",
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

export default register;
