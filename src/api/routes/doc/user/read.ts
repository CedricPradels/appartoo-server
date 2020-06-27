const read = {
  get: {
    tags: ["User"],
    description: "Return detailed data about a user",
    parameters: [
      {
        in: "path",
        name: "id",
        description: "Id of the user to read",
        required: true,
      },
    ],
    responses: {
      "200": {
        description: "User data",
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
                    food: { type: "string" },
                    family: { type: "string" },
                    race: { type: "string" },
                    age: { type: "number" },

                    friends: {
                      type: "array",
                      items: {
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
      },
    },
  },
};

export default read;
