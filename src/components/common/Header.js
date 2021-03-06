import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const activeStyle = { color: "#F25B2A" };

  return (
    <nav>
      <NavLink exact to="/" activeStyle={activeStyle}>
        Home
      </NavLink>
      <span> | </span>
      <NavLink to="/authors" activeStyle={activeStyle}>
        Authors
      </NavLink>
      <span> | </span>
      <NavLink to="/courses" activeStyle={activeStyle}>
        Courses
      </NavLink>
      <span> | </span>
      <NavLink to="/about" activeStyle={activeStyle}>
        About
      </NavLink>
    </nav>
  );
};

export default Header;
