/**
 * @fileoverview Integration tests for the About Us API endpoint.
 * Tests the /about-us/ route that returns game information.
 * @module test/about.test
 */

import test from "ava";
import { registerTestHooks } from "./_testHelpers.js";

// Register shared test setup (server creation, auth client)
registerTestHooks(test);

/* ============================================
 * About Us Endpoint Tests
 * GET /about-us/ - Returns game description text
 * ============================================ */

/**
 * Test: Verify basic about-us response structure and content
 */
test("GET /about-us/ returns about us text", async (t) => {
	const { body, statusCode } = await t.context.got("about-us/");
	
	t.is(statusCode, 200);
	t.is(body.success, true);
	t.truthy(body.data);
	t.truthy(body.data.paragraph);
	t.true(typeof body.data.paragraph === 'string');
	t.true(body.data.paragraph.length > 0);
	t.is(body.message, 'About Us content retrieved.');
});

test("GET /about-us/ returns expected content", async (t) => {
	const { body } = await t.context.got("about-us/");
	
	t.true(body.data.paragraph.includes('Bureaucratic Simulator'));
	t.true(body.data.paragraph.includes('Software Engineering'));
});
