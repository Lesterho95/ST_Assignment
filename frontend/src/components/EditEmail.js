import React, { useEffect, useState } from "react"
import userService from "../services/user.service"
import { useNavigate } from "react-router-dom"

function EditEmail() {
  const navigate = useNavigate()
  const [changeemail, setChangeEmail] = useState("")

  const handleEdit = (e) => {
    e.preventDefault()
    const user = { username: localStorage.getItem("username"), email: changeemail }
    userService.editUserEmail(user).then((res) => {
      navigate("/myprofile")
      console.log("edit email", res)
    })
  }

  const back = () => {
    window.history.back()
  }
  return (
    <div>
      <div class="flex flex-col ml-20 mt-5">
        <button onClick={() => navigate(-1)} className="bg-slate-300 hover:bg-slate-600 border rounded w-20">
          Back
        </button>
      </div>
      <div class="flex flex-col justify-center items-center mt-5">
        Edit Email
        <form onSubmit={handleEdit}>
          <input
            class="flex justify-center form-control form-control-title mt-1"
            type="text"
            placeholder="New Email"
            name="email"
            required
            onChange={(e) => {
              setChangeEmail(e.target.value)
            }}
          ></input>
          <div class="flex flex-col justify-center items-center mt-2">
            <div class="flex flex-col justify-center items-center mt-2">
              <button className="btn btn-primary">Change</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEmail
