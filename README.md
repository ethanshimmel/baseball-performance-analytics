# Baseball Performance Analytics Dashboard

## Project Overview
A web application that allows baseball players to
record game statistics and track season performance.

## Technologies
- HTML, CSS, JavaScript
- Node.js and Express
- EJS
- SQLite
- Jest

## Features
- User registration and login
- Secure password hashing
- Game statistics entry
- Input validation
- Season batting totals
- AVG, OBP, SLG, and OPS calculations

## Architecture
The application uses a layered architecture.
Routes handle incoming requests, services handle
business logic, repositories manage database access,
and SQLite stores application data.

## Design Patterns
- Service Layer Pattern
- Repository Pattern

## Run Locally
1. Clone the repository.
2. Run npm install.
3. Create a .env file with PORT and SESSION_SECRET.
4. Run npm run dev.
5. Open http://localhost:3000.

## Run Tests
Run npm test.

## Current Limitations
- Statistics are entered manually.
- Users cannot yet edit or delete games.
- Advanced charts and performance filters are planned
  for future development.

## Future Enhancements
- Game editing and deletion
- Performance charts
- CSV import and export
- Advanced statistical analysis