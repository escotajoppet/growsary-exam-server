# Growsary Exam Server

The system is using a standardized API response which has the default values

```
{
  data: {},
  error: null,
  status: 200,
  success: true,
  errorFields: undefined,
}
```

- `data` will contain all data requirements from the API
- `error` is the error message from the API
- `status` is the status code returned from the API.
- `errorFields` will have the field-specific errors
- `success` indicates if the request is successful

# Setup (IMPORTANT)

MySQL should be installed in the system.

## Clone the repository
```
git clone https://github.com/escotajoppet/growsary-exam-server.git

# Go to directory
cd growsary-exam-server
```

## Setup the database
Edit the `.env` file for your MySQL credentials.

```
# /.env

DB_NAME=growsarydb
DB_USER=your_username
DB_PASSWORD=your_password
```

## Create and Migrate database

```
$ npm install
$ sequelize db:create
$ sequelize db:migrate
```

## Start Server in Development ENV

```
npm run dev
```

## Unit test
```
npm run test
```

# General Responses

`401: Unauthorized`
```
{
  "data": {},
  "error": "Please provide your authentication token",
  "success": false,
  "status": 401
}
```

`403: Forbidden`
```
{
  "data": {},
  "error": "Forbidden: Invalid token",
  "success": false,
  "status": 403
}
```

# Users

## Register

#### URL:
```
[POST] /user/register
```

#### Body:
```
{
  "email": "test_account@growsary.com",
  "name": "Test Account",
  "password": "Password123"
}
```

#### Responses:

`201: Created`
```
{
  "data": {
    "id": "c7da07e0-17d1-11ea-b293-b3504c97a452",
    "name": "Test Account",
    "email": "test_account@growsary.com",
    "createdAt": "2019-12-06T02:40:35.000Z",
    "updatedAt": "2019-12-06T02:40:35.000Z"
  },
  "error": null,
  "success": true,
  "status": 201
}
```

`409: Conflict`
```
{
  "data": {},
  "error": "SequelizeUniqueConstraintError::Duplicate entry 'test_account@growsary.com' for key 'Users_unique'",
  "success": false,
  "status": 409,
  "userFields": {
    "Users_unique": "test_account@growsary.com"
  }
}
```

## Login | Authenticate

#### URL:
```
[POST] /user/login
```

#### Body:
```
{
  "email": "test_account@growsary.com",
  "password": "Password123"
}
```

#### Responses:

`200: OK`
```
{
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ZGEwN2UwLTE3ZDEtMTFlYS1iMjkzLWIzNTA0Yzk3YTQ1MiIsIm5hbWUiOiJUZXN0IEFjY291bnQiLCJlbWFpbCI6InRlc3RfYWNjb3VudEBncm93c2FyeS5jb20iLCJjcmVhdGVkQXQiOiIyMDE5LTEyLTA2VDAyOjQwOjM1LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE5LTEyLTA2VDAyOjQwOjM1LjAwMFoiLCJwYXNzd29yZCI6IiQyYiQxMCRFeGY2eHJ3RU42RWRJRjBGaTRVd0xPSXNhbm9RcVVaLmpjOW9UZHAubUZkeGNhS2REV08yaSIsImlhdCI6MTU3NTYwMTA2OH0.1Liv7Osd6G_WB-CMBjjMdn-DH7kB8q_fQhnItaJ9sgM"
  },
  "error": null,
  "success": true,
  "status": 200
}
```

`401: Unauthorized`
```
{
  "data": {},
  "error": "Password is incorrect",
  "success": false,
  "status": 401
}
```

`404: Not Found`
```
{
  "data": {},
  "error": "No users found",
  "success": false,
  "status": 404
}
```

# Topics

## Create

#### URL
```
[POST] /topic
```

#### Headers
```
{
  "X-Access-Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ZGEwN2UwLTE3ZDEtMTFlYS1iMjkzLWIzNTA0Yzk3YTQ1MiIsIm5hbWUiOiJUZXN0IEFjY291bnQiLCJlbWFpbCI6InRlc3RfYWNjb3VudEBncm93c2FyeS5jb20iLCJjcmVhdGVkQXQiOiIyMDE5LTEyLTA2VDAyOjQwOjM1LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE5LTEyLTA2VDAyOjQwOjM1LjAwMFoiLCJpYXQiOjE1NzU2MDcxNTF9.QwsZBWxhq6-IowUpWZt5B5_c7EFlg4hyyw5aLluOiQQ"
}
```

