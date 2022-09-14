import React, { useEffect, useState } from "react"
import userService from "../services/user.service"
import { useNavigate } from "react-router-dom"
import ApplicationModal from "./modal/ApplicationModal"
import ViewApplication from "./modal/ViewApplication"

function Application() {
  const [applicationList, setApplicationList] = useState([])
  let navigate = useNavigate()

  useEffect(() => {
    allApplication()
  }, [])

  const allApplication = () => {
    userService.getAllApplication().then((res) => {
      setApplicationList(res.result)
    })
  }

  const formateDate = (date) => {
    return JSON.stringify(date).split("T")[0].slice(1)
  }

  const handleApplication = (appacronym) => {
    localStorage.setItem("appacronym", appacronym)
    navigate("/kanbanboard")
  }

  return (
    <div>
      <div class="text-center pt-10">
        <h2>CREATE APPLICATION</h2>
        <div class="p-3">
          <ApplicationModal allApplication={allApplication} />
        </div>
      </div>
      <div class="flex flex-col justify-center items-center">
        <table>
          <tr>
            <th>App Acronym</th>
            {/* <th>Description</th> */}
            <th>RNumber</th>
            <th>Start Date</th>
            <th>End Date</th>
            {/* <th>App Permit Open</th>
            <th>App Permit To Do List</th>
            <th>App Permit To Doing</th>
            <th>Appl Permit Done</th> */}
          </tr>
          {applicationList.map((application, index) => {
            return (
              <tr key={index}>
                <td>{application.app_acronym}</td>
                {/* <td>{application.app_description}</td> */}
                <td>{application.app_rnumber}</td>
                <td>{formateDate(application.app_startDate)}</td>
                <td>{formateDate(application.app_endDate)}</td>
                {/* <td>{application.app_permit_Open}</td>
                <td>{application.app_permit_toDoList}</td>
                <td>{application.app_permit_Doing}</td>
                <td>{application.app_permit_Done}</td> */}

                <td>
                  <button
                    class="bg-slate-50 hover:bg-slate-300 text-blue-700 font-semibold py-2 px-4 border border-blue-500  rounded"
                    onClick={() => {
                      handleApplication(application.app_acronym)
                    }}
                  >
                    {application.app_acronym}
                  </button>
                </td>
                <td>
                  <ViewApplication applicationName={application.app_acronym} />
                </td>
              </tr>
            )
          })}
        </table>
      </div>
    </div>
  )
}

export default Application
