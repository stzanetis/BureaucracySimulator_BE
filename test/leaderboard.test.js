import 'dotenv/config';
import http from "node:http";
import test from "ava";
import got from "got";
import app from "../app.js";

test.before(async (t) => {
	t.context.server = http.createServer(app);
	const server = t.context.server.listen();
	const { port } = server.address();
	
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
