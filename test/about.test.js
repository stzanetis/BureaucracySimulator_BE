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
