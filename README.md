# What To Do

## **Back-End API**

&nbsp;

## A private task manager

&nbsp;

WHAT TO DO allows users to create a personal account and create tasks or reminder notes. Only authorized users can create new tasks for themselves and users can only see, modify and delete their own tasks.
Tasks can also be marked as finished or not.  
&nbsp;

Repository design pattern was implemented for this project so that the different parts are loosely coupled, hiding all complex implementation from on another, allowing scope for easy future development.

- [Repository Pattern With Javascript](https://dev.to/thanasismpalatsoukas/repository-pattern-with-javascript-4nl)  
  &nbsp;

## Technologies Used

&nbsp;

**Back-End**    : Node.js, Express.js  
**Database**    : PostgreSQL  
**ORM**     &nbsp;: Sequelize  
**Authentication** &nbsp;: JWT  
&nbsp;

## Features

&nbsp;

- Only authenticated users can create, read, update and delete tasks.
- Users can read, update and delete only their own tasks.
- Implemented Repository pattern to divide the whole project into modular parts that are loosly coupled with each other allowing easy future development.

  - Controllers
  - Services
  - Repositories
  - Database

- Errors are returend with proper error message and http status code.
- Implemented pagination when fetching list of a specific users or tasks.
- Implemented content negotiation for -

  - application/xml
  - text/html
  - text/plain
  - application/json

  &nbsp;

  &nbsp;

## API Documentation:

&nbsp;

### **End points for users**

&nbsp;

<table>
<tr>
<td> <strong>Description</strong> </td> 
<td> <strong>HTTP Method</strong> </td>
<td> <strong>URL</strong> </td>
<td> <strong>Expected Status Code</strong> </td>
<td> <strong>Request Body Example</strong> </td>
<td> <strong>Response Body Example</strong> </td>
</tr>

<tr>
<td> Sign up </td> 
<td> Post </td> 
<td> /users/auth/signUp </td> 
<td>201</td>
<td>

```json
{
  "userName": "john",
  "fullName": "John Doe",
  "email": "john@email.com",
  "password": "12345678",
  "confirmPassword": "12345678"
}
```

</td> 
<td>

```json
{
  "status": "success",
  "message": "User created",
  "data": {
    "token": "Sample Token"
  }
}
```

</td> 
</tr>

<tr>
<td> Log in </td> 
<td> Post </td> 
<td> /users/auth/logIn </td> 
<td>200</td>
<td>

```json
{
  "userName": "john",
  "password": "john@email.com"
}
```

</td> 
<td>

```json
{
  "status": "success",
  "message": "User logged in",
  "data": {
    "token": "Sample Token"
  }
}
```

</td> 
</tr>

<tr>
<td> Get user </td> 
<td> Get </td> 
<td> /users/user/:userName </td> 
<td>200</td>
<td>None</td> 
<td>

```json
{
  "status": "success",
  "message": "User Found",
  "data": {
    "id": 1,
    "userName": "john",
    "fullName": "John Doe",
    "email": "john@email.com",
    "passwordChangedAt": "2011-11-11T00:00:00.000Z",
    "createdOn": "2011-11-11T00:00:00.000Z",
    "modifiedOn": "2011-11-11T00:00:00.000Z"
  }
}
```

</td> 
</tr>

<tr>
<td> Update user </td> 
<td> Put </td> 
<td> /users/user/:userName </td> 
<td>200</td>
<td>

```json
{
  "fullName": "John Doe Update",
  "email": "john.update@email.com",
  "password": "12345678Update",
  "confirmPassword": "12345678Update"
}
```

</td> 
<td>

```json
{
  "status": "success",
  "message": "Update Successful",
  "data": {
    "id": 1,
    "userName": "john",
    "fullName": "John Doe Update",
    "email": "john.update@email.com",
    "passwordChangedAt": "2011-11-11T00:00:00.000Z",
    "createdOn": "2011-11-11T00:00:00.000Z",
    "modifiedOn": "2011-11-11T00:00:00.000Z"
  }
}
```

</td> 
</tr>

<tr>
<td> Delete user </td> 
<td> Delete </td> 
<td> /users/user/:userName </td> 
<td>204</td>
<td>None</td> 
<td>None</td> 
</tr>

<tr>
<td> Get users </td> 
<td> Get </td> 
<td>

/users/search?pageSize=5&pageNumber=1

```
Default query parameter value:
pageSize = 5
pageNumber = 1
```

</td> 
<td>200</td>
<td>None</td> 
<td>

```json
{
  "status": "success",
  "message": "Users Found",
  "data": {
    "data": [
      {
        "id": 1,
        "userName": "john",
        "fullName": "John Doe",
        "email": "john@email.com",
        "passwordChangedAt": "2011-11-11T00:00:00.000Z",
        "createdOn": "2011-11-11T00:00:00.000Z",
        "modifiedOn": "2011-11-11T00:00:00.000Z"
      }
    ],
    "pageNumber": 1,
    "pageSize": 5,
    "totalPage": 1
  }
}
```

</td> 
</tr>

<tr>
<td> Get specific users </td> 
<td> Get </td> 
<td> /users/search/:userNameKey?pageSize=5&pageNumber=1

```
Default query parameter value:
pageSize = 5
pageNumber = 1
```

</td> 
<td>200</td>
<td>None</td> 
<td>

```json
{
  "status": "success",
  "message": "Users Found",
  "data": {
    "data": [
      {
        "id": 1,
        "userName": "john",
        "fullName": "John Doe",
        "email": "john@email.com",
        "passwordChangedAt": "2011-11-11T00:00:00.000Z",
        "createdOn": "2011-11-11T00:00:00.000Z",
        "modifiedOn": "2011-11-11T00:00:00.000Z"
      }
    ],
    "pageNumber": 1,
    "pageSize": 5,
    "totalPage": 1
  }
}
```

</td> 
</tr>

</table>

&nbsp;

&nbsp;

---

&nbsp;

### **End points for tasks**

&nbsp;

<table>
<tr>
<td> <strong>Description</strong> </td> 
<td> <strong>HTTP Method</strong> </td>
<td> <strong>URL</strong> </td>
<td> <strong>Expected Status Code</strong> </td>
<td> <strong>Request Body Example</strong> </td>
<td> <strong>Response Body Example</strong> </td>
</tr>

<tr>
<td> Create task </td> 
<td> Post </td> 
<td> /tasks/task </td> 
<td>201</td>
<td>

```json
{
  "name": "Sample name",
  "description": "Sample description",
  "isDone": false
}
```

</td> 
<td>

```json
{
  "status": "success",
  "message": "Task Created",
  "data": {
    "id": 1,
    "name": "Sample name",
    "description": "Sample description",
    "isDone": false,
    "userId": 1,
    "userName": "john",
    "createdOn": "2011-11-11T00:00:00.000Z",
    "modifiedOn": "2011-11-11T00:00:00.000Z"
  }
}
```

</td> 
</tr>

<tr>
<td> Get task </td> 
<td> Get </td> 
<td> /tasks/task/:id </td> 
<td>200</td>
<td>None</td> 
<td>

```json
{
  "status": "success",
  "message": "Task Found",
  "data": {
    "id": 1,
    "name": "Sample name",
    "description": "Sample description",
    "isDone": false,
    "userId": 1,
    "userName": "john",
    "createdOn": "2011-11-11T00:00:00.000Z",
    "modifiedOn": "2011-11-11T00:00:00.000Z"
  }
}
```

</td> 
</tr>

<tr>
<td> Update task </td> 
<td> Put </td> 
<td> /tasks/task/:id </td> 
<td>200</td>
<td>

```json
{
  "name": "Sample name update",
  "description": "Sample description update",
  "isDone": true
}
```

</td> 
<td>

```json
{
  "status": "success",
  "message": "Update Successful",
  "data": {
    "id": 1,
    "name": "Sample name update",
    "description": "Sample description update",
    "isDone": true,
    "userId": 1,
    "userName": "john",
    "createdOn": "2011-11-11T00:00:00.000Z",
    "modifiedOn": "2011-11-11T00:00:00.000Z"
  }
}
```

</td> 
</tr>

<tr>
<td> Delete task </td> 
<td> Delete </td> 
<td> /tasks/task/:id </td> 
<td>204</td>
<td>None</td> 
<td>None</td> 
</tr>

<tr>
<td> Get tasks by username </td> 
<td> Get </td> 
<td> /tasks/user/:userName?pageSize=5&pageNumber=1

```
Default query parameter value:
pageSize = 5
pageNumber = 1
```

</td> 
<td>200</td>
<td>None</td> 
<td>

```json
{
  "status": "success",
  "message": "Tasks Found",
  "data": {
    "data": [
      {
        "id": 1,
        "name": "Sample name",
        "description": "Sample description",
        "isDone": false,
        "userId": 1,
        "userName": "john",
        "createdOn": "2011-11-11T00:00:00.000Z",
        "modifiedOn": "2011-11-11T00:00:00.000Z"
      }
    ],
    "pageNumber": 1,
    "pageSize": 5,
    "totalPage": 1
  }
}
```

</td> 
</tr>

</table>

&nbsp;

&nbsp;

---

&nbsp;

## Sample Data from JWT

&nbsp;

```json
{
  "id": 1,
  "userName": "john",
  "iat": 1669796265,
  "exp": 1677572265
}
```
