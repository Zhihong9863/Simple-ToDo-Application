import React, { useContext } from "react";
import { StateContext } from "../auxiliary/Context"; 
import { setView, logoutUser} from "../auxiliary/Action"; 

function Header() {
  const { state, dispatch } = useContext(StateContext);
  const { user } = state;

  const handleLogout = () => {
    window.alert("Log Out Successfully!");
    dispatch(logoutUser());
    dispatch(setView('login'));
  };

  return (
    <header>
      {user ? (
        <>
          <h1>Author: {user.name}</h1>
          <button className='HomePage-logOutBtn' onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <h1>To-Do App</h1>
      )}
    </header>
  );
}

export default Header;
