export default {
	nodeArguments: [
		'--no-warnings'
	],
	files: [
		'test/**/*.test.js'
	],
	timeout: '30s',
	verbose: true,
	concurrency: 5
};
