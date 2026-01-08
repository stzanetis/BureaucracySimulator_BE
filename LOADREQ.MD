# Load & Performance Requirements

## Scope

This document defines the non-functional performance requirements for the
Bureaucracy Simulator backend API.  
The requirements are validated using k6 load and spike tests executed in
the CI environment.

---

## Selected Backend Routes

### Route 1: GET /leaderboard/

Returns leaderboard data for completed user attempts.

### Route 2: GET /startscreen/

Returns initial content required to render the start screen.

---

## Non-Functional Requirements

### 1. Response Time Requirements

| Route         | Metric                | Threshold  |
|---------------|---------------------- |------------|
| /leaderboard/ | p95 response time     | ≤ 200 ms   |
| /leaderboard/ | average response time | ≤ 100 ms   |
| /startscreen/ | p95 response time     | ≤ 200 ms   |
| /startscreen/ | average response time | ≤ 100 ms   |

---

### 2. Fault Tolerance Requirements

| Route      | Requirement                |
|------------|--------------------------- |
| All routes | HTTP error rate ≤ 1%       |
| All routes | No HTTP 5xx responses      |

---

### 3. Concurrency Requirements

| Route         | Test Type  | Virtual Users           |
|---------------|------------|------------------------ |
| /leaderboard/ | Load Test  | 50 VUs for 60 seconds   |
| /leaderboard/ | Spike Test | Spike up to 500 VUs     |
| /startscreen/ | Load Test  | 12 VUs for 60 seconds   |
| /startscreen/ | Spike Test | Spike up to 30 VUs      |

---

## Notes

The thresholds are intentionally set below the system breaking point in order
to ensure successful execution within the CI environment and enable early
detection of performance regressions.
