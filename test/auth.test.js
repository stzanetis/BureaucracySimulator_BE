/**
 * @fileoverview Integration tests for Basic Authentication middleware.
 * Tests various authentication scenarios: missing headers, invalid credentials,
 * valid credentials, and malformed authorization headers.
 * @module test/auth.test
 */

import 'dotenv/config';
import test from "ava";
import { registerTestHooks } from "./_testHelpers.js";

// Use skipAuth to create unauthenticated client for testing auth behavior
registerTestHooks(test, { skipAuth: true });

/* ============================================
 * Authentication Tests
 * Validates Basic Auth middleware behavior
 * ============================================ */

/**
 * Test: Requests without Authorization header should be rejected
 */
test("GET request without auth header returns 401", async (t) => {
	const { body, statusCode } = await t.context.gotBase("startscreen/");
	t.is(statusCode, 401);
	t.is(body.success, false);
	t.is(body.error, 'AUTH_REQUIRED');
});

test("GET request with invalid credentials returns 401", async (t) => {
	const credentials = Buffer.from('wrong:credentials').toString('base64');
	const { body, statusCode } = await t.context.gotBase("startscreen/", {
		headers: {
			'Authorization': `Basic ${credentials}`
		}
	});
	t.is(statusCode, 401);
	t.is(body.success, false);
	t.is(body.error, 'AUTH_INVALID');
});

test("GET request with valid credentials returns 200", async (t) => {
	const username = process.env.BASIC_AUTH_USER;
	const password = process.env.BASIC_AUTH_PASS;
	const credentials = Buffer.from(`${username}:${password}`).toString('base64');
	const { body, statusCode } = await t.context.gotBase("startscreen/", {
		headers: {
			'Authorization': `Basic ${credentials}`
		}
	});
	t.is(statusCode, 200);
	t.is(body.success, true);
});

test("Missing 'Basic' keyword in auth header returns 401", async (t) => {
	const username = process.env.BASIC_AUTH_USER;
	const password = process.env.BASIC_AUTH_PASS;
	const credentials = Buffer.from(`${username}:${password}`).toString('base64');
	const { body, statusCode } = await t.context.gotBase("startscreen/", {
		headers: {
			'Authorization': credentials
		}
	});
	t.is(statusCode, 401);
	t.is(body.success, false);
});
