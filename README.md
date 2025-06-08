# MCP Todo Example

This repository contains a minimal example of a Model Context Protocol (MCP) server with a small TODO application. It demonstrates how to build a server exposing tools and resources over MCP and how to drive it via a client agent using OpenAI's API.

## Prerequisites

- Node.js 22 or later
- npm
- An OpenAI API key (`OPENAI_API_KEY`)

## Installation

Install the dependencies:

```bash
npm install
```

Compile the TypeScript sources:

```bash
npm run build
```

## Running the Server

Run the server:

```bash
node dist/server.js
```

The server exposes tools and resources via MCP over stdio.

## Running the Agent

The agent uses OpenAI's API to generate TODO items and send them to the server.
Set the `OPENAI_API_KEY` environment variable and run:

```bash
OPENAI_API_KEY=your-key node dist/agent.js "買い物の準備をする"
```

This will create TODO items using the server and print them on completion.

## Environment Variables

- `OPENAI_API_KEY` – API key for OpenAI used by the agent

