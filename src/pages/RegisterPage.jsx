import React, { useState } from "react";
import { StateContext } from "../auxiliary/Context"; 
import { setView, registerUser, logoutUser} from "../auxiliary/Action"; 
import { addUserToDB } from "../auxiliary/Action";
import '../extraStyles.css'

export default function RegisterPage() {

    const { state, dispatch } = React.useContext(StateContext);

    const mockDB = state.mockDB;

    const [user, setUser] = useState({
        name: "",
        password: "",
        repeatPassword: ""
      });
    
    function handleChange(event) {
      const { name, value } = event.target;
  
      setUser(prevValue => {
        return {
          ...prevValue,
          [name]: value
        };
      });
    }

    function handleRegister(event) {
        event.preventDefault();

        // check whether password is match
        if (user.password !== user.repeatPassword) {
            window.alert("The passwords entered twice do not match. Please re-enter!");
            return;
        }

        // check whether user has existed
        const existingUser = mockDB.find(dbUser => dbUser.name === user.name);
        
        if(existingUser) {
            window.alert("The username already exists!");
            return;
        }

        // add new user to database
        dispatch(addUserToDB(user));

        window.alert("Sign up successfully!");

        dispatch(registerUser(user.name));
        //By creating a logoutUser action or a similar action, this action will clear the user status.
        dispatch(logoutUser());   
        dispatch(setView('login'));
    }
  
    return (
      <div className="loginPage-container">
        <form className="RegisterPage-form" onSubmit={handleRegister}>
          <div className="loginPage-input-container">
            <input
              className="loginPage-input"
              onChange={handleChange}
              name="name"
              value={user.name}
              placeholder="Username"
            />
            <input
              className="loginPage-input"
              onChange={handleChange}
              name="password"
              type="password"
              value={user.password}
              placeholder="Password"
            />
            <input
              className="loginPage-input"
              onChange={handleChange}
              name="repeatPassword"
              type="Password"
              value={user.repeatPassword}
              placeholder="Repeat Password"
            />
          </div>
          <div className="loginPage-button-container">
            <button 
                className="registerPage-submitBtn" 
                type="submit" 
                disabled={!user.name || !user.password}
            >
                Sign Up
            </button>
          </div>         
        </form>

        
      </div>
    );
      
}

