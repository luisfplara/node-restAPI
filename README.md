Node --version
    18.17.0

# NODE REST API endpoints 

## Auth
Used to authenticate users, get access token and refresh token. 

### Signin

| Enpoint | Headers                    | Description |
| ------------- | ------------------------------ |------------- |
| `POST /auth/signin`      | `Content-Type : application/json`    |    	sign in a user |   

#### Request body

```javascript
{
    "email" : "user email",
    "password": "user password"
}
```
#### Response
```javascript
{
    "id": "user unique ID",
    "name": "user name",
    "email": "user email",
    "access_token": "user access token (10m expiration)",
    "refresh_token": "user refresh token (24h expiration)"
}
```
---

### Signout

| Enpoint | Headers                    | Description |
| ------------- | ------------------------------ |------------- |
| `POST /auth/signout`      | `Content-Type : application/json`    |    	signout user invalidating the refresh token |   

#### Request body

```javascript
{}
```
#### Response
```javascript
{ message: "You've been signed out!" }
```
---

### Signup

| Enpoint | Headers                    | Description |
| ------------- | ------------------------------ |------------- |
| `POST /auth/signup`      | `Content-Type : application/json`    |    	signup a new user |   

#### Request body

```javascript
{
    "name" : "user name",
    "email" : "user email",
    "password": "user password"
}
```
#### Response
```javascript
{
	"name": "new user name",
	"email": "new user email",
	"password": "new user password hash",
	"roles": [list of roles],
	"_id": "new user ID",
}
```
---

### Refresh Token

| Enpoint | Headers                    | Description |
| ------------- | ------------------------------ |------------- |
| `GET /auth/refreshtoken`      | `Content-Type : application/json`<br/> `Set-Cookie : r_tkn= "refresh token"`   |get a new access token with the refresh token|   

#### Request body

```javascript
{}
```
#### Response
```javascript
{
    "access_token": "new access token"
}
```
---




## User
Used manage users

### Get all users

| Enpoint | Headers                    | Description |
| ------------- | ------------------------------ |------------- |
| `GET /user`| `Content-Type : application/json`<br/> `authorization : Bearer "access token"`|get all users|   

#### Request body

```javascript
{}
```
#### Response
```javascript
[{
    "_id": "user ID",
	"name": "user name",
	"email": "user email",
	"password": "user password hash",
	"roles": [list of role.id],
}....]
```
---

### Get single user

| Enpoint | Headers                    | Description |
| ------------- | ------------------------------ |------------- |
| `get /user/:id`      | `Content-Type : application/json`<br/> `authorization : Bearer "access token"`    |    	get single user information |   

#### Request body

```javascript
{}
```
#### Response
```javascript
{
    "_id": "user ID",
	"name": "user name",
	"email": "user email",
	"password": "user password hash",
	"roles": [list of role.id],
}
```
---

### Delete single user

| Enpoint | Headers                    | Description |
| ------------- | ------------------------------ |------------- |
| `DELETE /user/:id`      | `Content-Type : application/json`<br/> `authorization : Bearer "access token"`|    	delete a user |   

#### Request body

```javascript
{}
```
#### Response
```javascript
{
	"acknowledged": "acknowledged boolean",
	"deletedCount": "deleted count number"
}
```
---






## Role
Used to manage roles

### Get all roles

| Enpoint | Headers                    | Description |
| ------------- | ------------------------------ |------------- |
| `GET /role`| `Content-Type : application/json`<br/> `authorization : Bearer "access token"`|get all roles|   

#### Request body

```javascript
{}
```
#### Response
```javascript
[{
    "_id": "role ID",
	"name": "role name",
}....]
```
---

### Get single role

| Enpoint | Headers                    | Description |
| ------------- | ------------------------------ |------------- |
| `GET /role/:id`      | `Content-Type : application/json`<br/> `authorization : Bearer "access token"`    |    	get single user information |   

#### Request body

```javascript
{}
```
#### Response
```javascript
{
    "_id": "role ID",
	"name": "role name",
}
```
---

### Create a new role

| Enpoint | Headers                    | Description |
| ------------- | ------------------------------ |------------- |
| `POST /role`      | `Content-Type : application/json`<br/> `authorization : Bearer "access token"`|    	create new role |   

#### Request body

```javascript
{
	"name": "role name"
}
```
#### Response
```javascript
{
	"acknowledged": "acknowledged boolean",
	"deletedCount": "deleted count number"
}
```
---

### Add role to user

| Enpoint | Headers                    | Description |
| ------------- | ------------------------------ |------------- |
| `POST /role/addroletouser`      | `Content-Type : application/json`<br/> `authorization : Bearer "access token"`|    	add a role to a user |   

#### Request body

```javascript
{
	"user_id": "user id",
	"role":"role name"
}
```
#### Response
```javascript
Role added successful
```
---
### Delete single role

| Enpoint | Headers                    | Description |
| ------------- | ------------------------------ |------------- |
| `DELETE /role/:id`      | `Content-Type : application/json`<br/> `authorization : Bearer "access token"`|    	delete a single role |   

#### Request body

```javascript
{}
```
#### Response
```javascript
{
	"acknowledged": "acknowledged boolean",
	"deletedCount": "deleted count number"
}
```
---