const read = {
  get: {
    tags: ["User"],
    description: "Return detailed data about logged user friends",
    security: [{ bearerToken: [] }],
    responses: {
      "200": {
        description: "Data of friends",
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                friends: {
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
