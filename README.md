## Dockercompose explanation.
image → Use a prebuilt image (like MongoDB).

build → Build a custom image from a Dockerfile.

ports → Connect container ports to your machine.

volumes → Persist data outside the container.

environment → Set environment variables.

depends_on → Control startup order.

services → Define each container in your app.

volumes (bottom section) → Declare named storage.

## Frontend dockerfile

This Dockerfile:

Uses Node.js 18 as the base image

Sets /app as the working directory

Copies package.json files

Installs dependencies (there’s a typo: npm installl should be npm install)

Copies the rest of the project files

Exposes port 5173

Starts the app using npm run dev -- --host when the container runs

## Backend dockerfile

This Dockerfile:

Uses Node.js 18 as the base image

Sets /app as the working directory

Copies package.json files

Installs dependencies

Copies the rest of the project files

Exposes port 5000

Runs the app using npm start when the container starts

## Detail Explanation

Task Manager App – Docker Setup

This project runs a full-stack Task Manager application using Docker and Docker Compose.

It includes:

MongoDB (database)

Backend (Node.js API – runs on port 5000)

Frontend (Vite/Node app – runs on port 5173)

Project Structure
project-root/
│
├── docker-compose.yml
├── task-manager-backend/
│   └── Dockerfile
└── task-manager-frontend/
    └── Dockerfile
Services Overview
1. MongoDB

Uses the official MongoDB image

Runs on port 27017

Data is stored in a Docker volume (mongo-data)

2. Backend

Built from task-manager-backend/Dockerfile

Runs on port 5000

Connects to MongoDB using:

mongodb://mongodb:27017/taskmanager
3. Frontend

Built from task-manager-frontend/Dockerfile

Runs on port 5173

Depends on the backend service

Requirements

Make sure you have installed:

Docker

Docker Compose (or Docker Desktop)

How to Run the Project

From the project root directory:

docker compose up --build

This will:

Build backend and frontend images

Start MongoDB

Start backend

Start frontend

Access the Application

Frontend → http://localhost:5173

Backend API → http://localhost:5000

MongoDB → localhost:27017

Stopping the Containers

To stop the project:

docker compose down

If you also want to remove volumes (this deletes MongoDB data):

docker compose down -v
Notes

build in docker-compose means Docker builds the image using the Dockerfile in that folder.

depends_on controls startup order.

The MongoDB data is stored in a named volume (mongo-data) so it persists even if containers stop.

Frontend uses npm run dev -- --host to allow access outside the container.

Rebuilding After Changes

If you change code and want a fresh rebuild:

docker compose up --build

If containers are already running:

docker compose down
docker compose up --build