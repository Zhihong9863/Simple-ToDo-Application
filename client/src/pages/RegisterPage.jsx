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

    const [response, register] = useResource((email, password) => ({
      url: "/users",
      method: "post",
      data: { email, password },
    }));

    // Update the application status and use useEffect to respond to the results of registration requests
    useEffect(() => {
      // check we get error or data
      if (response && response.error) {
        // if we encouter error, print it out to the console and alert user
        console.error(response.error);
        window.alert(response.error.data);

      } else if (response && response.data) {
        // taclke the situation of register successfully
        console.log("Registered:", response.data);
        window.alert("sign up successfully!");
        
        dispatch(registerUser(response.data.user.email));
        //By creating a logoutUser action or a similar action, this action will clear the user status.
        dispatch(logoutUser());
        dispatch(setView('login'));
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

    //Send registration requests to the backend.
    //Provide feedback to users based on the response.
    //If registration is successful, update the status of the front-end and navigate to the login page or directly log in to the user
    function handleRegister(event) {
      event.preventDefault();

      // check whether password is match
      if (user.password !== user.repeatPassword) {
          window.alert("The passwords entered twice do not match. Please re-enter!");
          return;
      }

      //first make sure password is matched and then call register function to check other situations.
      register(user.name, user.password);
    
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

