/**
 * @fileoverview AVA test runner configuration.
 * Defines settings for running unit and integration tests.
 * @see https://github.com/avajs/ava/blob/main/docs/06-configuration.md
 * @module ava.config
 */

/**
 * AVA configuration object.
 * @type {import('ava').Config}
 */
export default {
	// Suppress Node.js deprecation and experimental warnings during tests
	nodeArguments: [
		'--no-warnings'
	],
	
	// Glob pattern for test file discovery
	files: [
		'test/**/*.test.js'
	],
	
	// Maximum time allowed per test before timeout (30 seconds)
	timeout: '30s',
	
	// Enable verbose output showing individual test names
	verbose: true,
	
	// Run up to 5 test files concurrently for faster execution
	concurrency: 5
};
