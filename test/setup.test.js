import 'dotenv/config';
import http from "node:http";
import test from "ava";
import got from "got";
import app from "../app.js";

test.before(async (t) => {
	t.context.server = http.createServer(app);
	const server = t.context.server.listen();
	const { port } = server.address();
	
	// Create auth header from .env credentials
	const username = process.env.BASIC_AUTH_USER;
	const password = process.env.BASIC_AUTH_PASS;
	const credentials = Buffer.from(`${username}:${password}`).toString('base64');
	
	t.context.got = got.extend({
		responseType: "json",
		prefixUrl: `http://localhost:${port}`,
		headers: {
			'Authorization': `Basic ${credentials}`
		},
		throwHttpErrors: false
	});
});

test.after.always((t) => {
	t.context.server.close();
});

// Basic sanity test
test("Test setup works", (t) => {
	t.pass();
});
