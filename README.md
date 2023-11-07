# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\

Two terminals need to be opened, one client and one server

About opening the back-end: cd to the server folder 
run npm init, npm install, and npm start, which will run [http://localhost:4000](http://localhost:4000)

About opening the front-end: cd to the client folder
run npm init, npm install, and npm start, which will run [http://localhost:3000](http://localhost:3000)

# Homework discription

## db json

On the backend, I have saved three users and their passwords have been encrypted, but you can access them all with passwords of 123456.
Specifically, for example, for 'Studying DevOPs', the content of this post is only for users "zhe17@depaul.edu" to see.
![image](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/f60e960c-9da9-4d6e-944a-57791c0ad9f0)


## Login page

Regarding user login, under the influence of json-server-auth, it will detect whether the user already exists. 
If the user already exists, it will check whether the password is equal to the encrypted password in the database (db. json). 
If an incorrect request body is received, the error message will be directly displayed on the page.

Specifically, due to the use of the json-server-auth dependency, all user names in our previous assignments must be in email format, otherwise error messages will be presented！

![78850461521f40ab63a2ae6aafb6a79](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/45d719e4-75ec-450e-864b-08ff88c11fe8)

![5cf3f155d942871711f679ce0cdeac3](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/21c05bd0-edd0-4ead-8ab7-18c3be65d799)

![461cd54e652db5f53ab22448c073e99](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/c686a135-1d2f-4378-8203-38f621a5418e)


## Registration page

The same logic as the login interface checks whether the input of the password matches twice. The username registration format must be in email format, whether the password is too short (due to the special dependency of "json server auth dependency"), and if the user is already in the database, it will not be allowed to be registered.

![ff578031737b86c1d79925a405d6715](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/40e2aacb-b206-475c-accf-08cb973cb5eb)

![c171aa4480fc07e12227f296bc8e2b8](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/1e7410e2-0b22-4aed-b61e-e51e09ff1be8)



## Homepage

Implemented functions that Lab3 did not implement. Because of the introduction of backend content:
1. The initial post content has been created, and the default user can see the post that has been created in the database.
2. Every time compile the project, all posts of the user can be saved without being cleared.
3. Each user can only see their own posts, as described in db.json. "zhe17@depaul.edu": you can only see devops; "zhihong@email.com": only useState can be seen.
4. Each user's actions such as adding, editing, and deleting posts will only affect their own account, as the logic of which user belongs to the post is set (see userEmail in db.json).
5. Users' addition, deletion, and modification operations will be synchronized to the database in a timely manner.

![cf46fde7083de612a6d021f17311f4b](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/9e1a4e14-914a-4b57-ba9e-c66943b79eb4)

![82258ef3ba0b10763eff48cd92071b4](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/91d4b302-8fc6-49a3-a02e-bbd63dc9168f)

![4d159bab2375594e9cb25147159bae1](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/53bc0a9b-8bab-4237-bf5c-242f2392619d)

![593591164269ee332b8f3a7655df03e](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/7d4efb1a-1df9-40b8-8d01-212f73761edd)



## Back-end Compile Sample

1.400 bad request: sourced from user registration or login issues (various possible situations mentioned earlier).

2.200 success status response: User successfully registered, logged in, added, deleted, modified, and other operations.

![37546367532862ac05535082706f283](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/2984f2c4-b5de-41a1-8321-c755c13367ad)

