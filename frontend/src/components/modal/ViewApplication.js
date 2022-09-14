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

function ViewApplication(props) {
  const [open, setOpen] = useState(false)

  const [displayGroup, setDisplayGroup] = useState([])

  const [oneApp, setOneApp] = useState([])
  const [appName, setAppName] = useState("")
  const [appDescription, setAppDescription] = useState("")
  const [appStartDate, setAppStartDate] = useState("")
  const [appEndDate, setAppEndDate] = useState("")

  const [appPermitCreate, setAppPermitCreate] = useState("")
  const [appPermitOpen, setAppPermitOpen] = useState("")
  const [appPermitToDo, setAppPermitToDo] = useState("")
  const [appPermitDoing, setAppPermitDoing] = useState("")
  const [appPermitDone, setAppPermitDone] = useState("")

  const handleOpen = () => {
    if (localStorage.getItem("user_group").split(",").includes("ProjectLead")) {
      setOpen(true)
      getOneApp()
      getAllUserGroup()
    } else {
      toast.error("You are not authorised to edit Application!")
    }
  }

  const getOneApp = () => {
    let appacronym = { app_acronym: props.applicationName }
    userService.getOneApplication(appacronym).then((res) => {
      setOneApp(res.result)
      setAppName(res.result.app_acronym)
      setAppDescription(res.result.app_description)
      setAppStartDate(res.result.app_startDate)
      setAppEndDate(res.result.app_endDate)
      setAppPermitCreate(res.result.app_permit_Create.length != 0 ? res.result.app_permit_Create.split(",") : [])
      setAppPermitOpen(res.result.app_permit_Open.length != 0 ? res.result.app_permit_Open.split(",") : [])
      setAppPermitToDo(res.result.app_permit_toDoList.length != 0 ? res.result.app_permit_toDoList.split(",") : [])
      setAppPermitDoing(res.result.app_permit_Doing.length != 0 ? res.result.app_permit_Doing.split(",") : [])
      setAppPermitDone(res.result.app_permit_Done.length != 0 ? res.result.app_permit_Done.split(",") : [])
    })
  }

  const getAllUserGroup = async () => {
    await userService.getAllUserGroup().then((res) => {
      setDisplayGroup(res.result)
    })
  }

  const handlePermitCreate = (e) => {
    const {
      target: { value },
    } = e
    setAppPermitCreate(
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

  const handlePermitToDo = (e) => {
    const {
      target: { value },
    } = e
    setAppPermitToDo(
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

  const handleUpdate = (e) => {
    e.preventDefault()
    let editApplication = {
      app_acronym: props.applicationName,
      app_description: appDescription,
      app_startDate: formateDate(appStartDate),
      app_endDate: formateDate(appEndDate),
      app_permit_Create: appPermitCreate,
      app_permit_Open: appPermitOpen,
      app_permit_toDoList: appPermitToDo,
      app_permit_Doing: appPermitDoing,
      app_permit_Done: appPermitDone,
    }
    userService.updateApplication(editApplication).then((res) => {
      console.log(res.result)
      if (res.result == true) {
        toast.success("Update Successful")
      } else {
        toast.error("Unsuccessful Update")
      }
    })
  }

  const handleClose = () => setOpen(false)
  const formateDate = (date) => {
    return JSON.stringify(date).split("T")[0].slice(1)
  }
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    height: "80%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    overflowY: "scroll",
    p: 1,
  }

  return (
    <div>
      <Button class="bg-slate-50 hover:bg-slate-300 text-blue-700 font-semibold py-2 px-4 border border-blue-500  rounded" onClick={handleOpen}>
        Edit
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Application Name: {appName}
          </Typography>
          <form onSubmit={handleUpdate}>
            <div>
              <div class="flex justify-around items-center">
                {/* <div className="form-group flex flex-col justify-center items-center">
                  <label className="text-muted mb-1 d-block">
                    <small>App Acronym</small>
                  </label>
                  <input value={appName} disabled />
                </div> */}
                <div className="form-group flex flex-col justify-center items-center">
                  <label className="text-muted mb-1 d-block">
                    <small>App Description</small>
                  </label>
                  <textarea rows="10" cols="100" value={appDescription} disabled />
                </div>
              </div>
              <div class="flex justify-around items-center">
                <div className="form-group flex flex-col justify-center items-center">
                  <label className="text-muted mb-1 d-block">
                    <small> App Start Date</small>
                  </label>
                  <input type="date" value={formateDate(appStartDate)} disabled />
                </div>
                <div className="form-group flex flex-col justify-center items-center">
                  <label className="text-muted mb-1 d-block">
                    <small>App End Date</small>
                  </label>
                  <input type="date" value={formateDate(appEndDate)} disabled />
                </div>
              </div>
              <div class="flex justify-around items-center">
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

                  <Select value={appPermitToDo} onChange={handlePermitToDo} renderValue={(selected) => selected.join(", ")} className="grid-100">
                    {displayGroup.map((name) => (
                      <MenuItem key={name.groupname} value={name.groupname}>
                        <Checkbox checked={appPermitToDo.indexOf(name.groupname) > -1} />
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
                <button className="btn btn-primary">Update</button>
              </div>
            </div>
          </form>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default ViewApplication
