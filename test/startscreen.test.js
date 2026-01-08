/**
 * @fileoverview Integration tests for the Startscreen API endpoint.
 * Tests the /startscreen/ route that returns the game's music playlist.
 * @module test/startscreen.test
 */

import test from "ava";
import { registerTestHooks } from "./_testHelpers.js";

// Register shared test setup (server creation, auth client)
registerTestHooks(test);

/* ============================================
 * Startscreen Endpoint Tests
 * GET /startscreen/ - Returns background music URLs
 * ============================================ */

/**
 * Test: Verify startscreen returns a non-empty songlist array
 */
test("GET /startscreen/ returns songlist", async (t) => {
	const { body, statusCode } = await t.context.got("startscreen/");
	
	t.is(statusCode, 200);
	t.is(body.success, true);
	t.truthy(body.data);
	t.truthy(body.data.songlist);
	t.true(Array.isArray(body.data.songlist));
	t.true(body.data.songlist.length > 0);
	t.is(body.message, 'Startscreen song list retrieved.');
});

test("GET /startscreen/ returns expected song URLs", async (t) => {
	const { body } = await t.context.got("startscreen/");
	
	t.truthy(body.data.songlist);
	body.data.songlist.forEach(song => {
		t.true(typeof song === 'string');
		t.true(song.includes('http'));
	});
});
