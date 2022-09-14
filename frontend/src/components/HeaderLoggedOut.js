import React, { useEffect, useState, useContext } from "react"
import { useNavigate } from "react-router-dom"
import userService from "../services/user.service"
import LoginContext from "./LoginContext"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function HeaderLoggedOut() {
  const { setLoggedIn } = useContext(LoginContext)
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const SignIn = (e) => {
    e.preventDefault()
    const user = {
      username: username,
      password: password,
      user_group: "admin",
    }
    userService.userLogin(user).then((res) => {
      if (res.message === "Invalid User" || res.message === "User Not Found") {
        toast.error("Invalid Username/Password")
        setLoggedIn(false)
      } else if (res.message === "Invalid Password") {
        toast.error("Invalid Username/Password")
        setLoggedIn(false)
      } else if (res.result.status == "0") {
        toast.error("Invalid Username/Password")
        setLoggedIn(false)
      } else {
        localStorage.setItem("userToken", JSON.stringify(res.result)) //convert to string
        localStorage.setItem("useremail", res.result.email)
        localStorage.setItem("username", res.result.username)
        localStorage.setItem("user_group", res.result.user_group)
        userService.checkGroup(user).then((res) => {
          if (res.result == "true") {
            localStorage.setItem("iAmAdmin", res.result)
          } else {
            localStorage.setItem("iAmAdmin", res.result)
          }
          setLoggedIn(true)
          navigate("/home")
        })
      }
    })
  }
  return (
    <form onSubmit={SignIn} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            class="border-2 border-slate-300"
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          ></input>
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input
            class="border-2 border-slate-300"
            name="password"
            type="password"
            placeholder="Password"
            required
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          ></input>
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign in</button>
        </div>
      </div>
      <ToastContainer />
    </form>
  )
}

export default HeaderLoggedOut
