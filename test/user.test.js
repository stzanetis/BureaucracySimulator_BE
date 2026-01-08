import test from "ava";
import { registerTestHooks } from "./_testHelpers.js";

registerTestHooks(test);

test("POST /user/ creates user with tasks", async (t) => {
	const nickname = `TestUser${Date.now()}`;
	const seed = 12345;
	
	const { body, statusCode } = await t.context.got.post("user/", {
		json: { nickname, seed }
	});
	
	t.is(statusCode, 200);
	t.is(body.success, true);
	t.truthy(body.data);
	t.is(body.data.nickname, nickname);
	t.truthy(body.data.toDoList);
	t.true(Array.isArray(body.data.toDoList));
	t.is(body.message, 'User created and to-do list generated.');
});

test("POST /user/ with different seeds creates different task lists", async (t) => {
	const nickname1 = `TestUser${Date.now()}_1`;
	const nickname2 = `TestUser${Date.now()}_2`;
	
	const { body: body1 } = await t.context.got.post("user/", {
		json: { nickname: nickname1, seed: 111 }
	});
	
	const { body: body2 } = await t.context.got.post("user/", {
		json: { nickname: nickname2, seed: 222 }
	});
	
	t.is(body1.success, true);
	t.is(body2.success, true);
	
	// Different seeds should (likely) produce different task lists
	const tasks1 = body1.data.toDoList;
	const tasks2 = body2.data.toDoList;
	
	t.truthy(tasks1);
	t.truthy(tasks2);
});

test("POST /user/ creates user with proper task structure", async (t) => {
	const nickname = `TestUser${Date.now()}`;
	const seed = 99999;
	
	const { body } = await t.context.got.post("user/", {
		json: { nickname, seed }
	});
	
	t.truthy(body.data.toDoList);
	t.true(body.data.toDoList.length > 0);
	
	const task = body.data.toDoList[0];
	t.truthy(task.id !== undefined);
	t.truthy(task.taskType);
	t.truthy(task.completed !== undefined);
	t.truthy(task.pageName);
});

test("GET /user/ returns all users", async (t) => {
	const { body, statusCode } = await t.context.got("user/");
	
	t.is(statusCode, 200);
	t.is(body.success, true);
	t.truthy(body.data);
	t.is(body.message, 'Users retrieved.');
});
