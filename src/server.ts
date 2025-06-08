import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { ObjectId } from "mongodb";
import { dbPromise } from "./db.js";

const db = await dbPromise;
const todos = db.collection<{
  _id: ObjectId; title: string; done: boolean; createdAt: Date;
}>("todos");

const server = new McpServer({ name: "Todo MCP Server", version: "0.1.0" });

server.registerTool(
  "todo.create",
  {
    description: "Create a new TODO item from title text",
    inputSchema: { title: z.string().min(1) }
  },
  async ({ title }) => {
    const doc = { _id: new ObjectId(), title, done: false, createdAt: new Date() };
    await todos.insertOne(doc);
    return {
      content: [{ type: "text", text: JSON.stringify(doc) }],
      structuredContent: doc
    };
  }
);

server.resource(
  "todo.list",
  "todo://list",
  { description: "Return all current TODO items" },
  async () => {
    const list = await todos.find().sort({ createdAt: -1 }).toArray();
    return {
      contents: list.map(t => ({ uri: `todo://${t._id}`, text: JSON.stringify(t) }))
    };
  }
);

await server.connect(new StdioServerTransport());
