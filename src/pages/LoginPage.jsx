import React, { useState } from "react";
import { StateContext } from "../auxiliary/Context"; 
import { setView, loginUser} from "../auxiliary/Action"; 
import '../extraStyles.css'

export default function LoginPage() {

    const { state, dispatch } = React.useContext(StateContext);

    const mockDB = state.mockDB;

    const [user, setUser] = useState({
      name: "",
      password: ""
    });

    const [errorMsg, setErrorMsg] = useState("");


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
        setErrorMsg("User does not exist, please register first");
        return;
      }

      // check whether password is match
      if (foundUser.password !== user.password) {
        setErrorMsg("Password error！");
        return;
      }

      dispatch(loginUser(user.name)); 
      dispatch(setView('homepage'));
    }

    function handleRegisterClick() {
      dispatch(setView('register'));
    }
    
  
    return (
      <div className="loginPage-container">
        {/* <h1>Hello {user.name}</h1> */}
        {errorMsg && <p className="loginPage-error">{errorMsg}</p>}
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

