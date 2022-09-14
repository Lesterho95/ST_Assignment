import React, { useEffect, useState } from "react"
import userService from "../services/user.service"
import PlanModal from "./modal/PlanModal"
import TaskModal from "./modal/TaskModal"
import TaskCard from "./TaskCard"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import ViewPlan from "./modal/ViewPlan"

function KanBanBoard() {
  const [allPlan, setAllPlan] = useState([])
  const [taskList, setTaskList] = useState([])
  const [getApp, setGetApp] = useState("")

  const [permitOpen, setPermitOpen] = useState("")
  const [permitToDo, setPermitToDo] = useState("")
  const [permitDoing, setPermitDoing] = useState("")
  const [permitDone, setPermitDone] = useState("")
  const [permitClose, setPermitClose] = useState("")

  const formateDate = (date) => {
    return JSON.stringify(date).split("T")[0].slice(1)
  }

  let app_acronym = { plan_app_acronym: localStorage.getItem("appacronym") }
  let getOneApp = { app_acronym: localStorage.getItem("appacronym") }

  const handlePlan = (planmvpname) => {
    localStorage.setItem("planName", planmvpname)
  }

  useEffect(() => {
    getAllPlan()
    getAllTasksByState()
    getOneApplication()
  }, [taskList])

  const getAllPlan = () => {
    userService.getAppAcronymForPlan(app_acronym).then((res) => {
      // console.log("hellohello", res.result)
      setAllPlan(res.result)
    })
  }

  const getOneApplication = () => {
    userService.getOneApplication(getOneApp).then((res) => {
      setGetApp(res.result)
      setPermitOpen(res.result.app_permit_Open)
      setPermitToDo(res.result.app_permit_toDoList)
      setPermitDoing(res.result.app_permit_Doing)
      setPermitDone(res.result.app_permit_Done)
    })
  }

  const getAllTasksByState = async () => {
    let appName = localStorage.getItem("appacronym")
    let openList = []
    let doingList = []
    let doneList = []
    let toDoList = []
    let closeList = []

    const openTask = {
      task_app_acronym: appName,
      task_state: "Open",
    }
    const toDoTask = {
      task_app_acronym: appName,
      task_state: "To Do",
    }
    const doingTask = {
      task_app_acronym: appName,
      task_state: "Doing",
    }
    const doneTask = {
      task_app_acronym: appName,
      task_state: "Done",
    }
    const closeTask = {
      task_app_acronym: appName,
      task_state: "Close",
    }

    await userService.getAllTasksByState(openTask).then((res) => {
      if (res.result.length) {
        openList = { name: "Open", task: res.result }
      } else {
        openList = { name: "Open", task: [] }
      }
    })
    await userService.getAllTasksByState(toDoTask).then((res) => {
      if (res.result.length) {
        toDoList = { name: "To Do", task: res.result }
      } else {
        toDoList = { name: "To Do", task: [] }
      }
    })
    await userService.getAllTasksByState(doingTask).then((res) => {
      if (res.result.length) {
        doingList = { name: "Doing", task: res.result }
      } else {
        doingList = { name: "Doing", task: [] }
      }
    })
    await userService.getAllTasksByState(doneTask).then((res) => {
      if (res.result.length) {
        doneList = { name: "Done", task: res.result }
      } else {
        doneList = { name: "Done", task: [] }
      }
    })
    await userService.getAllTasksByState(closeTask).then((res) => {
      if (res.result.length) {
        closeList = { name: "Close", task: res.result }
      } else {
        closeList = { name: "Close", task: [] }
      }
    })
    setTaskList([openList, toDoList, doingList, doneList, closeList])
  }

  const bull = (
    <Box component="span" sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}>
      •
    </Box>
  )

  return (
    <div>
      <PlanModal applicationPlan={getAllPlan} application={getApp} />
      <div class="flex flex-col justify-center items-center">
        <table>
          <tr>
            <th>Plan Name</th>
            <th>Plan Start Date</th>
            <th>Plan End Date</th>
            <th>Plan App Aconym</th>
          </tr>
          {allPlan.map((plan, index) => {
            return (
              <tr key={index}>
                <td>{plan.plan_mvp_name}</td>
                <td>{formateDate(plan.plan_startDate)}</td>
                <td>{formateDate(plan.plan_endDate)}</td>
                <td>{plan.plan_app_acronym}</td>
                <td>
                  <ViewPlan planName={plan.plan_mvp_name} AllTask={getAllTasksByState} applicationPlan={getAllPlan} plancolor={plan.color} EditPlan={localStorage.getItem("user_group").split(",").includes("ProjectManager") ? true : false} />
                  {/* <button
                    class="bg-slate-50 hover:bg-slate-300 text-blue-700 font-semibold py-2 px-4 border border-blue-500  rounded"
                    onClick={() => {
                      handlePlan(plan.plan_mvp_name)
                    }}
                  >
                    {plan.plan_mvp_name}
                  </button> */}
                </td>
              </tr>
            )
          })}
        </table>
        <TaskModal AllTask={getAllTasksByState} application={getApp} />
        <div>
          <Grid container spacing={1} wrap="nowrap">
            <Grid item>
              <Paper sx={{ width: 250, minHeight: 400 }}>
                <h3 class="py-2">&nbsp; Open: {permitOpen}</h3>
                {taskList
                  .filter((taskList) => taskList.name == "Open")
                  .map((result) => {
                    return result.task.map((task) => {
                      return (
                        <div>
                          <TaskCard data={task} setTaskList={setTaskList} application={getApp} showRight={localStorage.getItem("user_group").split(",").includes(permitOpen) ? true : false} showEdit={localStorage.getItem("user_group").split(",").includes(permitOpen) ? true : false} AllPlan={allPlan} applicationPlan={getAllPlan} />
                        </div>
                      )
                    })
                  })}
              </Paper>
            </Grid>
            <Grid item>
              <Paper sx={{ width: 250, minHeight: 400 }}>
                <h3 class="py-2">&nbsp; To-Do-List: {permitToDo}</h3>
                {taskList
                  .filter((taskList) => taskList.name == "To Do")
                  .map((result) => {
                    return result.task.map((task) => {
                      return <TaskCard data={task} setTaskList={setTaskList} application={getApp} showRight={localStorage.getItem("user_group").split(",").includes(permitToDo) ? true : false} showEdit={localStorage.getItem("user_group").split(",").includes(permitToDo) ? true : false} AllPlan={allPlan} applicationPlan={getAllPlan} />
                    })
                  })}
              </Paper>
            </Grid>
            <Grid item>
              <Paper sx={{ width: 250, minHeight: 400 }}>
                <h3 class="py-2">&nbsp; Doing: {permitDoing}</h3>
                {taskList
                  .filter((taskList) => taskList.name == "Doing")
                  .map((result) => {
                    return result.task.map((task) => {
                      return <TaskCard data={task} setTaskList={setTaskList} application={getApp} showRight={localStorage.getItem("user_group").split(",").includes(permitDoing) ? true : false} showLeft={localStorage.getItem("user_group").split(",").includes(permitDoing) ? true : false} showEdit={localStorage.getItem("user_group").split(",").includes(permitDoing) ? true : false} AllPlan={allPlan} applicationPlan={getAllPlan} />
                    })
                  })}
              </Paper>
            </Grid>
            <Grid item>
              <Paper sx={{ width: 250, minHeight: 400 }}>
                <h3 class="py-2">&nbsp; Done: {permitDone}</h3>
                {taskList
                  .filter((taskList) => taskList.name == "Done")
                  .map((result) => {
                    return result.task.map((task) => {
                      return <TaskCard data={task} setTaskList={setTaskList} application={getApp} showRight={localStorage.getItem("user_group").split(",").includes(permitDone) ? true : false} showLeft={localStorage.getItem("user_group").split(",").includes(permitDone) ? true : false} showEdit={localStorage.getItem("user_group").split(",").includes(permitDone) ? true : false} AllPlan={allPlan} applicationPlan={getAllPlan} />
                    })
                  })}
              </Paper>
            </Grid>
            <Grid item>
              <Paper sx={{ width: 250, minHeight: 400 }}>
                <h3 class="py-2">&nbsp; Close: {permitClose}</h3>
                {taskList
                  .filter((taskList) => taskList.name == "Close")
                  .map((result) => {
                    return result.task.map((task) => {
                      return <TaskCard data={task} showLeft={false} showRight={false} showEdit={false} AllPlan={allPlan} applicationPlan={getAllPlan} />
                    })
                  })}
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  )
}

export default KanBanBoard