#### Body
```
{
  "subject": "Subject 1",
  "description": "The quick brown fox jumps over the lazy dog"
}
```

#### Response

`200: OK`
```
{
  "data": {
    "id": "e1b22e20-17e2-11ea-b504-5726a56a5af8",
    "subject": "Subject 1",
    "description": "The quick brown fox jumps over the lazy dog",
    "createdBy": "c7da07e0-17d1-11ea-b293-b3504c97a452",
    "updatedBy": "c7da07e0-17d1-11ea-b293-b3504c97a452",
    "updatedAt": "2019-12-06T04:43:00.482Z",
    "createdAt": "2019-12-06T04:43:00.482Z"
  },
  "error": null,
  "success": true,
  "status": 200
}
```

## Update

#### URL
```
[PATCH] /topic/:id
```

#### Headers
```
{
  "X-Access-Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ZGEwN2UwLTE3ZDEtMTFlYS1iMjkzLWIzNTA0Yzk3YTQ1MiIsIm5hbWUiOiJUZXN0IEFjY291bnQiLCJlbWFpbCI6InRlc3RfYWNjb3VudEBncm93c2FyeS5jb20iLCJjcmVhdGVkQXQiOiIyMDE5LTEyLTA2VDAyOjQwOjM1LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE5LTEyLTA2VDAyOjQwOjM1LjAwMFoiLCJpYXQiOjE1NzU2MDcxNTF9.QwsZBWxhq6-IowUpWZt5B5_c7EFlg4hyyw5aLluOiQQ"
}
```

#### Body
```
{
  "subject": "Subject one",
  "description": "The quick brown fox jumps over the lazy dog one"
}
```

#### Response

`200: OK`
```
{
  "data": {
    "id": "e1b22e20-17e2-11ea-b504-5726a56a5af8",
    "subject": "Subject one",
    "description": "The quick brown fox jumps over the lazy dog one",
    "deletedAt": null,
    "createdBy": "c7da07e0-17d1-11ea-b293-b3504c97a452",
    "updatedBy": "c7da07e0-17d1-11ea-b293-b3504c97a452",
    "createdAt": "2019-12-06T04:43:00.000Z",
    "updatedAt": "2019-12-06T04:58:48.794Z"
  },
  "error": null,
  "success": true,
  "status": 200
}
```

## Delete

#### URL
```
[DELETE] /topic/:id
```

#### Headers
```
{
  "X-Access-Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ZGEwN2UwLTE3ZDEtMTFlYS1iMjkzLWIzNTA0Yzk3YTQ1MiIsIm5hbWUiOiJUZXN0IEFjY291bnQiLCJlbWFpbCI6InRlc3RfYWNjb3VudEBncm93c2FyeS5jb20iLCJjcmVhdGVkQXQiOiIyMDE5LTEyLTA2VDAyOjQwOjM1LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE5LTEyLTA2VDAyOjQwOjM1LjAwMFoiLCJpYXQiOjE1NzU2MDcxNTF9.QwsZBWxhq6-IowUpWZt5B5_c7EFlg4hyyw5aLluOiQQ"
}
```

#### Response

`200: OK`
```
{
  "data": {},
  "error": null,
  "success": true,
  "status": 200
}
```

## Get All

#### URL
```
[GET] /topics
```

#### Headers
```
{
  "X-Access-Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ZGEwN2UwLTE3ZDEtMTFlYS1iMjkzLWIzNTA0Yzk3YTQ1MiIsIm5hbWUiOiJUZXN0IEFjY291bnQiLCJlbWFpbCI6InRlc3RfYWNjb3VudEBncm93c2FyeS5jb20iLCJjcmVhdGVkQXQiOiIyMDE5LTEyLTA2VDAyOjQwOjM1LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE5LTEyLTA2VDAyOjQwOjM1LjAwMFoiLCJpYXQiOjE1NzU2MDcxNTF9.QwsZBWxhq6-IowUpWZt5B5_c7EFlg4hyyw5aLluOiQQ"
}
```

