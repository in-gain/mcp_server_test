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

## 実行例

以下は実際にエージェントを実行した際の例です。サーバーを起動してから別のターミナルでエージェントを実行します:

```bash
# サーバーを起動
npm start &

# エージェントを実行
OPENAI_API_KEY=sk-... node dist/agent.js "旅行の準備をする"
\ud83d\udccc Added TODOs: [
  { title: "パスポートの有効期限を確認する" },
  { title: "フライトを予約する" },
  { title: "宿泊先を確保する" }
]
```

エージェントが生成した TODO がサーバーに登録され、上記のように一覧表示されます。


## テスト

Node.js 組み込みのテストランナーで簡単なユニットテストを実行できます:

```bash
npm test
```

## 環境変数

- `OPENAI_API_KEY` – OpenAI の API キー
