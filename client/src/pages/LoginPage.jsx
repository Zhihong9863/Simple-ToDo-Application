import React, { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../auxiliary/Context"; 
import { setView, loginUser} from "../auxiliary/Action"; 
import '../extraStyles.css'

export default function LoginPage() {

    const { dispatch } = useContext(StateContext);

    const [user, setUser] = useState({
      name: "",
      password: ""
    });

    const [errorMsg, setErrorMsg] = useState("");

    //Because we use json server auth, it will verify the existence of the user and the correctness of the password based on the email and password you send. 
    //If the authentication is successful, it will return a response containing user information and an authentication token.
    const [response, login] = useResource((email, password) => ({
      url: "/login",
      method: "post",
      data: { email, password },
    }));

    useEffect(() => {
      // check we get error or data
      if (response && response.error) {
        // if we encouter error, print it out to the console and alert user
        console.error(response.error);
        setErrorMsg(response.error.data);

      } else if (response && response.data) {
        // taclke the situation of register successfully
        console.log("Login:", response.data);
        dispatch(loginUser(response.data.user.email));
        dispatch(setView('homepage'));
      }

    }, [response, dispatch])


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

      //once finished, response will have data(response.data) and it will go to useEffect
      login(user.name, user.password);
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
              placeholder="Email"
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

