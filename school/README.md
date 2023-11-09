# School App API

The School App API is a Java Spring Boot application that interacts with a PostgreSQL database to manage student records.

## Table of Contents

- [Students](#students)
  - [Retrieve All Students](#retrieve-all-students)
  - [Retrieve Student by ID](#retrieve-student-by-id)
  - [Create a New Student](#create-a-new-student)
  - [Update Student Information](#update-student-information)
  - [Delete Student](#delete-student)

## Students

The Students controller in this API provides the following endpoints to manage student records.

### Retrieve All Students

**Request:**

- HTTP Method: `GET`
- Endpoint: `/students`
- Description: Retrieve a list of all students.

**Response:**

- Status Code: 200 (OK)
- Response Body: A list of student records.
- Status Code: 500 (Internal Server Error)
- Response Body: If the API encounters an  error while trying to retrieve the list of students.


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
- Response Body: Bad request (if the id == null). 


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
