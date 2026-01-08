import test from "ava";
import { registerTestHooks } from "./_testHelpers.js";

registerTestHooks(test);

// Basic sanity test
test("Test setup works", (t) => {
	t.pass();
});
