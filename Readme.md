# Assignment Management System - Backend

This backend is built using Node.js, Express, and MongoDB to manage user and admin operations for uploading and managing assignments.

## Technologies Used

- **Node.js**: JavaScript runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database.
- **Mongoose**: ODM for MongoDB.
- **JWT**: JSON Web Token for authentication.
- **Bcrypt.js**: Library to hash passwords.

## Installation and Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repo-url
   cd your-repo
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables by creating a `.env` file:

   ```bash
   JWT_SECRET=your_jwt_secret
   MONGO_URI=your_mongodb_uri
   ```

4. Run the server:

   ```bash
   npm start
   ```

   The server will start at `http://localhost:5000`.

## API Endpoints

### User Endpoints

- **Register a User**

  - **URL**: `/api/auth/register`
  - **Method**: `POST`
  - **Body**:
    ```json
    {
      "username": "user1",
      "password": "yourpassword",
      "role": "user"
    }
    ```
  - **Description**: Register a new user.

- **Login User**

  - **URL**: `/api/auth/login`
  - **Method**: `POST`
  - **Body**:
    ```json
    {
      "username": "user1",
      "password": "yourpassword"
    }
    ```
  - **Description**: Login as a user or admin. Returns a token for authentication.

- **Upload Assignment**

  - **URL**: `/api/assignment/upload`
  - **Method**: `POST`
  - **Body**:
    ```json
    {
      "task": "Complete Task 1",
      "admin": "adminObjectId"
    }
    ```
  - **Description**: Upload an assignment. Only users can upload assignments. The `admin` field must be the ObjectId of the admin.

- **Fetch All Admins**
  - **URL**: `/api/auth/admins`
  - **Method**: `GET`
  - **Description**: Fetch a list of all registered admins.

---

### Admin Endpoints

- **Register an Admin**

  - **URL**: `/api/auth/register`
  - **Method**: `POST`
  - **Body**:
    ```json
    {
      "username": "admin1",
      "password": "yourpassword",
      "role": "admin"
    }
    ```
  - **Description**: Register a new admin.

- **Login Admin**

  - **URL**: `/api/auth/login`
  - **Method**: `POST`
  - **Body**:
    ```json
    {
      "username": "admin1",
      "password": "yourpassword"
    }
    ```
  - **Description**: Admin login. Returns a token for authentication.

- **View Assignments (Admin)**

  - **URL**: `/api/assignment/assignments`
  - **Method**: `GET`
  - **Description**: Fetch all assignments tagged to the admin.

- **Accept Assignment**

  - **URL**: `/api/assignment/assignments/:id/accept`
  - **Method**: `POST`
  - **Description**: Admin accepts the assignment. The `id` is the assignment ID in the URL.

- **Reject Assignment**
  - **URL**: `/api/assignment/assignments/:id/reject`
  - **Method**: `POST`
  - **Description**: Admin rejects the assignment. The `id` is the assignment ID in the URL.

## Authentication

All protected routes require a valid JWT token passed in the `Authorization` header: Authorization: Bearer <token>
