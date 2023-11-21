import React, { useState, useContext, useEffect } from "react";
import { useResource } from "react-request-hook";
import { StateContext } from "../auxiliary/Context"; 
import { setView, registerUser, logoutUser} from "../auxiliary/Action"; 
import '../extraStyles.css'

export default function RegisterPage() {

    const { dispatch } = useContext(StateContext);

    const [user, setUser] = useState({
      name: "",
      password: "",
      repeatPassword: ""
    });

    //1. Create hooks, build front-end and back-end routes, define routes and methods, 
    //and provide parsers for username, password, and second confirmation password when passed to the backend
    const [response, register] = useResource((username, password, passwordConfirmation) => ({
      url: "/auth/register",
      method: "post",
      data: { username, password, passwordConfirmation },
    }));

    // 3.Obtain the JSON parsing body passed from the backend, obtain the fields in the data, 
    // either deconstruct the data and pass it to dispatch while saving the global variable state in useContext, or pop up an error message
    useEffect(() => {
      if(response && response.isLoading === false){
        // check we get error or data
        if (response.error) {
          // if we encouter error, print it out to the console and alert user
          console.error(response.error);
          if (response.error.data.error.includes('duplicate key error')) {
            window.alert('This username is already taken');
          }
          //Usually is the two password entries do not match
          else window.alert(response.error.data.error);

        } else if (response.data) {
          // taclke the situation of register successfully
          console.log("Registered:", response.data);
          window.alert("sign up successfully!");
          
          dispatch(registerUser(response.data.username));
          //By creating a logoutUser action or a similar action, this action will clear the user status.
          dispatch(logoutUser());
          dispatch(setView('login'));
        }
      }
      
    }, [response, dispatch]);


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
    function handleRegister(event) {
      event.preventDefault();

      register(user.name, user.password, user.repeatPassword);
    
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
            <button 
                className="registerPage-returnBtn" 
                type="button" 
                onClick={() => dispatch(setView('login'))}
            >
                Return
            </button>
          </div>         
        </form>

        
      </div>
    );
      
}

