import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Modal from "@mui/material/Modal"

import userService from "../../services/user.service"
import ListItemText from "@mui/material/ListItemText"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import Checkbox from "@mui/material/Checkbox"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

function ApplicationModal(props) {
  const [open, setOpen] = useState(false)
  const [appAcronym, setAppAcronym] = useState("")
  const [appDescription, setAppDescription] = useState("")
  const [appRnumber, setAppRNumber] = useState("")
  const [appStartDate, setAppStartDate] = useState("")
  const [appEndDate, setAppEndDate] = useState("")
  const [appPermitCreate, setAppPermitCreate] = useState([])
  const [appPermitOpen, setAppPermitOpen] = useState([])
  const [appPermitToDoList, setAppPermitToDoList] = useState([])
  const [appPermitDoing, setAppPermitDoing] = useState([])
  const [appPermitDone, setAppPermitDone] = useState([])
  const [displayGroup, setDisplayGroup] = useState([])

  const handleOpen = (e) => {
    e.preventDefault()
    if (localStorage.getItem("user_group").split(",").includes("ProjectLead")) {
      setOpen(true)
    } else {
      toast.error("You are not authorised to create Application!")
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
  useEffect(() => {
    userService.getAllUserGroup().then((res) => {
      setDisplayGroup(res.result)
    })
  }, [])

  const handlePermitCreate = (e) => {
    const {
      target: { value },
    } = e
    setAppPermitCreate(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  const handlePermitToDoList = (e) => {
    const {
      target: { value },
    } = e
    setAppPermitToDoList(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  const handlePermitOpen = (e) => {
    const {
      target: { value },
    } = e
    setAppPermitOpen(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  const handlePermitDoing = (e) => {
    const {
      target: { value },
    } = e
    setAppPermitDoing(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  const handlePermitDone = (e) => {
    const {
      target: { value },
    } = e
    setAppPermitDone(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    )
  }

  const handleCreate = (e) => {
    e.preventDefault()
    const app = {
      app_acronym: appAcronym,
      app_description: appDescription,
      app_rnumber: appRnumber,
      app_startDate: appStartDate,
      app_endDate: appEndDate,
      app_permit_Create: appPermitCreate,
      app_permit_Open: appPermitOpen,
      app_permit_toDoList: appPermitToDoList,
      app_permit_Doing: appPermitDoing,
      app_permit_Done: appPermitDone,
    }

    userService.createApplication(app).then((res) => {
      console.log("what is applicaion res", res)
      if (res.result == true) {
        setAppAcronym("")
        setAppDescription("")
        setAppRNumber("")
        setAppStartDate("")
        setAppEndDate("")
        setAppPermitCreate([])
        setAppPermitOpen([])
        setAppPermitToDoList([])
        setAppPermitDoing([])
        setAppPermitDone([])
        setDisplayGroup([])
        toast.success("Application created")
        props.allApplication()
      } else {
        toast.error("Incorrect creation")
      }
    })
  }
  return (
    <div>
      <Button onClick={handleOpen}>Create Application</Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create
          </Typography>
          <form onSubmit={handleCreate}>
            <div>
              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1">
                  <small>App Acronym</small>
                </label>
                <input
                  autoFocus
                  required
                  class="flex justify-center form-control form-control-title w-50"
                  type="text"
                  value={appAcronym}
                  autoComplete="off"
                  onChange={(e) => {
                    setAppAcronym(e.target.value)
                  }}
                />
              </div>

              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>Description</small>
                </label>
                <textarea
                  rows="5"
                  cols="120"
                  name="body"
                  className="flex justify-center form-control form-control-title w-50"
                  type="textarea"
                  value={appDescription}
                  required
                  onChange={(e) => {
                    setAppDescription(e.target.value)
                  }}
                ></textarea>
              </div>
              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>R_Number</small>
                </label>
                <input
                  name="body"
                  className="flex justify-center form-control form-control-title w-50"
                  type="number"
                  value={appRnumber}
                  onChange={(e) => {
                    setAppRNumber(e.target.value)
                  }}
                ></input>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-1">
              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>Start Date</small>
                </label>
                <input
                  type="date"
                  value={appStartDate}
                  onChange={(e) => {
                    setAppStartDate(e.target.value)
                    console.log(appStartDate)
                  }}
                />
              </div>
              <div className="form-group flex flex-col justify-center items-center ">
                <label className="text-muted mb-1 d-block">
                  <small>End Date</small>
                </label>
                <input
                  type="date"
                  value={appEndDate}
                  onChange={(e) => {
                    setAppEndDate(e.target.value)
                    console.log(appEndDate)
                  }}
                />
              </div>
            </div>
            <div class="flex justify-around gap-1">
              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>App Permit Create</small>
                </label>
                <Select value={appPermitCreate} onChange={handlePermitCreate} renderValue={(selected) => selected.join(", ")} className="grid-100">
                  {displayGroup.map((name) => (
                    <MenuItem key={name.groupname} value={name.groupname}>
                      <Checkbox checked={appPermitCreate.indexOf(name.groupname) > -1} />
                      <ListItemText primary={name.groupname} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>App Permit Open</small>
                </label>
                <Select value={appPermitOpen} onChange={handlePermitOpen} renderValue={(selected) => selected.join(", ")} className="grid-100">
                  {displayGroup.map((name) => (
                    <MenuItem key={name.groupname} value={name.groupname}>
                      <Checkbox checked={appPermitOpen.indexOf(name.groupname) > -1} />
                      <ListItemText primary={name.groupname} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>App Permit To Do</small>
                </label>

                <Select value={appPermitToDoList} onChange={handlePermitToDoList} renderValue={(selected) => selected.join(", ")} className="grid-100">
                  {displayGroup.map((name) => (
                    <MenuItem key={name.groupname} value={name.groupname}>
                      <Checkbox checked={appPermitToDoList.indexOf(name.groupname) > -1} />
                      <ListItemText primary={name.groupname} />
                    </MenuItem>
                  ))}
                </Select>
              </div>
              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>App Permit Doing</small>
                </label>
                <Select value={appPermitDoing} onChange={handlePermitDoing} renderValue={(selected) => selected.join(", ")} className="grid-100">
                  {displayGroup.map((name) => (
                    <MenuItem key={name.groupname} value={name.groupname}>
                      <Checkbox checked={appPermitDoing.indexOf(name.groupname) > -1} />
                      <ListItemText primary={name.groupname} />
                    </MenuItem>
                  ))}
                </Select>
              </div>

              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>App Permit Done</small>
                </label>

                <Select value={appPermitDone} onChange={handlePermitDone} renderValue={(selected) => selected.join(", ")} className="grid-100">
                  {displayGroup.map((name) => (
                    <MenuItem key={name.groupname} value={name.groupname}>
                      <Checkbox checked={appPermitDone.indexOf(name.groupname) > -1} />
                      <ListItemText primary={name.groupname} />
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

export default ApplicationModal
