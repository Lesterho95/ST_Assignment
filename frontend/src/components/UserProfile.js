import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import userService from "../services/user.service"

function UserProfile() {
  const [userProfile, setUserProfile] = useState("")

  useEffect(() => {
    const username = { username: localStorage.getItem("userprofile") }
    console.log("useprofile", username)

    userService.findOneUser(username).then((res) => {
      console.log("edit profile", res.result)
      setUserProfile(res.result)
    })
  }, [])
  return (
    <div>
      <div>USER PROFILE FOR ADMIN</div>
      <div>
        <h6>Username: {userProfile.username} </h6>
      </div>
      <div>
        <h6>Email: {userProfile.email}</h6>
      </div>
      <h6>User Group: {userProfile.user_group ? userProfile.user_group : "no user group"}</h6>
      <h6>Status: {userProfile.status ? "Active" : "Inactive"}</h6>
      <h6>Admin: {userProfile.isAdmin ? "Yes" : "No"}</h6>
      <div>
        <Link className="btn btn-sm btn-dark" to="/editpassword">
          Edit Password
        </Link>
        <Link className="btn btn-sm btn-dark" to="/editemail">
          Edit email
        </Link>
      </div>
    </div>
  )
}

export default UserProfile
