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

    //1. Create hooks, build front-end and back-end routes, define routes and methods, 
    //and provide parsers for username, password, when passed to the backend
    const [response, login] = useResource((username, password) => ({
      url: "/auth/login",
      method: "post",
      data: { username, password },
    }));

    // 3.Obtain the JSON parsing body passed from the backend, obtain the fields in the data, 
    // either deconstruct the data and pass it to dispatch while saving the global variable state in useContext, or pop up an error message
    useEffect(() => {
      if(response && response.isLoading === false){
        // check we get error or data
        if (response.error) {
          // if we encouter error, print it out to the console and alert user
          console.error(response.error);
          setErrorMsg(response.error.data.error + ' Please check your username and password and try again.');

        } else if (response && response.data) {
          // taclke the situation of register successfully
          console.log("Login:", response.data);
          const { username, access_token } = response.data;
          //The access token generated and passed from the backend is then passed to the dispatch to store our access_ token, 
          //so that after logging in, we can use this request header for verification to perform post operations
          dispatch(loginUser(username, access_token));
          dispatch(setView('homepage'));
        }
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

    //2. Obtain the username and password entered by the user from the input box and pass them to the backend
    function handleLogin(event) {
      event.preventDefault();

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

