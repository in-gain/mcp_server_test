import { spawn } from "node:child_process";
import OpenAI from "openai";
import { McpClient } from "@modelcontextprotocol/sdk/client/mcp.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

(async () => {
  const server = spawn("node", ["./dist/server.js"], { stdio: ["pipe","pipe","inherit"] });
  const client = new McpClient();
  await client.connect(new StdioClientTransport(server.stdin!, server.stdout!));

  const llm = new OpenAI();
  const user = process.argv.slice(2).join(" ");
  const sys = `あなたはタスク分解アシスタント。
JSON で {"title": "..."} 配列のみ返してください (最大5件)。`;

  const rsp = await llm.chat.completions.create({
    model: "gpt-4o",
    messages: [{ role: "system", content: sys }, { role: "user", content: user }],
    response_format: { type: "json_object" }
  });
  const todos: { title: string }[] = JSON.parse(rsp.choices[0].message.content ?? "");

  for (const t of todos) await client.callTool("todo.create", t);

  console.log("\ud83d\udccc Added TODOs:", todos);
  server.kill();
})();
