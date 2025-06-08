import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
type Todo = { id: number; title: string; done: boolean; createdAt: Date };
const todos: Todo[] = [];
let nextId = 1;

const server = new McpServer({ name: "Todo MCP Server", version: "0.1.0" });

server.registerTool(
  "todo.create",
  {
    description: "Create a new TODO item from title text",
    inputSchema: { title: z.string().min(1) }
  },
  async ({ title }) => {
    const doc: Todo = { id: nextId++, title, done: false, createdAt: new Date() };
    todos.push(doc);
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
    const list = [...todos].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return {
      contents: list.map(t => ({ uri: `todo://${t.id}`, text: JSON.stringify(t) }))
    };
  }
);

await server.connect(new StdioServerTransport());
