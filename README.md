# Mini E-Commerce API

A Node.js backend application built with Express and TypeScript for e-commerce functionality.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT, bcrypt
- **File Handling**: Multer

## API Documentation

Complete API documentation is available at:
[https://documenter.getpostman.com/view/31238789/2sAYkErzoi](https://documenter.getpostman.com/view/31238789/2sAYkErzoi)

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or cloud)
- Cloudinary account (for image storage)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/savanfami/ecommachinetask.git
   cd ecommachinetask
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=port
   MONGO_URI=your_mongodb_connection_string
   REFRESH_SECRET=your_jwt_secret
   JWT_SECRET=your_jwt_secret

   ```

## Available Scripts

- **Development Mode**:
  ```
  npm run dev
  ```
  Starts the server with nodemon for automatic reloading during development.

- **Build**:
  ```
  npm run build
  ```
  Compiles TypeScript files to JavaScript in the `dist` directory.

- **Start Production Server**:
  ```
  npm start
  ```
  Runs the compiled JavaScript from the `dist` directory.

## Project Structure

```
ecommachinetask/
├── src/
│   ├── config/
│   │   └── connection.ts   # Database connection logic
│   ├── controllers/        # Controllers for handling requests
│   ├── middlewares/        # Authentication and other middlewares
│   ├── routes/
│   │   └── routes.ts       # API route definitions
│   ├── utils/              # Utility functions (e.g., multer for file uploads)
│   └── server.ts           # Entry point for the application
├── dist/                   # Compiled JavaScript (after build)
├── package.json            # Project metadata and dependencies
├── tsconfig.json           # TypeScript configuration
├── .env                    # Environment variables (user-created)
├── README.md               # Documentation
```

## API Endpoints

The API is accessible at `/api` base path. For detailed information about endpoints, request/response formats, and authentication requirements, please refer to the [API documentation](https://documenter.getpostman.com/view/31238789/2sAYkErzoi).

## Error Handling

The application includes a global error handler that processes and formats error responses.

## Authentication

Authentication is implemented using JWT (JSON Web Tokens) and cookies for secure user sessions.

## Database

MongoDB is used as the database with Mongoose ODM for schema definition and data management.

## File Uploads

The application supports file uploads using Multer for handling multipart/form-data.

---

## Development Notes

- API supports both JSON and URL-encoded request bodies
- Refer to the API documentation for testing and integration details