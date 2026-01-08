/**
 * Shared test helpers for AVA tests
 * Eliminates duplicate server setup/teardown code across test files
 */
import 'dotenv/config';
import http from "node:http";
import got from "got";
import app from "../app.js";

/**
 * Creates a test server and configures an authenticated HTTP client
 * @param {object} t - AVA test context
 * @param {object} options - Configuration options
 * @param {boolean} options.skipAuth - If true, creates unauthenticated client as gotBase
 * @returns {Promise<void>}
 */
export async function setupTestServer(t, options = {}) {
	t.context.server = http.createServer(app);
	const server = t.context.server.listen();
	const { port } = server.address();
	
	const baseConfig = {
		responseType: "json",
		prefixUrl: `http://localhost:${port}`,
		throwHttpErrors: false
	};
	
	if (options.skipAuth) {
		// For auth testing - create unauthenticated client
		t.context.gotBase = got.extend(baseConfig);
	} else {
		// Standard authenticated client
		const username = process.env.BASIC_AUTH_USER;
		const password = process.env.BASIC_AUTH_PASS;
		const credentials = Buffer.from(`${username}:${password}`).toString('base64');
		
		t.context.got = got.extend({
			...baseConfig,
			headers: {
				'Authorization': `Basic ${credentials}`
			}
		});
	}
}

/**
 * Closes the test server
 * @param {object} t - AVA test context
 */
export function teardownTestServer(t) {
	t.context.server.close();
}

/**
 * Registers standard before/after hooks for a test file
 * @param {object} test - AVA test object
 * @param {object} options - Optional configuration
 * @param {Function} options.beforeHook - Additional async function to run after server setup
 * @param {boolean} options.skipAuth - If true, creates unauthenticated client for auth testing
 */
export function registerTestHooks(test, options = {}) {
	test.before(async (t) => {
		await setupTestServer(t, { skipAuth: options.skipAuth });
		if (options.beforeHook) {
			await options.beforeHook(t);
		}
	});

	test.after.always((t) => {
		teardownTestServer(t);
	});
}
