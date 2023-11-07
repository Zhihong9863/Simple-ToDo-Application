# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.


# Homework discription

## Login page

Regarding the login page, I have implemented a simple database storage. At the beginning of login, if your username or password is empty, you cannot submit the page. However, when you enter them, the user will definitely not exist. Therefore, I have designed a logic that requires you to register first. Only after registering and keeping records in the database can you return to the login page to input personal information.

![1bc4066408bdc879148bca50ab63ab7](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/660eb354-4f2b-4f27-b44b-dc18d1e3bd70)


![b7556629f7d020b050bbd41a36652a7](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/50d05f52-bd5f-40ca-8991-3122b4b3b7b8)


## Registration page

The registration page is similar to the login page, where you need to fill in information for the username, password, and repeat password fields before submitting the form. The database will store your personal information. Regarding the password, if the two passwords do not match, you will receive a pop-up message asking you to re-enter. Once your user information is registered, the database will have your records, and you can return to the login interface to enter the personal information you just registered.

![1fe3e94378947dd77c69812829aa732](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/ed83c22b-17bd-4449-918f-8ff59aa3db71)


![5e434c2df3bc0fc64821d9597a1b86f](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/db07744d-e9fe-4547-ae87-98196f73598d)

## Homepage

On the main page, when you log in to the top left corner of the userbar, your name, which is the author's name, will be displayed. The add button only allows you to add a new note when you ensure that the title field has been entered. For each note record, I added two buttons, one for edit and one for delete, and one for checkbox - to check if the event has been completed. You can freely edit and delete notes, and when you check checkbox, you should dynamically see a complete time display. There is a logout button in the upper right corner of the userbar, which will automatically redirect back to the login interface. As long as you have not restarted the project, you should be able to see that all your notes have been saved when logging in again.

But I haven't implemented any more features, such as when you register two accounts, one is Albert and the other is Bob. If Albert adds a new note, Bob will also see the same note when logging in.

![29c33ae93e143b5cc9ead541610a1ce](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/5ef687a5-02f4-4716-84fc-c82d691b6a68)


![162d14a89c70deb4d006b69a4c219b6](https://github.com/Zhihong9863/CSC436-Web-Application/assets/129224800/93a215b2-23b2-478e-ac14-c2c970ef9556)





