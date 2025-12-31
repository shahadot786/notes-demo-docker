# Notes App

A robust and simple note-taking application built with Node.js, Express, and MongoDB. This project features centralized error handling, environment variable management, and a full integration testing suite.

## 🚀 Features
- **CRUD Operations**: Create, Read, Update, and Delete notes.
- **Soft Delete**: Notes are marked as deleted instead of being permanently removed.
- **Search & Filter**: Built-in support for searching notes (via text indexes) and filtering by status (archived, pinned, etc.).
- **Global Error Handling**: Centralized middleware for consistent API responses.
- **Dockerized**: Fully containerized setup for easy deployment.
- **Test-Driven**: Integration tests covering all major API functionalities.

## 🛠️ Technologies
- **Backend**: Node.js, Express
- **Database**: MongoDB, Mongoose
- **Testing**: Jest, Supertest, MongoDB Memory Server
- **DevOps**: Docker, Docker Compose

## 📂 Project Structure
```text
├── src/
│   ├── config/         # Configuration (DB, Env)
│   ├── controllers/    # Request handlers
│   ├── middlewares/    # Custom middlewares (Error handling)
│   ├── models/         # Mongoose schemas
│   ├── routes/         # Express routes
│   ├── utils/          # Utility functions (asyncHandler)
│   └── index.js        # App entry point
├── tests/              # Integration tests
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Multi-container setup
└── .env.example        # Template for environment variables
```

## 🏁 Getting Started

### Prerequisites
- Node.js (v20+)
- MongoDB (or Docker)

### Installation
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   *(Update the `.env` file with your MongoDB URI if not using the default local setup).*

### Running the App
**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

### Running Tests
```bash
npm test
```

## 🐳 Docker Setup
Run the entire stack (Node.js + MongoDB) with a single command:
```bash
docker compose up -d --build
```
The API will be available at `http://localhost:8000`.

## 📌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Health check |
| GET | `/api/notes` | Get all notes (active) |
| POST | `/api/notes` | Create a new note |
| GET | `/api/notes/:id` | Get a note by ID |
| PATCH | `/api/notes/:id`| Update a note |
| DELETE| `/api/notes/:id`| Soft delete a note |

---
*Created with ❤️ by MD Shahadot Hossain*