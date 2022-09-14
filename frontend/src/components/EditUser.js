import React, { useEffect, useState } from "react"
import { createRoutesFromChildren } from "react-router-dom"
import userService from "../services/user.service"
import ListItemText from "@mui/material/ListItemText"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelecteChangeEvent } from "@mui/material/Select"
import Checkbox from "@mui/material/Checkbox"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
function EditUser() {
  const [editPassword, setEditPassword] = useState("")
  const [editEmail, setEditEmail] = useState("")
  const [profile, setProfile] = useState("")
  const [editGroup, setEditGroup] = useState([])
  const [displaygroup, setDisplayGroup] = useState([])
  const [openPasswordField, setOpenPasswordField] = useState(false)

  const navigate = useNavigate()

  const userdetail = { username: localStorage.getItem("userprofile") }
  console.log("detail", userdetail)
  useEffect(() => {
    userService.findOneUser(userdetail).then((res) => {
      if (res.result) {
        setEditEmail(res.result.email)
        setEditGroup(res.result.user_group.length != 0 ? res.result.user_group.split(",") : [])
        setProfile(res.result)
      }
    })

    userService.getAllUserGroup().then((res) => {
      console.log("usergroup", res)
      if (res.message === "Found") {
        setDisplayGroup(res.result)
      }
    })
  }, [localStorage.getItem("userprofile")])

  const handleChange = (e) => {
    const {
      target: { value },
    } = e

    setEditGroup(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

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

  const handleUpdate = (e) => {
    e.preventDefault()
    if (editPassword == "") {
      let editUser = {
        username: localStorage.getItem("userprofile"),
        password: editPassword == "" ? null : editPassword,
        email: editEmail,
        user_group: editGroup,
      }
      localStorage.setItem("editGroup", editGroup)
      userService.editUserProfile(editUser).then((res) => {
        if (res.result) {
          toast.success("User being Updated")
          // navigate("/usermanagement")
        }
        console.log("edit user res", res)
      })
    } else {
      let validate = validatePassword(editPassword)
      if (!validate.result) {
        toast.error(validate.message)
      } else {
        let editUser = {
          username: localStorage.getItem("userprofile"),
          password: editPassword == "" ? null : editPassword,
          email: editEmail,
          user_group: editGroup,
        }
        localStorage.setItem("editGroup", editGroup)
        userService.editUserProfile(editUser).then((res) => {
          if (res.result) {
            toast.success("User being Updated")
            // navigate("/usermanagement")
          }
        })
      }
    }
  }

  const handleChangePasswordField = (e) => {
    e.preventDefault()
    setOpenPasswordField(!openPasswordField)
  }

  return (
    <div>
      <div class="flex flex-col ml-20 mt-5">
        <button onClick={() => navigate(-1)} className="bg-slate-300 hover:bg-slate-600 border rounded w-20">
          Back
        </button>
      </div>
      <form className="p-2">
        <div class="form-group flex flex-col justify-center items-center">
          <label className="text-muted mb-1 d-block"></label>
          &nbsp;&nbsp;&nbsp;
          <button onClick={handleUpdate} className="btn btn-primary">
            Update
          </button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={handleChangePasswordField} className="btn btn-primary">
            Click Here To Change Password
          </button>
        </div>
        <div className="form-group flex flex-col justify-center items-center">
          <label className="text-muted mb-1">
            <small>Username</small>
          </label>
          <input autoFocus className="flex justify-center form-control form-control-title w-50" type="text" value={profile.username} autoComplete="off" disabled />
        </div>
        {openPasswordField && (
          <fieldset class="form-group flex flex-col justify-center items-center">
            <div className="grid-35">
              <label>New Password:</label>
            </div>
            <div className="flex justify-center  form-control-title w-50">
              <input type="password" className="form-control" name="newPassword" placeholder="New Password" value={editPassword} onChange={(e) => setEditPassword(e.target.value)} required="required" maxLength={20} />
            </div>
          </fieldset>
        )}
        {/* </div> */}
        <div className="form-group flex flex-col justify-center items-center">
          <label className="text-muted mb-1 d-block">
            <small>Email</small>
          </label>
          <input
            name="body"
            className="flex justify-center form-control form-control-title w-50"
            type="text"
            value={editEmail}
            onChange={(e) => {
              setEditEmail(e.target.value)
            }}
          ></input>
        </div>
        <div className="form-group flex flex-col justify-center items-center">
          <label className="text-muted mb-1 d-block">
            <small>User group</small>
          </label>
          {/* <p>{profile.user_group}</p> */}
          <div className="preview">
            {/* <p className="previewTitle">Selected Group:</p> */}
            <p className="previewText">{editGroup.length != 0 ? editGroup.map((res) => res + " ") : "You have not selected any group"}</p>
          </div>
          <Select multiple value={editGroup} onChange={handleChange} renderValue={(selected) => selected.join(", ")} className="grid-100">
            {displaygroup.map((name) => {
              if (name.status === 1) {
                return (
                  <MenuItem key={name.groupname} value={name.groupname}>
                    <Checkbox checked={editGroup.indexOf(name.groupname) > -1} />
                    <ListItemText primary={name.groupname} />
                  </MenuItem>
                )
              }
            })}
          </Select>
        </div>
      </form>
      <ToastContainer />
    </div>
  )
}

export default EditUser
