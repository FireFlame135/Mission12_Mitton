# Mission 11: Online Bookstore

**Author:** Tyler Mitton  
**Course:** IS 413  

## Project Overview
This project is a full-stack web application designed to manage and display an online bookstore's inventory. It replicates the core foundational features of an e-commerce catalog, complete with a robust backend API and a dynamic frontend interface. 

The application connects to a populated SQLite database containing a collection of books, displaying their details (Title, Author, Publisher, ISBN, Category, Page Count, and Price). It features server-side pagination (displaying 5 books per page) and dynamic sorting capabilities to ensure optimal performance and user experience.

## Tech Stack
* **Backend:** ASP.NET Core Web API (C#)
* **Frontend:** React (TypeScript) built with Vite
* **Database:** SQLite
* **ORM:** Entity Framework Core (Database-First approach)
* **Styling:** Bootstrap

## Features
* **Dynamic Pagination:** Server-side logic to efficiently load books 5 at a time, generating dynamic page links on the frontend.
* **Custom Sorting:** Users can sort the book catalog alphabetically by title.
* **Clean Architecture:** Strict separation of concerns between the API and the React client.

## Getting Started

### Prerequisites
* [.NET 8 SDK](https://dotnet.microsoft.com/download) (or newer)
* [Node.js](https://nodejs.org/)

### 1. Start the Backend (API)
From the project root:

```bash
cd backend
dotnet restore
dotnet run
```

Backend URLs (from launch settings):
* `http://localhost:5145`
* `https://localhost:7145`

Swagger UI is available in Development mode at:
* `https://localhost:7145/swagger`
* `http://localhost:5145/swagger`

### 2. Start the Frontend (React + Vite)
Open a second terminal from the project root:

```bash
cd frontend
npm install
npm run dev
```

Frontend dev server runs at:
* `http://localhost:5173`

### 3. Verify the App
1. Confirm the backend is running by opening Swagger.
2. Confirm the frontend is running at `http://localhost:5173`.
3. Load the bookstore page and verify books render with pagination.

## Development Notes

### CORS
The API currently allows frontend origins:
* `http://localhost:5173`
* `http://localhost:5174`

If your frontend runs on a different port, update CORS settings in `backend/Program.cs`.

### Database
The SQLite database file is pre-seeded and tracked in this repository:
* `backend/Bookstore.sqlite`

No migration step is required for standard local development.

## Project Structure

```text
Mission11/
├── backend/   # ASP.NET Core Web API + SQLite/EF Core
├── frontend/  # React + TypeScript + Vite client
└── README.md
```

## Common Commands

Backend:

```bash
cd backend
dotnet run
```

Frontend:

```bash
cd frontend
npm run dev
```