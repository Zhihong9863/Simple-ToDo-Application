import React from "react";
import { useNavigate } from 'react-router-dom';
import "../extraStyles.css"

function HeaderHome(props) {
  const navigate = useNavigate();

  function handleLogout() {   
    window.alert("Log Out Successfully!");
    navigate('/login');    
  }

  return (
    <header>
      <h1>Author: {props.author}</h1>
      <button className='HomePage-logOutBtn'onClick={handleLogout}>Log Out</button>
    </header>
  );
}

export default HeaderHome;