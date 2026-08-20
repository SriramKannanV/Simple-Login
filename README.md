# Simple Login App

A full-stack application for managing user data. This project demonstrates fetching data from a REST API, managing state in React, inline-editing components, and handling CRUD operations (Create, Read, Update, Delete).

## 📂 Project Structure

This repository contains two main folders:

- `frontend`: The React application (UI and state management).
- `backend`: The server/API (handles database logic and serves data to the frontend on port 8080).

---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### 1. Backend Setup

1. Open your terminal and navigate to the backend folder:

   ```bash
   cd backend
   ```

   1. Install the dependencies:

   ```bash
   npm install
   ```

   2. Start the backend server:

   ```bash
   npm start
   ```

   The backend should now be running on http://localhost:8080.

2. Frontend Setup
   1. Open a new terminal window and navigate to the frontend folder:

   ```bash
   cd frontend
   ```

   2. Install the dependencies:

   ```bash
   npm install
   ```

   3. Set up your environment variables:

   Create a file named .env in the root of the frontend folder.
   Add your backend API URL. For example (if using Create React App):

   ```bash
   REACT_APP_API_URL=http://localhost:8080
   ```

   (If using Vite, use VITE_API_URL=http://localhost:8080 instead).

3. Start the development server:

   ```bash
   npm start
   ```

   (Use npm run dev if you are using Vite).
