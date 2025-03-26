import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
  Result,
} from "@modelcontextprotocol/sdk/types.js";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";
import {
  addUserDataTool,
  deleteUserDataTool,
  getDataTool,
  updateUserDataTool,
} from "./tools.js";

// Database Client
export const prismaClient = new PrismaClient();

const TableNameSchema = z.object({
  tableName: z.string().describe("Name of the table to retrieve data from"),
});

const AddUserSchema = z.object({
  email: z.string().email().describe("User email address"),
  name: z.string().describe("User name"),
  age: z.number().int().positive().describe("User age"),
});

const DeleteUserSchema = z.object({
  id: z.string().describe("User Id").optional(),
  email: z.string().email().describe("User email address").optional(),
  name: z.string().describe("User name").optional(),
});

const tools = [
  getDataTool,
  addUserDataTool,
  deleteUserDataTool,
  updateUserDataTool,
];

// Tool Handlers
class DatabaseToolHandlers {
  async getData(tableName: string) {
    // Validate input
    // TableNameSchema.parse({ tableName });

    const data = await prismaClient.user.findMany({
      take: 100, // Limit results
      orderBy: { createdAt: "desc" },
    });

    return {
      content: data.map((user) => ({
        type: "text",
        text: JSON.stringify(user),
      })),
    };
  }

  async addUserData(params: z.infer<typeof AddUserSchema>) {
    // Validate input
    AddUserSchema.parse(params);

    const newUser = await prismaClient.user.create({
      data: {
        name: params.name,
        email: params.email,
        age: params.age,
      },
    });

    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(newUser),
        },
      ],
    };
  }

  async deleteUserData(params: z.infer<typeof DeleteUserSchema>) {
    DeleteUserSchema.parse(params);
    const { count } = await prismaClient.user.deleteMany({
      where: {
        id: params.id,
        email: params.email,
        name: params.name,
      },
    });
    return {
      content: [{ type: "text", text: `${count} has been deleted` }],
    };
  }
}

// Server Configuration
const server = new Server(
  {
    name: "mcp-postgres",
    version: "0.1.0",
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// Request Handlers
server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools,
}));

const databaseToolHandlers = new DatabaseToolHandlers();

server.setRequestHandler(
  CallToolRequestSchema,
  async (request): Promise<Result> => {
    const { name, arguments: args } = request.params;

    if (name === "getData") {
      return await databaseToolHandlers.getData(
        (args?.tableName as string) ?? "user"
      );
    }
    if (name === "addUserData") {
      return await databaseToolHandlers.addUserData({
        email: args?.email as string,
        name: args?.name as string,
        age: args?.age as number,
      });
    }
    if (name === "deleteUserData") {
      return await databaseToolHandlers.deleteUserData({});
    }
    throw new Error("Unknown tool");
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
