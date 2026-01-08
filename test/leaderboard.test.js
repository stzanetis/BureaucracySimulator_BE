/**
 * @fileoverview Integration tests for the Leaderboard API endpoints.
 * Tests CRUD operations: list, create/update, and delete leaderboard entries.
 * @module test/leaderboard.test
 */

import test from "ava";
import { registerTestHooks } from "./_testHelpers.js";

// Register shared test setup (server creation, auth client)
registerTestHooks(test);

/* ============================================
 * Leaderboard Endpoint Tests
 * GET /leaderboard/ - List all entries
 * PUT /leaderboard/:name - Create or update entry
 * DELETE /leaderboard/:name - Remove entry
 * ============================================ */

/**
 * Test: GET /leaderboard/ returns array of entries
 */
test("GET /leaderboard/ returns leaderboard data", async (t) => {
	const { body, statusCode } = await t.context.got("leaderboard/");
	
	t.is(statusCode, 200);
	t.is(body.success, true);
	t.truthy(body.data);
	t.truthy(body.data.leaderboard);
	t.true(Array.isArray(body.data.leaderboard));
	t.is(body.message, 'Leaderboard retrieved.');
});

test("GET /leaderboard/ returns leaderboard with proper structure", async (t) => {
	const { body } = await t.context.got("leaderboard/");
	
	if (body.data.leaderboard.length > 0) {
		const entry = body.data.leaderboard[0];
		t.truthy(entry.name);
		t.truthy(entry.score !== undefined);
		t.true(typeof entry.name === 'string');
		t.true(typeof entry.score === 'number');
	}
});

test("PUT /leaderboard/:name creates/updates leaderboard entry", async (t) => {
	const testName = `TestPlayer${Date.now()}`;
	const testScore = 100;
	
	const { body, statusCode } = await t.context.got.put(`leaderboard/${testName}`, {
		json: { score: testScore }
	});
	
	t.is(statusCode, 200);
	t.is(body.success, true);
	t.is(body.message, 'Leaderboard entry upserted.');
});

test("DELETE /leaderboard/:name deletes leaderboard entry", async (t) => {
	const testName = `TestPlayer${Date.now()}`;
	
	// First create an entry
	await t.context.got.put(`leaderboard/${testName}`, {
		json: { score: 100 }
	});
	
	// Then delete it
	const { body, statusCode } = await t.context.got.delete(`leaderboard/${testName}`);
	
	// API returns 204 No Content
	t.true([200, 204].includes(statusCode));
	if (statusCode === 200) {
		t.is(body.success, true);
	}
});
