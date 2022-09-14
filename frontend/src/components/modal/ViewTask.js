import React, { useEffect, useState } from "react"
import { Modal } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import ListItemText from "@mui/material/ListItemText"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Checkbox from "@mui/material/Checkbox"
import { ToastContainer, toast } from "react-toastify"
import EditIcon from "@mui/icons-material/Edit"

import userService from "../../services/user.service"

function ViewTask(props) {
  const [open, setOpen] = useState(false)
  const [oneTask, setOneTask] = useState([])
  const [taskId, setTaskId] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskName, setTaskName] = useState("")
  const [taskNotes, setTaskNotes] = useState("")
  const [taskOwner, setTaskOwner] = useState("")
  const [editTaskNotes, setEditTaskNotes] = useState("")
  const [oldPlan, setOldPlan] = useState("")
  const [taskState, setTaskState] = useState("")
  const [editTaskPlan, setEditTaskPlan] = useState([])
  const [allTaskPlan, setAllTaskPlan] = useState([])

  const handleOpen = () => {
    setOpen(true)
    getOneTask()
    getAllPlan()
  }
  const handleClose = () => {
    setOpen(false)
  }

  const getOneTask = () => {
    userService.getOneTask({ task_name: props.taskname }).then((res) => {
      setOneTask(res.result)
      setTaskId(res.result.task_id)
      setTaskDescription(res.result.task_description)
      setTaskName(res.result.task_name)
      setTaskNotes(res.result.task_notes)
      setTaskOwner(res.result.task_owner)
      setOldPlan(res.result.task_plan)
      setTaskState(res.result.task_state)
      setEditTaskPlan(res.result.task_plan.length != 0 ? res.result.task_plan.split(",") : [])
    })
  }
  const task_app_acronym = { plan_app_acronym: localStorage.getItem("appacronym") }

  const getAllPlan = async () => {
    await userService.getAppAcronymForPlan(task_app_acronym).then((res) => {
      console.log("lalalal", res.result)
      setAllTaskPlan(res.result)
    })
  }

  const handleTaskPlan = (e) => {
    const {
      target: { value },
    } = e
    setEditTaskPlan(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "80%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    overflowY: "scroll",
    // p: 1,
  }
  const handleUpdate = (e) => {
    e.preventDefault()
    let user = localStorage.getItem("username")
    let notes = ""
    if (editTaskNotes != "") {
      notes += " " + user + " add notes: " + editTaskNotes + "\n"
    }
    if (oldPlan != editTaskPlan) {
      notes += " " + user + " change the plan to " + editTaskPlan + "\n"
    }
    const editTask = {
      task_owner: user,
      task_name: taskName,
      task_id: taskId,
      task_notes: "Current state: " + taskState + ", " + new Date().toUTCString() + notes,
      task_plan: editTaskPlan,
      oldNotes: taskNotes,
    }
    userService.updateTask(editTask).then((res) => {
      if (res.result) {
        // setTaskPlan("")
        setEditTaskNotes("")
        toast.success("TaskUpdated Successfully")
        getOneTask()
        retrieveTasks()
        props.updateeverything()
      } else {
        toast.error("Unsuccessful update")
      }
    })
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
    props.updateTaskDetail([openList, toDoList, doingList, doneList, closeList])
  }
  return (
    <div>
      <Button onClick={handleOpen}>View Task</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Task Name: {taskName}
          </Typography>
          <form onSubmit={handleUpdate}>
            <div>
              <div class="flex justify-center items-center">
                <div className="form-group flex flex-col justify-center items-center">
                  <label className="text-muted mb-1 d-block">
                    <small>Task Description</small>
                  </label>
                  <textarea cols="100" rows="5" value={taskDescription} disabled></textarea>
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <label className="text-muted mb-1">
                  <small>Task Notes</small>
                </label>
                <div>
                  <textarea cols="100" rows="5" disabled value={taskNotes}></textarea>
                </div>
                <div>
                  <textarea cols="100" rows="5" value={editTaskNotes} onChange={(e) => setEditTaskNotes(e.target.value)} />
                </div>
              </div>

              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>Task Plan</small>
                </label>
                <Select value={editTaskPlan} onChange={handleTaskPlan} renderValue={(selected) => selected.join(", ")} className="grid-100">
                  {allTaskPlan.map((task) => (
                    <MenuItem key={task.plan_mvp_name} value={task.plan_mvp_name}>
                      <Checkbox checked={editTaskPlan.indexOf(task.plan_mvp_name) > -1} />
                      <ListItemText primary={task.plan_mvp_name} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div class="form-group flex flex-col justify-center items-center">{props.showEdit == true && <button className="btn btn-primary">Update</button>}</div>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default ViewTask
