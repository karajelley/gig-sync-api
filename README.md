# Gig Sync API

GigSync is a Service Project Management CMS platform designed to help freelancers and gig workers manage their projects and clients. With this tool, you can track project progress, manage client information, and maintain an organized workflow.

---

## Features

- **User Authentication and Authorization**: Secure login and role-based access control.
- **Project Management**: Create, update, track, and manage projects.
- **Client Management**: Manage client information and relationships.
- **RESTful API**: Seamless integration with frontend applications.

---

## Technologies Used

- **Node.js**: Runtime environment for building scalable network applications.
- **Express.js**: Fast, minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for managing data.
- **JWT**: JSON Web Tokens for secure authentication and authorization.
- **MERN Stack**: Designed to integrate seamlessly with React.js for the frontend.

---

## Setup Instructions

### Prerequisites

- Node.js and npm installed (check with `node -v` and `npm -v`).
- MongoDB instance running (local or cloud, e.g., MongoDB Atlas).

### Steps

1. **Clone the repository**:  
   ```bash
   git clone https://github.com/karajelley/gig-sync-api.git
   cd gig-sync-api

2. **Install dependencies**:
   ```bash
   npm install

3. **Set up environment variables**:
- Create a `.env` file in the root directory.
- Add the necessary environment variables.

4. **Run the application locally**:
   ```bash
   nodemon

5. **Access the deployed API at:**:
- Base URL: `https://gig-sync-api.vercel.app/api`


---
#### API Documentation

Refer to the detailed API documentation for all endpoints and their usage. For example:
- **Get all projects**: `GET /api/projects`
- **Create a new project**: `POST /api/projects`
- **Get client list**: `GET /api/clients`

## Deployment

The API is deployed on Vercel and can be accessed at:  
[https://gig-sync-api.vercel.app/api](https://gig-sync-api.vercel.app/api)


---
### Usage

AUTH ROUTES

| Method | Endpoint               | Request                                        | Return Value             | Action                           |
| ------ | ---------------------- | ---------------------------------------------- | ------------------------ | -------------------------------- |
| POST   | `/auth/signup`         | { email, password }                            |                          | Create account                   |
| POST   | `/auth/login`          | { email, password, name }                      | JWT auth token           | Login to account                 |
| GET    | `/auth/verify`         |                                                | Decoded JWT Token        | User credentials verifie         |



PROJECT ROUTES

| Method | Endpoint               | Request                                        | Return Value             | Action                           |
| ------ | ---------------------- | ---------------------------------------------- | ------------------------ | -------------------------------- |
| POST   | `/projects`            | { title, description, budget, status, client } | Project object           | Add new project                  |
| GET    | `/projects`            |                                                | Array of project objects | Fetch all projects for auth user |
| GET    | `/projects/search`     |                                                | Array of project objects | Search for a project             |
| GET    | `/projects/:id`        |                                                | Current project object   | Fetch a single project           |
| PUT    | `/projects/:id`        |                                                | Updated project object   | Update a single project          |
| DELETE | `/projects/:id`        |                                                |                          | Delete a single project          |



CLIENT ROUTES

| Method | Endpoint               | Request                                        | Return Value             | Action                           |
| ------ | ---------------------- | ---------------------------------------------- | ------------------------ | -------------------------------- |
| POST   | `/clients`             | { name, email, phone, company }                | Client object             | Add new client                  |
| GET    | `/clients`             |                                                | Array of client objects   | Fetch all clients for auth user |
| GET    | `/clients/search`      |                                                | Array of client objects   | Search for a client             |
| GET    | `/clients/:id`         |                                                | Current client object     | Fetch a single client           |
| PUT    | `/clients/:id`         |                                                | Updated client object     | Update a single client          |
| DELETE | `/clients/:id`         |                                                |                           | Delete a single client          |



  
    
















