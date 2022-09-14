import React, { useEffect, useState } from "react"
// import Select from "react-select"
import userService from "../services/user.service"
import ListItemText from "@mui/material/ListItemText"
import { useNavigate } from "react-router-dom"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Checkbox from "@mui/material/Checkbox"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function CreateUser() {
  const [newUsername, setUsername] = useState("")
  const [newPassword, setPassword] = useState("")
  const [newEmail, setEmail] = useState("")
  const [displaygroup, setDisplayGroup] = useState([])
  const [isAdmin, setIsAdmin] = useState(false)
  const [usergroup, setUserGroup] = useState([])
  const [userList, setUserList] = useState("")

  let navigate = useNavigate()

  useEffect(() => {
    userService.getAllUserGroup().then((res) => {
      console.log("all user group", res.result)
      // setDisplayGroup(res.result.map((res) => res.groupname))
      setDisplayGroup(res.result)
    })
    userService.findAllUser().then((res) => {
      console.log("all users", res)
      if (res.message === "Found") {
        setUserList(res.result.map((res) => res.username))
      }
    })
  }, [])

  const validatePassword = (value) => {
    var regularExpression = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,11}$/
    if (!regularExpression.test(value)) {
      return {
        result: false,
        message: "Password must comprise of alphabets , numbers, and special character, needs to be at least 8 character and must not excceed  10 characters ",
      }
    } else
      return {
        result: true,
        message: "Correct password",
      }
  }

  const validateEmail = (value) => {
    let emailRegex = /\S+@\S+\.\S+/
    if (!emailRegex.test(value)) {
      return {
        result: false,
        message: "Incorrect email format",
      }
    } else {
      return {
        result: true,
        message: "Correct format",
      }
    }
  }

  const handleCreate = (e) => {
    console.log("create usergroup", usergroup)
    e.preventDefault()
    let validate = validatePassword(newPassword)
    if (!validate.result) {
      toast.error(validate.message)
    } else if (userList.includes(newUsername)) {
      toast.warning("Existing Username")
    } else {
      let user = {
        username: newUsername,
        password: newPassword,
        email: newEmail,
        user_group: usergroup,
        isAdmin: isAdmin,
      }
      userService.createUser(user).then((res) => {
        console.log("what is res??", res)
        if (res.result == true) {
          setUsername("")
          setPassword("")
          setEmail("")
          setUserGroup([])
          toast.success("User created")
        } else {
          toast.error("Incorrect creation")
        }
      })
    }
    // }
  }
  const handleChange = (e) => {
    const {
      target: { value },
    } = e
    setUserGroup(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  return (
    <div>
      <div class="flex justify-center form-control form-control-title mt-1">Create user</div>
      <div class="ml-20 mt-1">
        <button onClick={() => navigate(-1)} className="bg-slate-300 hover:bg-slate-600 border rounded w-20">
          Back
        </button>
      </div>
      <form onSubmit={handleCreate}>
        <div class="form-group flex flex-col justify-center items-center">
          <label className="text-muted mb-1">
            <small>Username</small>
          </label>
          <input
            autoFocus
            required
            class="flex justify-center form-control form-control-title w-50"
            type="text"
            value={newUsername}
            autoComplete="off"
            onChange={(e) => {
              setUsername(e.target.value)
            }}
          />
        </div>

        <div className="form-group flex flex-col justify-center items-center">
          <label className="text-muted mb-1 d-block">
            <small>Password</small>
          </label>
          <input
            name="body"
            className="flex justify-center form-control form-control-title w-50"
            type="password"
            value={newPassword}
            required
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          ></input>
        </div>
        <div className="form-group flex flex-col justify-center items-center">
          <label className="text-muted mb-1 d-block">
            <small>Email</small>
          </label>
          <input
            name="body"
            className="flex justify-center form-control form-control-title w-50"
            type="text"
            value={newEmail}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          ></input>
        </div>
        <div className="form-group flex flex-col justify-center items-center">
          <label className="text-muted mb-1 d-block">
            <small>User group</small>
          </label>
          <Select multiple value={usergroup} onChange={handleChange} renderValue={(selected) => selected.join(", ")} className="grid-100">
            {displaygroup.map((row) => {
              if (row.status === 1) {
                return (
                  <MenuItem key={row.groupname} value={row.groupname}>
                    <Checkbox checked={usergroup.indexOf(row.groupname) > -1} />
                    <ListItemText primary={row.groupname} />
                  </MenuItem>
                )
              }
            })}
          </Select>
        </div>
        {/* <label className="text-muted mb-1 d-block">
          <small>Set as Admin</small>
        </label>
        <input
          type="checkbox"
          value={isAdmin}
          onClick={(e) => {
            setIsAdmin(e.target.value)
          }}
        ></input> */}
        <div class="form-group flex flex-col justify-center items-center">
          <button className="btn btn-primary">Create</button>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default CreateUser
