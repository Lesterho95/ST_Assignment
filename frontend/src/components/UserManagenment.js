import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import userService from "../services/user.service"

function UserManagement() {
  const [userList, setUserList] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    getAllUser()
  }, [])

  const getAllUser = async () => {
    await userService.findAllUser().then((res) => {
      setUserList(res.result)
    })
  }

  function handleEdit(user) {
    localStorage.setItem("userprofile", user)
    navigate("/edituser")
  }

  function handleClick(value, index) {
    const status = { username: userList[index].username, status: Number(!value) }
    userService
      .editUserStatus(status)
      .then((res) => {})
      .then(() => {
        getAllUser()
      })
  }

  return (
    <div>
      {/* <div class="flex flex-col ml-20 mt-2">
        <button onClick={() => navigate(-1)} className="btn btn-primary w-20">
          Back
        </button>
      </div> */}
      <div class="text-center pt-10">
        <h2>USER MANAGEMENT</h2>
        <div class="p-3">
          <Link className="btn btn-primary mr-2" to="/createuser">
            Create User
          </Link>
        </div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <table>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>User Group</th>
            <th>Status</th>
            {/* <th>Admin</th> */}
          </tr>
          {userList.map((user, index) => {
            return (
              <tr key={index}>
                <td>{user.username}</td>
                <td>{user.email == "null" ? "" : user.email}</td>
                <td>{user.user_group}</td>
                <td styl>
                  <select
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={() => {
                      handleClick(user.status, index)
                    }}
                    value={user.status}
                  >
                    <option>{user.status ? "Active" : "Inactive"}</option>
                    <option>{!user.status ? "Active" : "Inactive"}</option>
                  </select>
                </td>
                <td>
                  <button
                    class="bg-slate-50 hover:bg-slate-300 text-blue-700 font-semibold py-2 px-4 border border-blue-500  rounded"
                    onClick={() => {
                      handleEdit(user.username)
                    }}
                  >
                    Edit User
                  </button>
                </td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default UserManagement
