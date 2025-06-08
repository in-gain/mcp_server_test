# MCP TODO サンプル

このリポジトリは Model Context Protocol (MCP) を用いた簡単な TODO サーバーの例です。OpenAI API を利用するエージェントから MCP を介してツールやリソースを操作する方法を示します。

## 必要条件

- Node.js 22 以降
- npm
- OpenAI API キー (`OPENAI_API_KEY`)

## インストール

依存パッケージをインストールします:


```bash
npm install
```

この作業にはインターネット接続が必要です。

TypeScript ソースをビルドします:


```bash
npm run build
```

## サーバーの起動

次にサーバーを実行します:

```bash
npm start
```


サーバーは MCP 経由でツールとリソースを提供します。

## エージェントの実行

エージェントは OpenAI API を使って TODO 項目を生成し、サーバーに送信します。`OPENAI_API_KEY` を環境変数に設定して実行してください:

```bash
OPENAI_API_KEY=あなたのキー node dist/agent.js "買い物の準備をする"
```

これにより TODO 項目が作成され、完了後に表示されます。

## 環境変数

- `OPENAI_API_KEY` – OpenAI の API キー
