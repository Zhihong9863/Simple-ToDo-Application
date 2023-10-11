import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { mockDB } from "./App";
import '../extraStyles.css'

function LoginPage(props) {
    const [user, setUser] = useState({
      name: "",
      password: ""
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

    function handleLogin(event) {
      event.preventDefault();

      const foundUser = mockDB.find(dbUser => dbUser.name === user.name);

      // check whether user exists
      if (!foundUser) {
        window.alert("User does not exist, please register first");
        return;
      }

      // check whether password is match
      if (foundUser.password !== user.password) {
        window.alert("Password error！");
        return;
      }

      props.onLogin(user.name);
      navigate('/homepage');
    }

    function handleRegisterClick() {
      navigate('/register');
    }
    
  
    return (
      <div className="loginPage-container">
        {/* <h1>Hello {user.name}</h1> */}
        <form className="loginPage-form">
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
          </div>
          <div className="loginPage-button-container">
            <button className="loginPage-submitBtn" type="button" disabled={!user.name || !user.password} onClick={handleLogin}>Log in</button>
            <button className="loginPage-registerBtn" type="button" onClick={handleRegisterClick}>Register</button>
          </div>         
        </form>

        
      </div>
    );
    
    
    
}

export default LoginPage;
