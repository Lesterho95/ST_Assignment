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
import userService from "../../services/user.service"

function TaskModal(props) {
  const [open, setOpen] = useState(false)
  const [planName, setPlanName] = useState([])
  const [taskName, setTaskName] = useState("")
  const [taskDescription, setTaskDescription] = useState("")
  const [taskNotes, setTaskNotes] = useState("")
  const [taskId, setTaskId] = useState("")
  const [taskPlan, setTaskPlan] = useState("")
  const [taskAppAcronym, setTaskAppAcronym] = useState([])
  const [taskState, setTaskState] = useState("Open")
  const [taskCreator, setTaskCreator] = useState("")
  const [taskOwner, setTaskOwner] = useState("")
  const [taskCreateDate, setTaskCreateDate] = useState("")

  const handleOpen = (e) => {
    e.preventDefault()
    if (localStorage.getItem("user_group").split(",").includes(props.application.app_permit_Create)) {
      setOpen(true)
    } else {
      toast.error("You are not authorised to create task!")
    }
  }
  const handleClose = () => setOpen(false)
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
    p: 1,
  }

  var today = new Date()
  var dd = String(today.getDate()).padStart(2, "0")
  var mm = String(today.getMonth() + 1).padStart(2, "0")
  var yyyy = today.getFullYear()
  today = yyyy + "-" + mm + "-" + dd

  const task_app_acronym = { plan_app_acronym: localStorage.getItem("appacronym") }

  useEffect(() => {
    getAllPlan()
  }, [])

  const getAllPlan = async () => {
    await userService.getAppAcronymForPlan(task_app_acronym).then((res) => {
      setPlanName(res.result)
    })
  }

  const handleTaskPlan = (e) => {
    const {
      target: { value },
    } = e
    setTaskPlan(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  const handleCreate = (e) => {
    e.preventDefault()
    const task = {
      task_name: taskName,
      task_description: taskDescription,
      task_notes: taskNotes + "," + new Date().toUTCString(), // task_id: taskId,
      task_plan: taskPlan,
      task_app_acronym: localStorage.getItem("appacronym"),
      // task_state: taskState,
      task_creator: localStorage.getItem("username"),
      task_owner: localStorage.getItem("username"),
      task_createDate: today,
    }
    userService.createTask(task).then((res) => {
      if (res.result == true) {
        setTaskName("")
        setTaskDescription("")
        setTaskNotes("")
        setTaskId("")
        setTaskPlan("")
        setTaskAppAcronym("")
        setTaskState("")
        setTaskCreator("")
        setTaskOwner("")
        setTaskCreateDate("")
        props.AllTask()
        toast.success("Task Created Successfully")
      } else {
        toast.error("Incorrect Creation of Task")
      }
    })
  }
  return (
    <div>
      <Button onClick={handleOpen}>Create Task</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Task App Acronym: {localStorage.getItem("appacronym")}
          </Typography>

          <form onSubmit={handleCreate}>
            <div>
              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1">
                  <small>Task Name</small>
                </label>
                <input
                  autoFocus
                  required
                  class="flex justify-center form-control form-control-title w-50"
                  type="text"
                  value={taskName}
                  autoComplete="off"
                  onChange={(e) => {
                    setTaskName(e.target.value)
                  }}
                />
              </div>

              <div className=" flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>Task Description</small>
                </label>
                <textarea
                  rows="10"
                  cols="60"
                  className="flex justify-center form-control form-control-title w-50"
                  type="textarea"
                  value={taskDescription}
                  onChange={(e) => {
                    setTaskDescription(e.target.value)
                  }}
                ></textarea>
              </div>
              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>Task Notes</small>
                </label>
                <input
                  name="body"
                  className="flex justify-center form-control form-control-title w-50"
                  type="text"
                  value={taskNotes}
                  onChange={(e) => {
                    setTaskNotes(e.target.value)
                  }}
                ></input>
              </div>

              {/* <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>Task id</small>
                </label>
                <input
                  name="body"
                  className="flex justify-center form-control form-control-title w-50"
                  type="text"
                  value={taskId}
                  onChange={(e) => {
                    setTaskId(e.target.value)
                  }}
                ></input>
              </div> */}

              {/* <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>Task App Acronym: {localStorage.getItem("appacronym")}</small>
                </label>
              </div> */}

              {/* <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>Task State</small>
                </label>
                <input
                  name="body"
                  className="flex justify-center form-control form-control-title w-50"
                  type="text"
                  value={taskState}
                  onChange={(e) => {
                    setTaskState(e.target.value)
                  }}
                ></input>
              </div> */}
              {/* <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>Task creator</small>
                </label>
                <input
                  name="body"
                  className="flex justify-center form-control form-control-title w-50"
                  type="text"
                  value={taskCreator}
                  onChange={(e) => {
                    setTaskCreator(e.target.value)
                  }}
                ></input>
              </div> */}
              {/* <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>Task Owner</small>
                </label>
                <input
                  name="body"
                  className="flex justify-center form-control form-control-title w-50"
                  type="text"
                  value={taskOwner}
                  onChange={(e) => {
                    setTaskOwner(e.target.value)
                  }}
                ></input>
              </div> */}
            </div>

            {/* <div class="grid grid-cols-2 gap-1">
              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>Task Create Date</small>
                </label>
                <input
                  type="date"
                  value={taskCreateDate}
                  onChange={(e) => {
                    setTaskCreateDate(e.target.value)
                  }}
                />
              </div>
            </div> */}

            <div>
              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>Task Plan</small>
                </label>
                <Select value={taskPlan} onChange={handleTaskPlan} renderValue={(selected) => selected.join(", ")} className="grid-100">
                  {planName.map((task) => (
                    <MenuItem key={task.plan_mvp_name} value={task.plan_mvp_name}>
                      <Checkbox checked={taskPlan.indexOf(task.plan_mvp_name) > -1} />
                      <ListItemText primary={task.plan_mvp_name} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
            </div>

            <div class="form-group flex flex-col justify-center items-center">
              <button className="btn btn-primary">Create</button>
            </div>
          </form>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default TaskModal
