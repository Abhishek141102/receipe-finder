import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="navbar">
      <div className="nav-left">
        <Link className="brand" to="/">🍳 Recipe Finder</Link>
      </div>
      <nav className="nav-right">
        <Link to="/">Home</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
    </header>
  );
}

export default Header;
