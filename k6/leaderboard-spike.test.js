/**
 * Leaderboard Spike Test
 * Tests burst traffic handling on the leaderboard endpoint
 */
import http from 'k6/http';
import { check, sleep } from 'k6';
import { 
  BASE_URL, 
  createAuthParams, 
  standardChecks, 
  spikeTestStages, 
  createThresholds,
  createHandleSummary 
} from './helpers/testUtils.js';

export const options = {
  stages: spikeTestStages,
  thresholds: createThresholds({ p95: 200, avg: 100 }),
};

const params = createAuthParams();

export default function () {
  const res = http.get(`${BASE_URL}/leaderboard/`, params);
  check(res, standardChecks);
  sleep(0.5);
}

export const handleSummary = createHandleSummary(
  'LEADERBOARD SPIKE TEST SUMMARY',
  'k6/results/leaderboard-spike-summary.json',
  { avg: 50, p95: 100 }
);
