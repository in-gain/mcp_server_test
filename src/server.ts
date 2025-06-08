import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { fileURLToPath } from "node:url";

export type Todo = { id: number; title: string; done: boolean; createdAt: Date };

export function createTodoServer() {
  const todos: Todo[] = [];
  let nextId = 1;

  const server = new McpServer({ name: "Todo MCP Server", version: "0.1.0" });

  const create = async ({ title }: { title: string }) => {
    const doc: Todo = { id: nextId++, title, done: false, createdAt: new Date() };
    todos.push(doc);
    return doc;
  };

  const list = async () => {
    return [...todos].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  };

  server.registerTool(
    "todo.create",
    {
      description: "Create a new TODO item from title text",
      inputSchema: { title: z.string().min(1) }
    },
    async ({ title }) => {
      const doc = await create({ title });
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
      const listResult = await list();
      return {
        contents: listResult.map(t => ({ uri: `todo://${t.id}`, text: JSON.stringify(t) }))
      };
    }
  );

  return {
    server,
    todos,
    create,
    list,
    async start() {
      await server.connect(new StdioServerTransport());
    },
    async stop() {
      await server.close();
    }
  };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { start } = createTodoServer();
  await start();
}
