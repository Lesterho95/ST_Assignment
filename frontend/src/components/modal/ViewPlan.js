import React, { useEffect, useState } from "react"
import { Modal } from "@mui/material"

import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Form from "react-bootstrap/Form"
import { ToastContainer, toast } from "react-toastify"
import userService from "../../services/user.service"

function ViewPlan(props) {
  const [open, setOpen] = useState(false)
  const [planMvpName, setPlanMvpName] = useState("")
  const [planStartDate, setPlanStartDate] = useState("")
  const [planEndDate, setPlanEndDate] = useState("")
  const [planAppAcronym, setPlanAppAcronym] = useState("")
  const [planColor, setPlanColor] = useState("")
  const [editColor, setEditColor] = useState("")
  const [newColor, setNewColor] = useState("")

  const handleOpen = () => {
    setOpen(true)
    getOnePlan()
  }
  const handleClose = () => setOpen(false)

  const formateDate = (date) => {
    return JSON.stringify(date).split("T")[0].slice(1)
  }

  const getOnePlan = () => {
    let planName = { plan_mvp_name: props.planName }
    userService.getOnePlan(planName).then((res) => {
      setPlanMvpName(res.result.plan_mvp_name)
      setPlanStartDate(res.result.plan_startDate)
      setPlanEndDate(res.result.plan_endDate)
      setPlanAppAcronym(res.result.plan_app_acronym)
      setPlanColor(res.result.color)
    })
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
    p: 1,
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    const plan = {
      plan_mvp_name: planMvpName,
      plan_startDate: formateDate(planStartDate),
      plan_endDate: formateDate(planEndDate),
      plan_app_acronym: planAppAcronym,
      color: editColor,
    }
    userService.updatePlan(plan).then((res) => {
      if (res.result == true) {
        toast.success("Update Sucessfully")
        setPlanColor(editColor)
        props.applicationPlan()
      } else {
        toast.error("Unsuccessful Update")
      }
    })
  }

  return (
    <div>
      <div>
        <Button style={{ color: props.plancolor }} onClick={handleOpen}>
          View Plan
        </Button>
      </div>
      {/* <Button onClick={handleOpen}>View Plan</Button> */}
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            View Plan
          </Typography>
          <form onSubmit={handleUpdate}>
            <div>
              <div class="flex justify-center items-center">
                <div className="form-group flex flex-col justify-center items-center">
                  <label className="text-muted mb-1 d-block">
                    <small>Plan MVP Name</small>
                  </label>
                  <input value={planMvpName} disabled />
                </div>
              </div>
              <div class="flex justify-center items-center">
                <div className="form-group flex flex-col justify-center items-center">
                  <label className="text-muted mb-1 d-block">
                    <small>Plan Start Date</small>
                  </label>
                  <input type="date" value={formateDate(planStartDate)} disabled />
                </div>
              </div>
              <div class="flex justify-center items-center">
                <div className="form-group flex flex-col justify-center items-center">
                  <label className="text-muted mb-1 d-block">
                    <small>Plan End Date</small>
                  </label>
                  <input type="date" value={formateDate(planEndDate)} disabled />
                </div>
              </div>
              <div class="flex justify-center items-center">
                <div className="form-group flex flex-col justify-center items-center">
                  <label className="text-muted mb-1 d-block">
                    <small>Plan App Acronym</small>
                  </label>
                  <input value={planAppAcronym} disabled />
                </div>
              </div>
              <div className="flex justify-center items-center">
                <div className="form-group flex flex-col justify-center items-center w-20">
                  <Form.Control
                    value={planColor}
                    type="color"
                    onChange={(e) => {
                      setEditColor(e.target.value)
                    }}
                  />
                </div>
              </div>

              <div class="form-group flex flex-col justify-center items-center"> {props.EditPlan == true && <button className="btn btn-primary">Update</button>}</div>
            </div>
          </form>
        </Box>
      </Modal>
      <ToastContainer />
    </div>
  )
}

export default ViewPlan
