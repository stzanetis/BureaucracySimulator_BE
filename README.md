# Bureaucracy Simulator – Backend API

Node.js / Express backend for the **Bureaucracy Simulator** game.

This implementation is based on:

- `swagger.json` OpenAPI spec
- `userstories.json`
- `requirements.json`

It uses:

- ES modules (`"type": "module"`)
- Async/await everywhere
- Centralized error handling
- Basic Authentication
- Mongoose models (for structure) and **mock in-memory data** (for gameplay)

## Features

- **Start Screen**
  - `GET /startscreen/` – list of song URLs

- **Leaderboard**
  - `GET /leaderboard/` – get leaderboard
  - `PUT /leaderboard/:name` – upsert leaderboard entry (extra)
  - `DELETE /leaderboard/:name` – delete leaderboard entry (extra)

- **About Us**
  - `GET /about-us/` – paragraph describing the “department”

- **End Screen**
  - `GET /endscreen/` – example stats (elapsed time & percentile)
  - `POST /endscreen/?nickname=YourName` – submit elapsed time and update leaderboard

- **Users / Tasks**
  - `POST /user/` – submit `{ nickname, seed }`, returns a to-do list of 4 tasks
  - `GET /user/` – list mock users (extra)
  - `GET /user/homescreen/todolist` – updated to-do list
  - `GET /user/homescreen/tasks/:taskID/` – get a specific task
  - `PUT /user/homescreen/tasks/:taskID` – submit `{ userInput }` and get `{ isTaskCompleted }`
  - `DELETE /user/homescreen/tasks/:taskID` – delete a task (extra; for DELETE requirement)
  - `GET /user/homescreen/tasks/9/payment-portal/` – coffee payment status
  - `POST /user/homescreen/tasks/9/payment-portal/pay` – simulate paying for the coffee (extra)
  - `POST /user/homescreen/tasks/9/payment-portal/reset` – reset coffee payment (extra)

> This satisfies the requirement for at least:
> - 10 accessible routes
> - 1 GET, 1 POST, 1 PUT, 1 DELETE (all exist on different resources; leaderboard & task routes show near-CRUD)
> - At least 3 interacting entities (Users, Tasks, Leaderboard entries, Departments, Attempts)

## Authentication

All routes are protected by **HTTP Basic Auth**:

- Default username: `admin`
- Default password: `supersecret`

You can override them via `.env`:

```env
BASIC_AUTH_USER=admin
BASIC_AUTH_PASS=supersecret
