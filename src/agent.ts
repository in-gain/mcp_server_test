import OpenAI from "openai";
import { Client as McpClient } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

(async () => {
  const client = new McpClient({ name: "Todo Agent", version: "0.1.0" });
  await client.connect(
    new StdioClientTransport({ command: "node", args: ["./dist/server.js"] })
  );

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

  for (const t of todos) await client.callTool({ name: "todo.create", arguments: t });

  console.log("\ud83d\udccc Added TODOs:", todos);
})();
