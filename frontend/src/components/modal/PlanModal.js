import { Modal } from "@mui/material"
import React, { useEffect, useState } from "react"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import userService from "../../services/user.service"
import { ToastContainer, toast } from "react-toastify"
import Form from "react-bootstrap/Form"
import "react-toastify/dist/ReactToastify.css"

function PlanModal(props) {
  const [open, setOpen] = useState(false)
  const [planMvpName, setPlanMvpName] = useState("")
  const [planStartDate, setPlanStartDate] = useState("")
  const [planEndDate, setPlanEndDate] = useState("")
  const [color, setColor] = useState("")

  const handleOpen = (e) => {
    e.preventDefault()
    if (localStorage.getItem("user_group").split(",").includes("ProjectManager")) {
      setOpen(true)
    } else {
      toast.error("You are not authorised to create Plan!")
    }
  }
  const handleClose = () => setOpen(false)

  let planAppAcronym = localStorage.getItem("appacronym")

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

  const handleCreate = (e) => {
    e.preventDefault()
    const plan = {
      plan_mvp_name: planMvpName,
      plan_startDate: planStartDate,
      plan_endDate: planEndDate,
      plan_app_acronym: planAppAcronym,
      color: color,
    }
    console.log(plan)
    userService.createPlan(plan).then((res) => {
      if (res.result == true) {
        setPlanMvpName("")
        setPlanStartDate("")
        setPlanEndDate("")
        toast.success("Plan Successfully created")
        props.applicationPlan()
      } else {
        toast.error("Error in Creation of Plan")
      }
    })
  }
  return (
    <div>
      <div class="text-center pt-10">
        <Button onClick={handleOpen}>Create Plan</Button>
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create
          </Typography>
          <form onSubmit={handleCreate}>
            <div class="grid grid-cols-3">
              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1">
                  <small>Plan MVP Name</small>
                </label>
                <input
                  autoFocus
                  required
                  class="flex justify-center form-control form-control-title w-50"
                  type="text"
                  value={planMvpName}
                  autoComplete="off"
                  onChange={(e) => {
                    setPlanMvpName(e.target.value)
                  }}
                />
              </div>

              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>Start Date</small>
                </label>
                <input
                  type="date"
                  value={planStartDate}
                  onChange={(e) => {
                    setPlanStartDate(e.target.value)
                  }}
                />
              </div>
              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>End Date</small>
                </label>
                <input
                  type="date"
                  value={planEndDate}
                  onChange={(e) => {
                    setPlanEndDate(e.target.value)
                  }}
                />
              </div>
              <div className="form-group flex flex-col justify-center items-center">
                <label className="text-muted mb-1 d-block">
                  <small>
                    Plan App Acronym: <span class="text-red-800">{planAppAcronym}</span>
                  </small>
                </label>
              </div>
              <div className="form-group flex flex-col justify-center items-center w-20">
                <Form.Control
                  type="color"
                  onChange={(e) => {
                    setColor(e.target.value)
                  }}
                />
              </div>
              <div class="form-group flex flex-col justify-center items-center">
                <button className="btn btn-primary">Create</button>
              </div>
            </div>
            <ToastContainer />
          </form>
        </Box>
      </Modal>
    </div>
  )
}

export default PlanModal
