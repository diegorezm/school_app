# School App API

The School App API is a Java Spring Boot application that interacts with a PostgreSQL database to manage student records.

Roles: ["USER", "ADMIN"]

## Table of Contents
- [User](#user)
  - [Register suer](#register)
  - [Login](#login)
  - [Retrieve user information](#retrieve-user-information)


- [Students](#students)
  - [Retrieve All Students](#retrieve-all-students)
  - [Retrieve Student by ID](#retrieve-student-by-id)
  - [Create a New Student](#create-a-new-student)
  - [Update Student Information](#update-student-information)
  - [Delete Student](#delete-student)


## User
Users are the ones supposed to be able to look at the students records, only the
users with the ADMIN role should be able to create/delete/update the records.
### Register
**Request:**
- HTTP Method: `POST`
- Endpoint: `/auth/register`
- Description: To register a user.

**Request Body:**

```json
{
    "username": "John Doe",
    "password":"123456",
    "email": "john.doe@example.com",
    "role":"USER"
}
```

**Response:**

- Status Code: 200 (OK)
- Response Body: nothing
- Status Code: 500 (Internal Server Error)
- Response Body: If the API encounters an  error while trying to create the user

### Login
**Request:**
- HTTP Method: `POST`
- Endpoint: `/auth/login`
- Description: To login a user.

**Request Body:**

```json
{
    "password":"123456",
    "email": "john.doe@example.com"
}
```

**Response:**

- Status Code: 200 (OK)
- Response Body: jwt token
- Status Code: 403 (Forbidden)
- Response Body: If the api os not able to identify the user
- Status Code: 500 (Internal Server Error)
- Response Body: If the API encounters an  error while trying to create the user


### Retrieve User Information
**Request:**
- HTTP Method: `GET`
- Endpoint: `/user`
- Description: To login a user

**Response:**
- Status Code: 200 (OK)
- Response Body: User information
- Status Code: 403 (Forbidden)
- Response Body: If the api os not able to identify the user
- Status Code: 500 (Internal Server Error)
- Response Body: If the API encounters an  error while trying to retrieve the user
info


## Students

The Students controller in this API provides the following endpoints to manage student records.

### Retrieve All Students

**Request:**

- HTTP Method: `GET`
- Endpoint: `/students`
- Description: Retrieve a list of all students.

**Response:**

- Status Code: 200 (OK)
- Response Body: A list of student records
- Status Code: 500 (Internal Server Error)
- Response Body: If the API encounters an  error while trying to retrieve the list of students


### Retrieve Student by ID

**Request:**

- HTTP Method: `GET`
- Endpoint: `/students/{id}`
- Description: Retrieve a specific student by their unique ID.

**Response:**

- Status Code: 200 (OK)
- Response Body: Student information.
- Status Code: 404 (Not Found)
- Response Body: If the student is not found.

### Create a New Student

**Request:**

- HTTP Method: `POST`
- Endpoint: `/students`
- Description: Create a new student with the provided information.

**Request Body:**

```json
{
    "name": "John Doe",
    "age": "20",
    "course": "Math",
    "email": "john.doe@example.com"
}
```
**Response:**
- Status Code: 200 (Ok)
- Response Body: Student info
- Status Code: 400 (Bad Request)
- Response Body: If the API encounters an  error while trying to create the new student

### Update student information

**Request:**

- HTTP Method: `PUT`
- Endpoint: `/students`
- Description: Update the student information.

**Request Body:**

```json
{
    "id": "0aa8773e-138c-4337-8933-4ecd6b8e1f3b",
    "name": "John Doe",
    "age": "20",
    "course": "Math",
    "email": "john.doe@example.com"
}
```

**Response:**
- Status Code: 200 (Ok)
- Response Body: Updated student information
- Status Code: 404 (Not Found)
- Response Body: If the student is not found.
- Status Code: 400 (Bad Request)
- Response Body: If the user did not  include the '**id**' in the request body


### Delete Student 

**Request:**

- HTTP Method: `DELETE`
- Endpoint: `/students/{id}`
- Description: Delete a specific student by their unique ID.

**Response:**

- Status Code: 200 (OK)
- Response Body: Nothing.
- Status Code: 404 (Not Found)
- Response Body: If the student is not found.
