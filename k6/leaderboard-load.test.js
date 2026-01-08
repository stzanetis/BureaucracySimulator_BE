/**
 * Leaderboard Load Test
 * Tests sustained load on the leaderboard endpoint
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
  thresholds: createThresholds({ p95: 100, avg: 50 }),
};

const params = createAuthParams();

export default function () {
  const res = http.get(`${BASE_URL}/leaderboard/`, params);
  check(res, standardChecks);
  sleep(0.5);
}

export const handleSummary = createHandleSummary(
  'LEADERBOARD LOAD TEST SUMMARY',
  'k6/results/leaderboard-load-summary.json',
  { avg: 50, p95: 100 }
);
