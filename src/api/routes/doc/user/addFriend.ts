const removeFriend = {
  post: {
    tags: ["User"],
    description: "Add a friend from the logged user friends list",
    parameters: [
      {
        in: "path",
        name: "id",
        description: "Id of the user to remove from fiend list",
        required: true,
      },
    ],
    security: [{ bearerToken: [] }],
    responses: {
      "200": {
        description: "Added friend data",
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

export default removeFriend;
