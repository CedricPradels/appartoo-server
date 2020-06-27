const read = {
  get: {
    tags: ["Users"],
    description: "Return all registered users",
    responses: {
      "200": {
        description: "List of registered user",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                users: {
                  type: "array",
                  items: {
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
  },
};

export default read;
