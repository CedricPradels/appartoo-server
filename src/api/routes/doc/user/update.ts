const read = {
  put: {
    tags: ["User"],
    description: "Update user data",
    parameters: [
      {
        in: "path",
        name: "id",
        description: "Id of the user to read",
        required: true,
      },
    ],
    security: [{ bearerToken: [] }],
    requestBody: {
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              food: { type: "string" },
              family: { type: "string" },
              race: { type: "string" },
              age: { type: "number" },
            },
          },
        },
      },
    },
    responses: {
      "200": {
        description: "User data with update",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                user: {
                  type: "object",
                  properties: {
                    username: { type: "string" },
                    family: { type: "string" },
                    food: { type: "string" },
                    race: { type: "string" },
                    age: { type: "number" },
                    _id: { type: "string" },
                    friends: {
                      type: "array",
                      items: {
                        type: "string",
                      },
                    },
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

export default read;
