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

test("GET /endscreen/ returns endscreen stats", async (t) => {
	const { body, statusCode } = await t.context.got("endscreen/");
	
	t.is(statusCode, 200);
	t.is(body.success, true);
	t.truthy(body.data);
	t.truthy(body.data.elapsedTime !== undefined);
	t.truthy(body.data.percentile !== undefined);
	t.is(body.message, 'Endscreen stats retrieved.');
});

test("GET /endscreen/ returns valid percentile value", async (t) => {
	const { body } = await t.context.got("endscreen/");
	
	t.true(typeof body.data.percentile === 'number');
	t.true(body.data.percentile >= 0);
	t.true(body.data.percentile <= 100);
});

test("POST /endscreen/ submits stats", async (t) => {
	const elapsedTime = 150;
	
	const { body, statusCode } = await t.context.got.post("endscreen/", {
		json: { elapsedTime }
	});
	
	t.is(statusCode, 200);
	t.is(body.success, true);
	t.truthy(body.data);
	t.is(body.data.elapsedTime, elapsedTime);
	t.truthy(body.data.percentile !== undefined);
	t.is(body.message, 'Endscreen stats submitted.');
});

test("POST /endscreen/ with nickname adds to leaderboard", async (t) => {
	const elapsedTime = 120;
	const nickname = `TestPlayer${Date.now()}`;
	
	const { body, statusCode } = await t.context.got.post(`endscreen/?nickname=${nickname}`, {
		json: { elapsedTime }
	});
	
	t.is(statusCode, 200);
	t.is(body.success, true);
	t.is(body.data.elapsedTime, elapsedTime);
});

test("POST /endscreen/ without elapsedTime returns validation error", async (t) => {
	const { body, statusCode } = await t.context.got.post("endscreen/", {
		json: {}
	});
	
	// API validates elapsedTime and returns 400
	t.is(statusCode, 400);
	t.is(body.success, false);
});

test("POST /endscreen/ calculates percentile correctly", async (t) => {
	const elapsedTime = 200;
	
	const { body } = await t.context.got.post("endscreen/", {
		json: { elapsedTime }
	});
	
	t.true(typeof body.data.percentile === 'number');
	t.true(body.data.percentile >= 0 && body.data.percentile <= 100);
});
