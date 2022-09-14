import React, { useEffect, useState } from "react"
import ViewTask from "./modal/ViewTask"

import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import CardContent from "@mui/material/CardContent"
import Button from "@mui/material/Button"
import userService from "../services/user.service"
import Typography from "@mui/material/Typography"
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight"
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft"
import { ToastContainer, toast } from "react-toastify"

function TaskCard(props) {
  const [taskList, setTaskList] = useState([])

  const formateDate = (date) => {
    return JSON.stringify(date).split("T")[0].slice(1)
  }

  let cardColor = ""
  let matching_plan = props.AllPlan.filter((p) => p.plan_mvp_name === props.data.task_plan)
  if (matching_plan.length > 0) {
    cardColor = matching_plan[0].color
  }
  const retrieveTasks = async () => {
    var appName = localStorage.getItem("appacronym")
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
  const handleStateChangeNext = (e) => {
    e.preventDefault()
    switch (props.data.task_state) {
      case "Open": {
        var loginUser = localStorage.getItem("username")
        var notes = "Current state: To Do, " + new Date().toUTCString() + " " + loginUser + " change from Open state to To Do state"
        var loginUser = localStorage.getItem("username")
        const task = {
          task_id: props.data.task_id,
          task_state: "To Do",
          task_notes: notes,
          task_owner: loginUser,
          oldNotes: props.data.task_notes,
        }
        userService.updateTaskState(task).then((res) => {
          if (res.result) {
            toast.success("Task Update Successfully")
            retrieveTasks()
            window.location.reload()
            return
          } else {
            toast.error("Update Fail! Please try again!")
          }
        })
        break
      }

      case "To Do": {
        var loginUser = localStorage.getItem("username")
        var notes = "Current state: Doing, " + new Date().toUTCString() + " " + loginUser + " change from To Do state to Doing state"
        const task = {
          task_id: props.data.task_id,
          task_state: "Doing",
          task_notes: notes,
          task_owner: loginUser,
          oldNotes: props.data.task_notes,
        }
        userService.updateTaskState(task).then((res) => {
          if (res.result) {
            toast.success("Task Update Successfully")
            retrieveTasks()
            window.location.reload()
            return
          } else {
            toast.error("Update Fail! Please try again!")
          }
        })

        break
      }
      case "Doing": {
        var loginUser = localStorage.getItem("username")
        var notes = "Current state: Done, " + new Date().toUTCString() + " " + loginUser + "change from Doing state to Done state"
        const task = {
          task_id: props.data.task_id,
          task_state: "Done",
          task_notes: notes,
          task_owner: loginUser,
          oldNotes: props.data.task_notes,
        }
        userService.updateTaskState(task).then((res) => {
          if (res.result) {
            toast.success("Task Update Successfully")
            retrieveTasks()
            window.location.reload()
            return
          } else {
            toast.error("Update Fail! Please try again!")
          }
        })
        let username = localStorage.getItem("username")
        let userEmail = localStorage.getItem("useremail")
        const email = {
          username: username,
          email: userEmail,
          task_id: props.data.task_id,
        }
        console.log("card email", email)
        userService.sendEmail(email)
        retrieveTasks()
        break
      }
      case "Done": {
        var loginUser = localStorage.getItem("username")
        var notes = "Current state: Close, " + new Date().toUTCString() + " " + loginUser + " change from Done state to Close state"
        const task = {
          task_id: props.data.task_id,
          task_state: "Close",
          task_notes: notes,
          task_owner: loginUser,
          oldNotes: props.data.task_notes,
        }
        userService.updateTaskState(task).then((res) => {
          if (res.result) {
            toast.success("Task Update Successfully")
            retrieveTasks()
            window.location.reload()
            return
          } else {
            toast.error("Update Fail! Please try again!")
          }
        })
        break
      }
      default:
        return
    }
  }

  const handleStateChangeBack = (e) => {
    e.preventDefault()
    switch (props.data.task_state) {
      case "Doing": {
        var loginUser = localStorage.getItem("username")
        var notes = "Current state: To Do, " + new Date().toUTCString() + " " + loginUser + " " + "change from Doing state to To Do state"
        const task = {
          task_id: props.data.task_id,
          task_state: "To Do",
          task_notes: notes,
          task_owner: loginUser,
          oldNotes: props.data.task_notes,
        }
        userService.updateTaskState(task).then((res) => {
          if (res.result) {
            toast.success("Task Update Successfully")
            retrieveTasks()
            window.location.reload()
            return
          } else {
            toast.error("Update Fail! Please try again!")
          }
        })
        break
      }
      case "Done": {
        var loginUser = localStorage.getItem("username")
        var notes = "Current state: Doing, " + new Date().toUTCString() + " " + loginUser + " change from Doing state to Doing state"
        const task = {
          task_id: props.data.task_id,
          task_state: "Doing",
          task_notes: notes,
          task_owner: loginUser,
          oldNotes: props.data.task_notes,
        }
        userService.updateTaskState(task).then((res) => {
          if (res.result) {
            toast.success("Task Update Successfully")
            retrieveTasks()
            window.location.reload()
            return
          } else {
            toast.error("Update Fail! Please try again!")
          }
        })
      }
      default:
        return
    }
  }
  return (
    <div class="py-1">
      <Card sx={{ minWidth: 140, color: cardColor }}>
        <CardContent>
          <Typography variant="h5" component="div">
            <p>{props.data.task_name}</p>
          </Typography>
          <br />
          <Typography variant="body2">Created Date: {formateDate(props.data.task_createDate)}</Typography>
          <Typography variant="body2">Plan: {props.data.task_plan}</Typography>
          <Typography variant="body2">Task Owner: {props.data.task_owner}</Typography>

          {props.showLeft == true && (
            <ArrowCircleLeftIcon
              onClick={(e) => {
                handleStateChangeBack(e)
              }}
            />
          )}
          {props.showRight == true && <ArrowCircleRightIcon onClick={handleStateChangeNext} />}
        </CardContent>
        <div class="grid justify-items-end">
          <ViewTask taskname={props.data.task_name} showEdit={props.showEdit} updateTask={props.AllTask} updateTaskDetail={props.setTaskList} />
        </div>
      </Card>
      <ToastContainer />
    </div>
  )
}

export default TaskCard
