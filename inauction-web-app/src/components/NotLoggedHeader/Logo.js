import React from 'react';
import { Link } from "react-router-dom";

const Logo = () => {
  return(
    <div className="gx-app-logo logo-not-logged-in">
      <Link to="/">
        <img alt="logo_signin" src={require("assets/images/inauction_logo.png")} />
      </Link>
    </div>
  )
};

export default Logo;
