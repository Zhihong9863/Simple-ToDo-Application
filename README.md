# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.

Two terminals need to be opened, one client and one server

About opening the back-end: cd to the server-express folder <br>
run npm init, npm install, and npm run start, which will run [http://localhost:4000](http://localhost:4000) and start the express server

About opening the front-end: cd to the client folder<br>
run npm init, npm install, and npm start, which will run [http://localhost:3000](http://localhost:3000)

# Homework discription

## Preface

When accessing the server-express folder, please create an. env file yourself, including your DB_ URI (https://www.mongodb.com/)
And JWT_ PRIVATE_ KEY (https://cryptotools.net/rsagen). The key length can be selected as 4096. 
For details, please visit setupMongo.js under the server-express folder, as well as auth.js and post.js under the routes folder.

This project can access mongo db atlas to perform CRUD operations on the database, or use API platforms such as Postman or Insomnia to build and use APIs.

For sample users<br>
Respectively<br>
Username: zhihong@gmail.com Password: 123456<br>
Username: zhe17@depaul.edu Password: 123456<br>
Username: albert Password: 123456<br>


## Registration page

After we successfully register, we will save the user to the database. If it fails, we will issue a prompt, such as a password mismatch or a user that does not exist

![9003c5452f611b4ef35ad111f9a5614](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/296d6b73-2d31-4307-84e1-098e846c0993)

![0e5919aa8c975565d43367a3c811df7](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/1f819393-0e80-48d7-88fb-91021631aca3)



## Login page

Regarding login, we have set a more secure prompt, which returns invalid credentials regardless of whether the user does not exist or if the password is incorrect. 
If the registration is successful, the ID, username, and access token will be returned, which can be seen in Postman

![d54278dd151806fe5a2e753f5f470c7](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/6c3119fb-78b2-47af-a5cc-9149d6362c5c)

![6d3b41f5a83886a6b7b4552180657bb](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/ae661ff4-8fa8-4863-ae16-7af0135943f2)

![86cb293a979bfa90f2e9ca288ba2907](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/8d91a33b-67f5-4f43-97b8-2bc821509e9e)




## Homepage

In addition to testing whether CRUD can work properly on our posts, I also used Postman to test whether the database can function properly. 
In this update, I have changed the display method of time to ISO, because the default format in the database is that.<br><br>
(Note: The deletion operation is not easy to see from the screenshot, and can be tested while running the app on your own)

### Postman
![8f70bb90066871b10c51513b46fb543](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/9fd06742-5ef1-471c-ad6c-96c03fb43a55)

![9fe622866e92a5455e735f445bf4a2d](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/083e3636-0148-44ad-a0e9-c24b23602d54)

![2c210a0ee8acbdda7e6de95f6b7cac5](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/b976ac8c-e652-4d39-b70f-eb4fefd41a5f)

### To do App
![20dcbc12e85510fce609d1d2d6e4056](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/11cf70da-5c9e-42cd-b218-276d388d2235)

![083d488594ffc978bfe1597e58613af](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/ffb747d8-f0cf-48e3-a7d0-2120b436c61a)

![e6fd79a354d4302937428a4ae75cb60](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/167776f0-5f8b-463a-9878-799d256348e2)

![d7b0e8590e35419506bdaab62d74e68](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/7ab6ed59-b1ab-416f-a515-75fb3ccf86bc)



## Back-end Compile Sample Photo

![017426092393115b18240090df58a3e](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/d156c092-8b2d-43d4-a65c-3ed345cf8af9)


