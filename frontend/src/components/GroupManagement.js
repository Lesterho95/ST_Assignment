import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import userService from "../services/user.service"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function GroupManagement() {
  const [usergroup, setUserGroup] = useState("")
  const [groupList, setGroupList] = useState([])

  useEffect(() => {
    getAllGroup()
  }, [])

  const getAllGroup = () => {
    userService.getAllUserGroup().then((res) => {
      setGroupList(res.result)
    })
  }

  const handleCreate = (e) => {
    e.preventDefault()
    const group = {
      groupname: usergroup,
    }
    console.log("usergroup", usergroup)
    if (usergroup == "" || usergroup == null) {
      toast.warning("Enter new group name")
    } else {
      userService.createUserGroup(group).then((res) => {
        console.log("group created", res)
        if (res.result == true) {
          toast.success("Group Created")
          setUserGroup("")
          getAllGroup()
        } else {
          setUserGroup("")
          toast.warning("Duplicate Group Name")
        }
      })
    }
  }

  function handleClick(value, index) {
    console.log("groupname", groupList[index].groupname)
    console.log("group value", Number(!value))
    const status = { groupname: groupList[index].groupname, status: Number(!value) }
    userService
      .editGroupStatus(status)
      .then((res) => {
        console.log("status", res)
      })
      .then(() => {
        getAllGroup()
      })
  }
  return (
    <div>
      <div class="text-center pt-10">
        <h2>GROUP MANAGEMENT</h2>
        <div>Create Group</div>
      </div>

      <form onSubmit={handleCreate} className="p-10">
        <div class="form-group flex flex-col justify-center items-center">
          <label className="text-muted mb-1"></label>
          <input
            autoFocus
            class="flex justify-center form-control form-control-title w-50"
            type="text"
            autoComplete="off"
            value={usergroup}
            onChange={(e) => {
              setUserGroup(e.target.value)
            }}
          />
        </div>
        <div class="flex flex-col justify-center items-center">
          <button class="btn btn-primary">Create</button>
        </div>
      </form>
      <div class="flex justify-center">
        <table class=" table-fixed">
          <tr>
            <th>No.</th>
            <th>User Group</th>
            {/* <th>Status</th> */}
          </tr>
          {groupList.map((group, index) => {
            return (
              <tr key={index}>
                <td>{index + 1}</td>

                <td>{group.groupname}</td>
                {/* <td>
                  <select
                    class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 overflow-auto"
                    onChange={() => {
                      handleClick(group.status, index)
                    }}
                    value={group.status}
                  >
                    <option>{group.status ? "Active" : "Inactive"}</option>
                    <option>{!group.status ? "Active" : "Inactive"}</option>
                  </select>
                </td> */}
              </tr>
            )
          })}
          <tr></tr>
        </table>
      </div>
      <ToastContainer />
    </div>
  )
}

export default GroupManagement
