import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createRequire} from 'node:module';
import queryString from 'query-string';
const require = createRequire(import.meta.url);
const {createNodeId} = require('gatsby/dist/utils/create-node-id');
test('current uuid preserves Gatsby deterministic node identifiers', () => {
    assert.deepEqual([createNodeId('synthetic-event','events'),createNodeId('synthetic-image','images')], ["91ae8d52-5563-51f3-a38b-2669b4f1d3c3", "019e0828-39a4-5c90-8beb-23b1902eda68"]);
});
test('current query-string preserves Gatsby dev-404 filter parse/stringify flow', () => {
    const state = queryString.parse('?filter=synthetic%20event&other=kept');
    assert.equal(state.filter, 'synthetic event');
    state.filter = 'synthetic square';
    assert.equal(queryString.stringify(state), 'filter=synthetic%20square&other=kept');
});
