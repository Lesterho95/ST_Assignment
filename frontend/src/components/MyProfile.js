import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import userService from "../services/user.service"

function EditUser() {
  const [userProfile, setUserProfile] = useState("")

  useEffect(() => {
    const username = { username: localStorage.getItem("username") }
    console.log("useprofile", username)

    userService.findOneUser(username).then((res) => {
      console.log("edit profile", res.result)
      setUserProfile(res.result)
    })
  }, [])

  return (
    <div class="flex flex-col justify-center items-center">
      <div class="text-blue-900 my-3">MY PROFILE</div>
      <div class="grid justify-items-start">
        <div class="text-red-500">
          Username: <span class="inline text-black">{userProfile.username} </span>
        </div>
        <div class="text-red-500">
          Email: <span class="inline text-black">{userProfile.email}</span>
        </div>
        <div class="text-red-500">
          User Group: <span class="inline text-black">{userProfile.user_group}</span>
        </div>
        <div class="text-red-500">
          Status: <span class="inline text-black">{userProfile.status ? "Active" : "Inactive"}</span>
        </div>
      </div>
      <div class=" my-5 grid gap-2">
        <Link className="bg-slate-50 hover:bg-slate-300 text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded" to="/editpassword">
          Edit Password
        </Link>
        <Link className="bg-slate-50 hover:bg-slate-300 text-blue-700 font-semibold py-2 px-4 border border-blue-500 rounded text-center" to="/editemail">
          Edit email
        </Link>
      </div>
    </div>
  )
}

export default EditUser
