# TaskFlow Frontend

A modern React frontend for the TaskFlow MERN application with authentication, task management, and a responsive design.

## Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable React components
│   │   ├── Auth.js         # Login/Register form
│   │   ├── ProtectedRoute.js   # Route protection wrapper
│   │   ├── TaskForm.js     # Task creation/edit form
│   │   ├── TaskList.js     # Task list display
│   │   └── TaskCard.js     # Individual task card
│   ├── pages/              # Page components
│   │   └── Dashboard.js    # Main dashboard page
│   ├── services/           # API integration
│   │   └── api.js          # Axios API client
│   ├── context/            # React Context
│   │   └── AuthContext.js  # Authentication context
│   ├── App.js              # Main app component with routing
│   ├── index.js            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static files
│   └── index.html          # HTML template
├── package.json            # Dependencies and scripts
└── .env.example            # Environment variable template
```

## Installation

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

3. Update `.env` with your API URL:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the App

Start the development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

## Build for Production

```bash
npm run build
```

## Features

✅ User Authentication (Register/Login)  
✅ Create, Read, Update, Delete Tasks  
✅ Task Filtering by Status & Priority  
✅ Due Date Management  
✅ Responsive Design  
✅ Protected Routes  
✅ Real-time Task Statistics

## Components

### Auth.js
Handles user login and registration with form validation.

### TaskForm.js
Form component for creating and editing tasks with all fields (title, description, status, priority, due date).

### TaskList.js & TaskCard.js
Display tasks with status badges, priority indicators, and action buttons.

### ProtectedRoute.js
Wrapper component to protect routes that require authentication.

## Context API

### AuthContext.js
Manages global authentication state including:
- User data
- Auth token
- Login/Logout functions
- Authentication status

## API Integration

The `api.js` service provides:
- Automatic request interceptors for JWT tokens
- Auth endpoints (register, login)
- Task CRUD endpoints (GET, POST, PUT, DELETE)

## Styling

Global styles use CSS variables for theming and are fully responsive. Component-specific styles are co-located with each component.

CSS Variables:
- `--accent`: Main brand color (#0e7c66)
- `--text`: Main text color
- `--panel`: Panel backgrounds
- `--border`: Border color
- `--shadow`: Drop shadow effect
