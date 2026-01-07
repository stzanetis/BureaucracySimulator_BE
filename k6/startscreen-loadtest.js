import http from 'k6/http';
import { check, sleep } from 'k6';
import encoding from 'k6/encoding';

const USERNAME = __ENV.BASIC_AUTH_USER;
const PASSWORD = __ENV.BASIC_AUTH_PASS;
const BASE_URL = __ENV.BASE_URL || 'http://localhost:4000';

export const options = {
  stages: [
    { duration: '10s', target: 50 },  // Ramp up to 50 VUs
    { duration: '600s', target: 50 }, // Stay at 50 VUs for 600 seconds
    { duration: '10s', target: 0 },   // Ramp down to 0 VUs
  ],
  thresholds: {
    http_req_duration: [
      'p(95)<100', // p95 response time threshold
      'avg<50',    // Average response time threshold
    ],
    http_req_failed: ['rate<0.01'], // HTTP error rate ≤ 1%
    'checks': ['rate>0.99'],        // 99% of checks must pass
  },
};

// Create Basic Auth header
const credentials = encoding.b64encode(`${USERNAME}:${PASSWORD}`);
const params = {
  headers: {
    'Authorization': `Basic ${credentials}`,
  },
};

export default function () {
  const res = http.get(`${BASE_URL}/startscreen/`, params);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'no 5xx errors': (r) => r.status < 500,
    'response has body': (r) => r.body && r.body.length > 0,
  });

  sleep(0.5);
}

export function handleSummary(data) {
  return {
    'stdout': textSummary(data, { indent: ' ', enableColors: true }),
    'k6/results/startscreen-load-summary.json': JSON.stringify(data, null, 2),
  };
}

function textSummary(data, options) {
  const indent = options.indent || '';
  let summary = '\n=== STARTSCREEN LOAD TEST SUMMARY ===\n\n';

  if (data.metrics.http_req_duration) {
    const duration = data.metrics.http_req_duration;
    summary += `${indent}HTTP Request Duration:\n`;
    summary += `${indent}  avg: ${duration.values.avg.toFixed(2)}ms (threshold: <50ms)\n`;
    summary += `${indent}  p95: ${duration.values['p(95)'].toFixed(2)}ms (threshold: <100ms)\n`;
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
