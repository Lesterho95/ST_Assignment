import React, { useEffect, useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import LoginContext from "./LoginContext"
import userService from "../services/user.service"

function HeaderLoggedIn(props) {
  const navigate = useNavigate()
  const { setLoggedIn } = useContext(LoginContext)

  function handleLogout() {
    setLoggedIn(false)
    localStorage.removeItem("userToken")
    localStorage.removeItem("username")
    localStorage.removeItem("isAdmin")
    localStorage.removeItem("iAmAdmin")
    localStorage.removeItem("userprofile")
    localStorage.removeItem("user_group")
    localStorage.removeItem("editGroup")
    localStorage.removeItem("planName")
    localStorage.removeItem("appacronym")
    localStorage.removeItem("useremail")

    navigate("/home")
  }

  function adminView() {
    if (localStorage.getItem("iAmAdmin") == "true") {
      return (
        <>
          <Link className=" btn btn-sm bg-orange-300 hover:bg-orange-600 mr-2" to="/usermanagement">
            User Management
          </Link>
          <Link className="btn btn-sm btn-dark mr-2" to="/groupmanagement">
            Group Management
          </Link>
        </>
      )
    }
  }

  return (
    <div className="flex-row my-3 my-md-0">
      {adminView()}

      <Link className="btn btn-sm btn-primary mr-2" to="/application">
        Application
      </Link>
      <Link className="btn btn-sm btn-primary mr-2" to="/myprofile">
        My Profile
      </Link>
      <button onClick={handleLogout} className="btn btn-sm btn-secondary">
        Sign Out
      </button>
    </div>
  )
}

export default HeaderLoggedIn
