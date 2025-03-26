// Tool Definitions
export const getDataTool = {
  name: "getData",
  description: "Retrieve data from PostgreSQL database",
  inputSchema: {
    type: "object",
    properties: {
      tableName: {
        type: "string",
        description: "Name of the table to query",
      },
    },
    required: ["tableName"],
  },
};

export const addUserDataTool = {
  name: "addUserData",
  description: "Add user data to PostgreSQL database",
  inputSchema: {
    type: "object",
    properties: {
      email: {
        type: "string",
        description: "User email address",
      },
      name: {
        type: "string",
        description: "User name",
      },
      age: {
        type: "number",
        description: "User age",
      },
    },
    required: ["tableName", "email", "name", "age"],
  },
};

export const deleteUserDataTool = {
  name: "deleteUserData",
  description: "Delete user data from PostgreSQL database",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "User id",
      },
      email: {
        type: "string",
        description: "User email address",
      },
      name: {
        type: "string",
        description: "User name",
      },
    },
    required: [],
  },
};

export const updateUserDataTool = {
  name: "updateUserData",
  description: "Delete user data from PostgreSQL database",
  inputSchema: {
    type: "object",
    properties: {
      id: {
        type: "string",
        description: "User id",
      },
      email: {
        type: "string",
        description: "User email address",
      },
      name: {
        type: "string",
        description: "User name",
      },
    },
    required: [],
  },
};
