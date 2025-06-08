import test from 'node:test';
import assert from 'node:assert/strict';
import { createTodoServer } from '../dist/server.js';

// Verify todo.create adds items

test('todo.create adds items', async () => {
  const { create, list } = createTodoServer();
  let items = await list();
  assert.equal(items.length, 0);

  await create({ title: 'first' });
  items = await list();
  assert.equal(items.length, 1);
  assert.equal(items[0].title, 'first');
});

// Verify todo.list returns items sorted by creation date

test('todo.list returns them sorted by creation date', async () => {
  const { create, list } = createTodoServer();
  await create({ title: 'one' });
  // Ensure second item has later timestamp
  await new Promise(r => setTimeout(r, 10));
  await create({ title: 'two' });

  const items = await list();
  assert.equal(items.length, 2);
  assert.equal(items[0].title, 'two');
  assert.equal(items[1].title, 'one');
});
