import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { mockDB } from "./App";
import '../extraStyles.css'

function RegisterPage(props) {
    const [user, setUser] = useState({
        name: "",
        password: "",
        repeatPassword: ""
      });

    let navigate = useNavigate();
    

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
        mockDB.push(user);

        window.alert("Sign up successfully!");  
        navigate('/login');
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

export default RegisterPage;
