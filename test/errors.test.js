/**
 * @fileoverview Integration tests for error handling middleware.
 * Tests 404 responses, JSON parsing errors, and error response structure.
 * @module test/errors.test
 */

import test from "ava";
import { registerTestHooks } from "./_testHelpers.js";

// Register shared test setup (server creation, auth client)
registerTestHooks(test);

/* ============================================
 * Error Handling Tests
 * Validates consistent error responses across HTTP methods
 * ============================================ */

/**
 * Test: Non-existent routes return proper 404 with error structure
 */
test("GET request to non-existent route returns 404", async (t) => {
	const { body, statusCode } = await t.context.got("nonexistent/route");
	
	t.is(statusCode, 404);
	t.is(body.success, false);
	t.is(body.error, 'NOT_FOUND');
	t.truthy(body.message);
	t.true(body.message.includes('not found'));
});

test("POST to non-existent route returns 404", async (t) => {
	const { body, statusCode } = await t.context.got.post("invalid/endpoint", {
		json: { test: "data" }
	});
	
	t.is(statusCode, 404);
	t.is(body.success, false);
});

test("PUT to non-existent route returns 404", async (t) => {
	const { body, statusCode } = await t.context.got.put("invalid/endpoint", {
		json: { test: "data" }
	});
	
	t.is(statusCode, 404);
	t.is(body.success, false);
});

test("DELETE to non-existent route returns 404", async (t) => {
	const { body, statusCode } = await t.context.got.delete("invalid/endpoint");
	
	t.is(statusCode, 404);
	t.is(body.success, false);
});

test("Invalid JSON in request body is handled", async (t) => {
	const { statusCode } = await t.context.got.post("user/", {
		body: "invalid json {",
		headers: {
			'Content-Type': 'application/json'
		}
	});
	
	// Express will return 400 for malformed JSON
	t.is(statusCode, 400);
});

test("Error responses have correct structure", async (t) => {
	const { body } = await t.context.got("nonexistent/route");
	
	t.is(body.success, false);
	t.truthy(body.error);
	t.truthy(body.message);
	t.is(body.data, null);
});