#### Query Parameters
```
{
  page: 1,
  pageSize: 10
}
```

#### Responses

`200: OK`
```
{
  "data": [
    {
      "id": "0de37250-17e9-11ea-b8ad-adac34c3c64b",
      "subject": "Subject 2",
      "description": "The quick",
      "deletedBy": null,
      "deletedAt": null,
      "createdBy": "e2cd1730-17e6-11ea-be0f-7fc449302743",
      "updatedBy": "e2cd1730-17e6-11ea-be0f-7fc449302743",
      "createdAt": "2019-12-06T05:27:11.000Z",
      "updatedAt": "2019-12-06T05:27:11.000Z"
    }
  ],
  "error": null,
  "success": true,
  "status": 200,
  "page": 1,
  "pageSize": 10,
  "pageCount": 1
}
```

# Messages

## Create

#### URL
```
[POST] /topic/:id/message
```

#### Headers
```
{
  "X-Access-Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ZGEwN2UwLTE3ZDEtMTFlYS1iMjkzLWIzNTA0Yzk3YTQ1MiIsIm5hbWUiOiJUZXN0IEFjY291bnQiLCJlbWFpbCI6InRlc3RfYWNjb3VudEBncm93c2FyeS5jb20iLCJjcmVhdGVkQXQiOiIyMDE5LTEyLTA2VDAyOjQwOjM1LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE5LTEyLTA2VDAyOjQwOjM1LjAwMFoiLCJpYXQiOjE1NzU2MDcxNTF9.QwsZBWxhq6-IowUpWZt5B5_c7EFlg4hyyw5aLluOiQQ"
}
```

#### Body
```
{
  "message": "Hello there!"
}
```

#### Response
`201: Created`

```
{
  "data": {
    "id": "a067f670-17ec-11ea-abbd-35318c645365",
    "message": "Hello there!",
    "topicId": "0de37250-17e9-11ea-b8ad-adac34c3c64b",
    "createdBy": "e2cd1730-17e6-11ea-be0f-7fc449302743",
    "updatedBy": "e2cd1730-17e6-11ea-be0f-7fc449302743",
    "updatedAt": "2019-12-06T05:52:45.912Z",
    "createdAt": "2019-12-06T05:52:45.912Z"
  },
  "error": null,
  "success": true,
  "status": 201
}
```

## Get All

#### URL
```
[GET] /topics
```

#### Headers
```
{
  "X-Access-Token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImM3ZGEwN2UwLTE3ZDEtMTFlYS1iMjkzLWIzNTA0Yzk3YTQ1MiIsIm5hbWUiOiJUZXN0IEFjY291bnQiLCJlbWFpbCI6InRlc3RfYWNjb3VudEBncm93c2FyeS5jb20iLCJjcmVhdGVkQXQiOiIyMDE5LTEyLTA2VDAyOjQwOjM1LjAwMFoiLCJ1cGRhdGVkQXQiOiIyMDE5LTEyLTA2VDAyOjQwOjM1LjAwMFoiLCJpYXQiOjE1NzU2MDcxNTF9.QwsZBWxhq6-IowUpWZt5B5_c7EFlg4hyyw5aLluOiQQ"
}
```

#### Query Parameters
```
{
  page: 1,
  pageSize: 10
}
```

#### Responses
`200: OK`

```
{
  "data": [
    {
      "id": "a067f670-17ec-11ea-abbd-35318c645365",
      "topicid": "0de37250-17e9-11ea-b8ad-adac34c3c64b",
      "message": "Hello there!",
      "createdBy": "e2cd1730-17e6-11ea-be0f-7fc449302743",
      "updatedBy": "e2cd1730-17e6-11ea-be0f-7fc449302743",
      "createdAt": "2019-12-06T05:52:45.000Z",
      "updatedAt": "2019-12-06T05:52:45.000Z",
      "topicId": "0de37250-17e9-11ea-b8ad-adac34c3c64b"
    },
  ],
  "error": null,
  "success": true,
  "status": 200,
  "page": 1,
  "pageSize": 10,
  "pageCount": 1
}
```
