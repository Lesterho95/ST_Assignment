import React, { useEffect } from "react"
import { Link } from "react-router-dom"
import HeaderLoggedIn from "./HeaderLoggedIn"
import HeaderLoggedOut from "./HeaderLoggedOut"

function Header(props) {
  return (
    <nav className="navbar navbar-expand navbar-light bg-light">
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <a className="navbar-brand mb-0 h1" href="/home">
              Task Management System
            </a>
          </li>
        </ul>
        {props.loggedIn ? <HeaderLoggedIn /> : <HeaderLoggedOut />}
      </div>
    </nav>
  )
}

export default Header
