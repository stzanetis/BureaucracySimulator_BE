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
