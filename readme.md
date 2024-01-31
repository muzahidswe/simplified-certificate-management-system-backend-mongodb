# Simplified Certificate Management System Backend
```
This is the backend repository for Simplified Certificate Management System
```

## Backend (Node.js with Express)
```
This backend is developed using Node.js with Express Framework
```

# Project Structure Explanation

### Root Directory:

```
`.gitignore`: Ignore files and directories from version control.
`package.json: Node.js project configuration.
`README.md`: Project documentation.
```

### Source Code:
```
`src/`: Source code directory.
`index.js`: Main entry point for the application.
`config/`: Configuration files (database, environment, etc.).
`controllers/`: Route handlers and business logic.
`models/`: Database models.
`routes/`: Route definitions.
`tests/`: Unit Test files.
```

### Database:
```
`db/`: Database-related files.
```

### Testing:
```
`tests/`: Unit Test files.
```

# Setup and Run Guide

## Setup Project

### Clone the Repository:
```
git clone `https://github.com/muzahidswe/simplified-certificate-management-system-backend-mongodb.git`
```

### Navigate to the Backend Directory:
```
cd your-repo/backend
```

### Install Dependencies:
```
npm install
```

### Set Up Environment Variables:
```
Copy the `.env.example` file to `.env` and configure it with your environment variables.
```

## Run Project
```
`npm run dev`
```

### Verify Backend is Running:
```
Open your browser and go to `http://localhost:8989` || AS I'm using port: 8989
```

# Unit Test Guide
```
`npx jest` or `npm test`
```

# Unit Test Output
```
Test Suites: 2 passed, 2 total
Tests:       6 passed, 6 total
```

# Swagger API URL
```
http://localhost:8989/api-docs/
```