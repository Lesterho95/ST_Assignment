import React, { useEffect, useState } from "react"
import userService from "../services/user.service"
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function EditPassword() {
  const navigate = useNavigate()
  const [newPassword, setNewPassword] = useState("")

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

  const handleEdit = (e) => {
    e.preventDefault()
    let validate = validatePassword(newPassword)
    if (!validate.result) {
      toast.error(validate.message, { postion: "top-right", autoClose: 1000 })
    } else {
      const user = { username: localStorage.getItem("username"), password: newPassword }
      userService.editUserPassword(user).then((res) => {
        toast.success(res.message, { postion: "top-right", autoClose: 1000 })
        setNewPassword("")
        console.log("edit password", res)
        // navigate("/myprofile")
      })
    }
  }

  const back = () => {
    window.history.back()
  }

  return (
    <div>
      <div class=" ml-20 mt-5">
        <button onClick={() => navigate(-1)} className="bg-slate-300 hover:bg-slate-600 border rounded w-20">
          Back
        </button>
      </div>

      <div class="flex flex-col justify-center items-center mt-5">
        <div></div>
        Edit Password
        <form onSubmit={handleEdit}>
          <input
            class="flex justify-center form-control form-control-title mt-1"
            type="password"
            placeholder="New Password"
            name="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value)
            }}
          ></input>
          <div class="flex flex-col justify-center items-center mt-2">
            <div class="flex flex-col justify-center items-center mt-2">
              <button className="btn btn-primary">Change</button>
            </div>
          </div>
        </form>
        <ToastContainer />
      </div>
    </div>
  )
}

export default EditPassword
