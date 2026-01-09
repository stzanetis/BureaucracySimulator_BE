/**
 * Startscreen Load Test
 * Tests sustained load on the startscreen endpoint
 */
import http from 'k6/http';
import { check, sleep } from 'k6';
import { 
  BASE_URL, 
  createAuthParams, 
  standardChecks, 
  loadTestStages, 
  createThresholds,
  createHandleSummary 
} from './helpers/testUtils.js';

export const options = {
  stages: loadTestStages,
  thresholds: createThresholds({ p95: 200, avg: 100 }),
};

const params = createAuthParams();

export default function () {
  const res = http.get(`${BASE_URL}/startscreen/`, params);
  check(res, standardChecks);
  sleep(0.5);
}

export const handleSummary = createHandleSummary(
  'STARTSCREEN LOAD TEST SUMMARY',
  'k6/results/startscreen-load-summary.json',
  { avg: 100, p95: 200 }
);
