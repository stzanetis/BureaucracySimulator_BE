/**
 * Shared utilities for k6 load/spike tests
 * Eliminates duplicate code across test files
 */
import encoding from 'k6/encoding';

// Environment configuration
export const USERNAME = __ENV.BASIC_AUTH_USER;
export const PASSWORD = __ENV.BASIC_AUTH_PASS;
export const BASE_URL = __ENV.BASE_URL || 'http://localhost:4000';

/**
 * Creates Basic Auth params for HTTP requests
 * @returns {object} HTTP request params with Authorization header
 */
export function createAuthParams() {
	const credentials = encoding.b64encode(`${USERNAME}:${PASSWORD}`);
	return {
		headers: {
			'Authorization': `Basic ${credentials}`,
		},
	};
}

/**
 * Standard checks for HTTP responses
 */
export const standardChecks = {
	'status is 200': (r) => r.status === 200,
	'no 5xx errors': (r) => r.status < 500,
	'response has body': (r) => r.body && r.body.length > 0,
};

/**
 * Load test stage configuration (sustained load)
 */
export const loadTestStages = [
	{ duration: '10s', target: 50 },   // Ramp up to 50 VUs
	{ duration: '600s', target: 50 },  // Stay at 50 VUs for 600 seconds
	{ duration: '10s', target: 0 },    // Ramp down to 0 VUs
];

/**
 * Spike test stage configuration (burst traffic)
 */
export const spikeTestStages = [
	{ duration: '10s', target: 50 },   // Ramp up to baseline
	{ duration: '20s', target: 50 },   // Stay at baseline
	{ duration: '5s', target: 500 },   // Spike up to 500 VUs
	{ duration: '30s', target: 500 },  // Stay at spike level
	{ duration: '5s', target: 50 },    // Scale down to baseline
	{ duration: '20s', target: 50 },   // Stay at baseline for recovery
	{ duration: '10s', target: 0 },    // Ramp down to 0
];

/**
 * Standard thresholds for tests
 * @param {object} durationThresholds - Custom duration thresholds
 * @returns {object} Thresholds configuration
 */
export function createThresholds(durationThresholds = { p95: 200, avg: 100 }) {
	return {
		http_req_duration: [
			`p(95)<${durationThresholds.p95}`,
			`avg<${durationThresholds.avg}`,
		],
		http_req_failed: ['rate<0.01'],
		'checks': ['rate>0.99'],
	};
}

/**
 * Generates a text summary for test results
 * @param {object} data - k6 summary data
 * @param {object} options - Formatting options
 * @param {string} testName - Name of the test for the header
 * @param {object} thresholds - Threshold values for display
 * @returns {string} Formatted summary text
 */
export function textSummary(data, options, testName, thresholds = { avg: 100, p95: 200 }) {
	const indent = options.indent || '';
	let summary = `\n=== ${testName} ===\n\n`;

	if (data.metrics.http_req_duration) {
		const duration = data.metrics.http_req_duration;
		summary += `${indent}HTTP Request Duration:\n`;
		summary += `${indent}  avg: ${duration.values.avg.toFixed(2)}ms (threshold: <${thresholds.avg}ms)\n`;
		summary += `${indent}  p95: ${duration.values['p(95)'].toFixed(2)}ms (threshold: <${thresholds.p95}ms)\n`;
		summary += `${indent}  min: ${duration.values.min.toFixed(2)}ms\n`;
		summary += `${indent}  max: ${duration.values.max.toFixed(2)}ms\n\n`;
	}

	if (data.metrics.http_req_failed) {
		const failed = data.metrics.http_req_failed;
		summary += `${indent}HTTP Errors:\n`;
		summary += `${indent}  rate: ${(failed.values.rate * 100).toFixed(2)}% (threshold: <1%)\n\n`;
	}

	if (data.metrics.checks) {
		const checks = data.metrics.checks;
		summary += `${indent}Checks:\n`;
		summary += `${indent}  passed: ${(checks.values.rate * 100).toFixed(2)}%\n\n`;
	}

	if (data.metrics.iterations) {
		summary += `${indent}Total Iterations: ${data.metrics.iterations.values.count}\n`;
	}

	return summary;
}

/**
 * Creates handleSummary function for k6 tests
 * @param {string} testName - Name of the test
 * @param {string} outputFile - Path to output JSON file
 * @param {object} thresholds - Threshold values for display
 * @returns {Function} handleSummary function
 */
export function createHandleSummary(testName, outputFile, thresholds = { avg: 100, p95: 200 }) {
	return function handleSummary(data) {
		return {
			'stdout': textSummary(data, { indent: ' ', enableColors: true }, testName, thresholds),
			[outputFile]: JSON.stringify(data, null, 2),
		};
	};
}
