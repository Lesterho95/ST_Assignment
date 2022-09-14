const express = require("express")
const cors = require("cors")
const user_model = require("./model/user.model")
const app = express()
const controller = require("./controller/user.controller")
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

const port = process.env.PORT || 8080
app.listen(port, () => console.log(`Server listening on port: ${port}`))

//------------------ USER QUERY -----------------//

//GET all user details
app.get("/users", controller.findAllUser)

//GET one user detail
app.post("/users/getOneUser", controller.findOneUser)

app.post("/users/userLogin", controller.userLogin)

// CREATE user as admin
app.post("/admin/create_user", user_model.createUserAsAdmin)

//EDIT user password
app.post("/user/edit_password", user_model.editUserPassword)

//EDIT user email
app.post("/user/edit_email", user_model.editUserEmail)

//EDIT user status
app.post("/user/edit_status", user_model.editUserStatus)

//EDIT user group
app.post("/user/edit_group", user_model.editUserGroupAsAdmin)

//EDIT user profile
app.post("/user/edit_profile", user_model.editUserProfile)

//----------------- GROUP QUERY ------------------//

//GET all user details
app.get("/groups", user_model.getAllUserGroups)

// CREATE group as admin
app.post("/admin/group", user_model.createGroupAsAdmin)

//EDIT group status
app.post("/admin/edit_status", user_model.editGroupStatusAsAdmin)

// CHECK GROUP
app.post("/checkgroup", controller.checkGroup)

// ---------------- APPLICATION QUERY ----------//
//GET ALL APPLICATION
app.get("/applications", user_model.getAllApplications)

//CREATE APPLICATION
app.post("/create_application", user_model.createApplication)

//GET ONE APPLICATION
app.post("/getOneApplication", user_model.getOneApplication)

//EDIT
app.post("/updateApplication", user_model.updateApplication)
//-------------PLAN QUERY --------------------//

//GET ALL PLAN
app.get("/plans", user_model.getAllPlans)

//CREATE PLAN
app.post("/create_plan", user_model.createPlan)

//GET ONE PLAN
app.post("/getOnePlan", user_model.getOnePlan)

//POST APPACRONYM FOR PLAN
app.post("/getAppAcronymForPlan", user_model.getAppAcronymForPlan)

//UPDATE PLAN
app.post("/updatePlan", user_model.updatePlan)

//-------------TASK QUERY --------------------//

//GET ALL TASKs
app.get("/tasks", user_model.getAllTasks)

//GET TASK STATUS
app.post("/tasks_state", user_model.getAllTasksByState)

//CREATE TASK
app.post("/create_task", user_model.createTask)

//GET ONE TASK
app.post("/tasks_name", user_model.getOneTask)

//GET PLAN NAME FOR TASK
app.post("/getPlanNameForTask", user_model.getPlanNameForTask)

//GET APPLICATION NAME FOR TASK
app.post("/getAllTaskByApplication", user_model.getAllTaskByApplication)

//updateTaskState
app.post("/updateTaskState", user_model.updateTaskState)

//UPDATE TASK STATE
app.post("/updateTask", user_model.updateTask)

//GetAllUserEmail
app.post("/allUserEmail", user_model.getAllUserEmail)
