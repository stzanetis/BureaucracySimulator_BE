/**
 * @fileoverview Unit tests for utility helper functions.
 * Tests AppError class and seeded random number generator.
 * @module test/helpers.test
 */

import test from "ava";
import { AppError, createSeededRng } from "../utils/helpers.js";

/* ============================================
 * AppError Class Tests
 * Custom error class with HTTP status and error codes
 * ============================================ */

/**
 * Test: AppError creates an error with all specified properties
 */
test("AppError creates error with correct properties", (t) => {
	const error = new AppError("Test error", 400, "TEST_ERROR");
	
	t.is(error.message, "Test error");
	t.is(error.statusCode, 400);
	t.is(error.code, "TEST_ERROR");
	t.is(error.isOperational, true);
	t.true(error instanceof Error);
});

test("AppError uses default values when not provided", (t) => {
	const error = new AppError("Test error");
	
	t.is(error.message, "Test error");
	t.is(error.statusCode, 500);
	t.is(error.code, "INTERNAL_ERROR");
	t.is(error.isOperational, true);
});

test("AppError with only message and statusCode", (t) => {
	const error = new AppError("Not found", 404);
	
	t.is(error.message, "Not found");
	t.is(error.statusCode, 404);
	t.is(error.code, "INTERNAL_ERROR");
});

// Test createSeededRng function
test("createSeededRng returns a function", (t) => {
	const rng = createSeededRng(123);
	t.is(typeof rng, "function");
});

test("createSeededRng produces consistent results for same seed", (t) => {
	const rng1 = createSeededRng(12345);
	const rng2 = createSeededRng(12345);
	
	const values1 = [rng1(), rng1(), rng1()];
	const values2 = [rng2(), rng2(), rng2()];
	
	t.deepEqual(values1, values2);
});

test("createSeededRng produces different results for different seeds", (t) => {
	const rng1 = createSeededRng(111);
	const rng2 = createSeededRng(222);
	
	const value1 = rng1();
	const value2 = rng2();
	
	t.not(value1, value2);
});

test("createSeededRng returns values between 0 and 1", (t) => {
	const rng = createSeededRng(999);
	
	for (let i = 0; i < 100; i++) {
		const value = rng();
		t.true(value >= 0);
		t.true(value < 1);
	}
});

test("createSeededRng produces different sequential values", (t) => {
	const rng = createSeededRng(555);
	
	const value1 = rng();
	const value2 = rng();
	const value3 = rng();
	
	t.not(value1, value2);
	t.not(value2, value3);
	t.not(value1, value3);
});

test("createSeededRng handles seed value of 0", (t) => {
	const rng = createSeededRng(0);
	const value = rng();
	
	t.true(typeof value === 'number');
	t.true(value >= 0);
	t.true(value < 1);
});

test("createSeededRng handles undefined seed", (t) => {
	const rng = createSeededRng(undefined);
	const value = rng();
	
	t.true(typeof value === 'number');
	t.true(value >= 0);
	t.true(value < 1);
});
