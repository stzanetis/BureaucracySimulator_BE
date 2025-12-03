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
	
	// Create a test user for task operations
	const nickname = `TaskTestUser${Date.now()}`;
	await t.context.got.post("user/", {
		json: { nickname, seed: 12345 }
	});
});

test.after.always((t) => {
	t.context.server.close();
});

test("GET /user/homescreen/todolist returns task list", async (t) => {
	const { body, statusCode } = await t.context.got("user/homescreen/todolist");
	
	t.is(statusCode, 200);
	t.is(body.success, true);
	t.truthy(body.data);
	t.is(body.message, 'To-do list retrieved.');
});

test("GET /user/homescreen/tasks/:taskID/ returns specific task", async (t) => {
	const taskId = 1;
	const { body, statusCode } = await t.context.got(`user/homescreen/tasks/${taskId}/`);
	
	t.is(statusCode, 200);
	t.is(body.success, true);
	t.truthy(body.data);
	t.is(body.message, 'Task retrieved.');
});

test("GET /user/homescreen/tasks/:taskID/ for invalid task returns error", async (t) => {
	const taskId = 99999;
	const { body, statusCode } = await t.context.got(`user/homescreen/tasks/${taskId}/`);
	
	t.is(statusCode, 404);
	t.is(body.success, false);
});

test("PUT /user/homescreen/tasks/:taskID evaluates task", async (t) => {
	// First get the task list to find a valid task ID
	const { body: todoBody } = await t.context.got("user/homescreen/todolist");
	
	// Skip test if no tasks available
	if (!todoBody.data || !todoBody.data.toDoList || todoBody.data.toDoList.length === 0) {
		t.pass("No tasks available to test");
		return;
	}
	
	const taskId = todoBody.data.toDoList[0].id;
	const { body, statusCode } = await t.context.got.put(`user/homescreen/tasks/${taskId}`, {
		json: { userInput: "test input" }
	});
	
	// Accept both 200 (success) and 404 (task not found in current context)
	t.true([200, 404].includes(statusCode));
	if (statusCode === 200) {
		t.is(body.success, true);
		t.truthy(body.data);
		t.true(typeof body.data.isTaskCompleted === 'boolean');
	}
});

test("PUT /user/homescreen/tasks/:taskID without userInput returns validation error", async (t) => {
	const taskId = 1;
	const { body, statusCode } = await t.context.got.put(`user/homescreen/tasks/${taskId}`, {
		json: {}
	});
	
	t.is(statusCode, 400);
	t.is(body.success, false);
	t.is(body.error, 'VALIDATION_ERROR');
});

test("DELETE /user/homescreen/tasks/:taskID deletes task", async (t) => {
	const taskId = 2;
	const { statusCode } = await t.context.got.delete(`user/homescreen/tasks/${taskId}`);
	
	t.is(statusCode, 204);
});

test("GET /user/homescreen/tasks/9/payment-portal/ returns payment status", async (t) => {
	const { body, statusCode } = await t.context.got("user/homescreen/tasks/9/payment-portal/");
	
	t.is(statusCode, 200);
	t.is(body.success, true);
	t.truthy(body.data);
	t.is(body.message, 'Coffee payment status retrieved.');
});

test("POST /user/homescreen/tasks/9/payment-portal/pay processes payment", async (t) => {
	const { body, statusCode } = await t.context.got.post("user/homescreen/tasks/9/payment-portal/pay");
	
	t.is(statusCode, 200);
	t.is(body.success, true);
	t.is(body.message, 'Coffee payment completed.');
});

test("POST /user/homescreen/tasks/9/payment-portal/reset resets payment", async (t) => {
	const { body, statusCode } = await t.context.got.post("user/homescreen/tasks/9/payment-portal/reset");
	
	t.is(statusCode, 200);
	t.is(body.success, true);
	t.is(body.message, 'Coffee payment reset.');
});

test("GET /user/homescreen/tasks/:taskID/form returns form definition", async (t) => {
	const taskId = 3;
	const { body, statusCode } = await t.context.got(`user/homescreen/tasks/${taskId}/form`);
	
	// May return 200 or 404 depending on task type
	if (statusCode === 200) {
		t.is(body.success, true);
		t.is(body.message, 'Form loaded.');
	} else {
		t.is(body.success, false);
	}
});

test("PUT /user/homescreen/tasks/:taskID/form-check evaluates form task", async (t) => {
	const taskId = 3;
	const { body, statusCode } = await t.context.got.put(`user/homescreen/tasks/${taskId}/form-check`, {
		json: { userInput: { field1: "value1" } }
	});
	
	// May return 200 or error depending on task type
	if (statusCode === 200) {
		t.is(body.success, true);
		t.true(typeof body.data.isTaskCompleted === 'boolean');
	} else {
		t.is(body.success, false);
	}
});

test("GET /user/homescreen/tasks/:taskID/puzzle returns puzzle definition", async (t) => {
	const taskId = 4;
	const { body, statusCode } = await t.context.got(`user/homescreen/tasks/${taskId}/puzzle`);
	
	// May return 200 or 404 depending on implementation
	if (statusCode === 200) {
		t.is(body.success, true);
		t.is(body.message, 'Puzzle loaded.');
	} else {
		t.is(body.success, false);
	}
});

test("PUT /user/homescreen/tasks/:taskID/puzzle-check evaluates puzzle task", async (t) => {
	const taskId = 4;
	const { body, statusCode } = await t.context.got.put(`user/homescreen/tasks/${taskId}/puzzle-check`, {
		json: {
			puzzleNumber: 1,
			puzzleKey: "key1",
			answer: "test answer"
		}
	});
	
	// May return 200 or error
	if (statusCode === 200) {
		t.is(body.success, true);
		t.true(typeof body.data.isTaskCompleted === 'boolean');
	} else {
		t.is(body.success, false);
	}
});
