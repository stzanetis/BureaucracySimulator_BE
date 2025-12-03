import 'dotenv/config';
import http from "node:http";
import test from "ava";
import got from "got";
import app from "../app.js";

test.before(async (t) => {
	t.context.server = http.createServer(app);
	const server = t.context.server.listen();
	const { port } = server.address();
	
	t.context.gotBase = got.extend({
		responseType: "json",
		prefixUrl: `http://localhost:${port}`,
		throwHttpErrors: false
	});
});

test.after.always((t) => {
	t.context.server.close();
});

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
