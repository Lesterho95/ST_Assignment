const sql = require("../db")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const checkgroup = require("./checkGroup")

// ----------------- FOR USER ----------//

const getAllUsers = (req, response) => {
  sql.query("SELECT * FROM users", (err, result) => {
    if (result.length == 0) {
      response({ message: "No such user", result: false })
    } else {
      response({ message: "Found", result: result })
    }
  })
}

const getOneUser = (req, response) => {
  sql.query(`SELECT * FROM users where username='${req.username}'`, (err, result) => {
    // for SELECT, no error. Only will have result
    if (result.length == 0) {
      response({ message: "Not Found", result: result })
    }
    if (result.length) {
      response({ message: "User Found", result: result[0] })
    }
  })
}

//CREATE user
const createUserAsAdmin = async (req, response) => {
  req.body.password = await bcrypt.hash(req.body.password, 10)
  sql.query(`INSERT INTO users (username, password, email, user_group, isAdmin) values ('${req.body.username}', '${req.body.password}', '${req.body.email}', '${req.body.user_group}', '${req.body.isAdmin ? 1 : 0}')`, (err, result) => {
    if (err) {
      response.send({ message: err.sqlMessage, result: false })
    } else {
      response.send({ message: "User Created", result: true })
    }
  })
}

//UPDATE user password
const editUserPassword = async (req, response) => {
  if (req.body.password != null) {
    req.body.password = await bcrypt.hash(req.body.password, 10)
  }
  sql.query(`UPDATE users SET password='${req.body.password}' WHERE username='${req.body.username}'`, (err, result) => {
    if (err) {
      console.log("error: ", err)
      response.status(400).send({ message: err.sqlMessage, result: null })
      return
    }
    if (result.affectedRows == 0) {
      response.status(404).send({ message: "Invalid user", result: null })
      return
    } else {
      response.send({ message: "Password has been successfully changed" })
    }
  })
}

//UPDATE user email
const editUserEmail = (req, response) => {
  sql.query(`UPDATE users SET email='${req.body.email}' WHERE username='${req.body.username}'`, (err, result) => {
    console.log("my error", err)
    console.log("my result", result)
    if (err) {
      console.log("error: ", err)
      response.status(400).send({ message: err.sqlMessage, result: null })
      return
    }
    if (result.affectedRows == 0) {
      response.status(404).send({ message: "Invalid user", result: null })
      return
    } else {
      response.send({ message: "Email has been successfully changed", result: result })
    }
  })
}

//UPDATE user status
const editUserStatus = (req, response) => {
  sql.query(`UPDATE users SET status='${req.body.status}' WHERE username='${req.body.username}'`, (err, result) => {
    console.log("my error", err)
    console.log("my result", result)
    if (err) {
      console.log("error: ", err)
      response.status(400).send({ message: err.sqlMessage, result: null })
      return
    }
    if (result.affectedRows == 0) {
      response.status(404).send({ message: "Invalid user", result: null })
      return
    } else {
      response.send({ message: "Status has been successfully changed" })
    }
  })
}

// UPDATE user group
const editUserGroupAsAdmin = (req, response) => {
  sql.query(`UPDATE users SET user_group='${req.body.user_group}' WHERE username='${req.body.username}'`, (err, result) => {
    if (err) {
      response.status(400).send({ message: err.sqlMessage, result: false })
      return
    }
    if (result.affectedRows == 0) {
      response.status(404).send({ message: "Invalid user", result: true })
      return
    } else {
      response.send({ message: "Group has been successfully changed" })
    }
  })
}

const editUserProfile = async (req, response) => {
  if (req.body.password == null) {
    if (req.body.user_group) {
      query = `update users set email ='${req.body.email}',user_group= '${req.body.user_group}' where username = '${req.body.username}' `
    } else {
      query = `update users set email ='${req.body.email}' where username = '${req.body.username}' `
    }
  } else {
    if (req.body.user_group) {
      req.body.password = await bcrypt.hash(req.body.password, 10)
      query = `update users set email ='${req.body.email}',password= '${req.body.password}',user_group= '${req.body.user_group}' where username = '${req.body.username}' `
    } else {
      req.body.password = await bcrypt.hash(req.body.password, 10)
      query = `update users set email ='${req.body.email}',password= '${req.body.password}' where username = '${req.body.username}' `
    }
  }
  sql.query(query, (err, result) => {
    if (err) {
      response.send({ message: err, result: null })
      // return;
    } else {
      response.send({
        message: "Profile updated successfully",
        result: true,
      })
    }
  })
}

// ------------- FOR GROUP -----------------//

const getAllUserGroups = (req, response) => {
  sql.query("SELECT * FROM user_groups", (err, result) => {
    if (err) {
      respond.status(404).send({ message: "Invalid" })
    } else {
      response.send({ message: "Found", result })
    }
  })
}

//CREATE group
const createGroupAsAdmin = (req, response) => {
  console.log("the request", req.body)
  sql.query(`INSERT INTO user_groups(groupname) values ('${req.body.groupname}')`, (err, result) => {
    if (err) {
      response.send({ message: err.sqlMessage, result: false })
    } else {
      response.send({ message: "Group Created", result: true })
    }
  })
}

//EDIT group status
const editGroupStatusAsAdmin = (req, response) => {
  sql.query(`UPDATE user_groups SET status='${req.body.status}' WHERE groupname='${req.body.groupname}'`, (err, result) => {
    console.log("the result", result)
    if (err) {
      response.status(400).send({ message: err.sqlMessage, result: false })
      return
    } else {
      response.send({ message: "Status has been successfully changed", result: true })
    }
  })
}

// ------------------APPLICATION ------------------//

const getAllApplications = (req, response) => {
  sql.query("SELECT * FROM application", (err, result) => {
    if (result.length == 0) {
      response.send({ message: "No such application", result: false })
    } else {
      response.send({ message: "Application Found", result: result })
    }
  })
}

const createApplication = (req, response) => {
  sql.query("INSERT INTO application (app_acronym, app_description, app_rnumber, app_startDate, app_endDate, app_permit_Create, app_permit_Open, app_permit_toDoList, app_permit_Doing, app_permit_Done) values(?,?,?,?,?,?,?,?,?,?)", [req.body.app_acronym, req.body.app_description, req.body.app_rnumber, req.body.app_startDate, req.body.app_endDate, req.body.app_permit_Create, req.body.app_permit_Open, req.body.app_permit_toDoList, req.body.app_permit_Doing, req.body.app_permit_Done], (err, result) => {
    if (err) {
      response.send({ message: err.sqlMessage, result: false })
    } else {
      response.send({ message: "Application Created", result: true })
    }
  })
}

const getOneApplication = (req, response) => {
  sql.query(`SELECT * FROM application where app_acronym='${req.body.app_acronym}'`, (err, result) => {
    // for SELECT, no error. Only will have result
    if (result.length == 0) {
      response.send({ message: "Not Found", result: result })
    }
    if (result.length) {
      response.send({ message: "One Application Found", result: result[0] })
    }
  })
}

const updateApplication = (req, response) => {
  console.log("lalalalla", req.body)
  sql.query(`UPDATE application set app_description='${req.body.app_description}',app_startDate='${req.body.app_startDate}',app_endDate='${req.body.app_endDate}', app_permit_Open='${req.body.app_permit_Open}', app_permit_toDoList='${req.body.app_permit_toDoList}',app_permit_Doing='${req.body.app_permit_Doing}',app_permit_Done='${req.body.app_permit_Done}',app_permit_Create='${req.body.app_permit_Create}' WHERE app_acronym='${req.body.app_acronym}'`, (err, result) => {
    console.log("result", result)
    console.log("what is err", err)
    if (err) {
      response.send({ message: "Invalid Update", result: false })
    } else {
      response.send({ message: "Update Successful", result: true })
    }
  })
}

// -------------- PLAN -------------------//

const createPlan = (req, response) => {
  console.log("the req", req)
  sql.query(`INSERT INTO plan (plan_mvp_name, plan_startDate, plan_endDate, plan_app_acronym, color) values ('${req.body.plan_mvp_name}', '${req.body.plan_startDate}', '${req.body.plan_endDate}', '${req.body.plan_app_acronym}', '${req.body.color}')`, (err, result) => {
    if (err) {
      response.send({ message: err.sqlMessage, result: false })
    } else {
      response.send({ message: "Plan Created", result: true })
    }
  })
}

const getAllPlans = (req, response) => {
  sql.query("SELECT * FROM plan", (err, result) => {
    if (result.length == 0) {
      response.send({ message: "No such plan", result: false })
    } else {
      response.send({ message: "Plan Found", result: result })
    }
  })
}

const getOnePlan = (req, response) => {
  sql.query(`SELECT * FROM plan where plan_mvp_name='${req.body.plan_mvp_name}'`, (err, result) => {
    // for SELECT, no error. Only will have result
    if (result.length == 0) {
      response.send({ message: "Not Found", result: result })
    }
    if (result.length) {
      response.send({ message: "One Plan Found", result: result[0] })
    }
  })
}

const getAppAcronymForPlan = (req, response) => {
  sql.query(`SELECT * FROM plan where plan_app_acronym='${req.body.plan_app_acronym}'`, (err, result) => {
    // for SELECT, no error. Only will have result
    if (result.length == 0) {
      response.send({ message: "Not Found", result: result })
    }
    if (result.length) {
      response.send({ message: "Plan that is with app is Found", result: result })
    }
  })
}

const updatePlan = (req, response) => {
  sql.query(`UPDATE plan set plan_startDate='${req.body.plan_startDate}', plan_endDate='${req.body.plan_endDate}', plan_app_acronym='${req.body.plan_app_acronym}', color='${req.body.color}' where plan_mvp_name='${req.body.plan_mvp_name}'`, (err, result) => {
    if (err) {
      response.send({ message: "Update Unsuccessful", result: false })
    } else {
      response.send({ message: "Update Successfully", result: true })
    }
  })
}

// ---------------TASK ----------------//
const createTask = (req, response) => {
  console.log("creating task", req.body)
  sql.query(`SELECT app_rnumber from application where app_acronym=?`, [req.body.task_app_acronym], function (err, rnum, fields) {
    sql.query(`SELECT COUNT(*) AS count FROM task WHERE task_app_acronym=?`, [req.body.task_app_acronym], function (err, count, fields) {
      var id = req.body.task_app_acronym + "_" + (rnum[0].app_rnumber + count[0].count)
      sql.query("INSERT INTO task (task_name, task_description, task_notes, task_id, task_plan, task_app_acronym,task_creator, task_owner, task_createDate) values(?,?,?,?,?,?,?,?,?)", [req.body.task_name, req.body.task_description, req.body.task_notes, id, req.body.task_plan, req.body.task_app_acronym, req.body.task_creator, req.body.task_owner, req.body.task_createDate], (err, result) => {
        if (err) {
          console.log("what is error", err)
          response.send({ message: err.sqlMessage, result: false })
        } else {
          response.send({ message: "Task Created", result: true })
        }
      })
    })
  })
}

const getAllTasks = (req, response) => {
  sql.query("SELECT * FROM task ", (err, result) => {
    if (result.length == 0) {
      response.send({ message: "No such Task", result: false })
    } else {
      response.send({ message: "Task Found", result: result })
    }
  })
}

const getAllTasksByState = (req, response) => {
  sql.query(`SELECT * FROM task where task_state='${req.body.task_state}' && task_app_acronym='${req.body.task_app_acronym}'`, (err, result) => {
    if (result.length == 0) {
      response.send({ message: "No such Task", result: false })
    } else {
      response.send({ message: "Task status Found", result: result })
    }
  })
}

const getOneTask = (req, response) => {
  sql.query(`SELECT * FROM task where task_name='${req.body.task_name}'`, (err, result) => {
    // for SELECT, no error. Only will have result
    if (result.length == 0) {
      response.send({ message: "Not Found", result: result })
    }
    if (result.length) {
      response.send({ message: "One Task Found", result: result[0] })
    }
  })
}

const getAllTaskByApplication = (req, response) => {
  sql.query(`SELECT * FROM task where task_app_acronym='${req.body.task_app_acronym}'`, (err, result) => {
    // for SELECT, no error. Only will have result
    if (result.length == 0) {
      response.send({ message: "Not Found", result: result })
    }
    if (result.length) {
      response.send({ message: "Task by application Found", result: result[0] })
    }
  })
}

const getPlanNameForTask = (req, response) => {
  sql.query(`SELECT * FROM task where task_app_acronym='${req.body.task_app_acronym}'`, (err, result) => {
    // for SELECT, no error. Only will have result
    if (result.length == 0) {
      response.send({ message: "Not Found", result: result })
    }
    if (result.length) {
      response.send({ message: "task that is with plan is Found", result: result })
    }
  })
}

//UPDATE TASK STATE
const updateTaskState = (req, response) => {
  var updateNotes = req.body.task_notes + "\n\n" + req.body.oldNotes
  sql.query(`UPDATE task SET task_state=?, task_notes=?, task_owner = ?,task_notes =? WHERE task_id=?`, [req.body.task_state, req.body.task_notes, req.body.task_owner, updateNotes, req.body.task_id], (err, result) => {
    if (err) {
      console.log("error: ", err)
      response.send({ message: err.sqlMessage, result: null })
      return
    } else {
      response.send({ message: "Task state successfully updated", result: result })
    }
  })
}

//UPDATE TASK
const updateTask = (req, response) => {
  var updateNotes = req.body.task_notes + "\n\n" + req.body.oldNotes
  sql.query(`UPDATE task SET task_name=?, task_plan=?, task_notes=?, task_owner=? WHERE task_id=?`, [req.body.task_name, req.body.task_plan, updateNotes, req.body.task_owner, req.body.task_id], (err, result) => {
    if (err) {
      response.send({ message: err.sqlMessage, result: null })
      return
    } else {
      response.send({ message: "Task successfully updated", result: result })
    }
  })
}

const getAllUserEmail = (req, response) => {
  sql.query(`SELECT email from users where user_group like '%ProjectLead%'`, (err, result, data) => {
    if (err) {
      response.send({ result: false })
    } else {
      if (result.length) {
        response.send({ message: "Found", result: result })
        async function main() {
          // Generate test SMTP service account from ethereal.email
          // Only needed if you don't have a real mail account for testing
          let testAccount = await nodemailer.createTestAccount()

          // create reusable transporter object using the default SMTP transport
          var transporter = nodemailer.createTransport({
            host: "smtp.mailtrap.io",
            port: 2525,
            auth: {
              user: "3c67cd8dce9824",
              pass: "deb4d52e514dd6",
            },
          })

          // send mail with defined transport object
          let info = await transporter.sendMail({
            from: `${req.body.email}`, // sender address
            to: `${result[0].email}`, // list of receivers
            subject: `Task ${req.body.task_id} Completed ✔`, // Subject line
            text: `${req.body.username} has finish the task on '${new Date().toUTCString()}'`, // plain text body
            html: `${req.body.username} has finish the task on '${new Date().toUTCString()}'`, // html body
          })

          console.log("Message sent: %s", info.messageId)
          // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

          // Preview only available when sending through an Ethereal account
          console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info))
          // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        }

        main().catch(console.error)
      } else {
        response.send({ message: "Not Found", result: false })
      }
    }
  })
}

module.exports = { getAllUsers, createUserAsAdmin, getOneUser, editUserPassword, editUserEmail, editUserStatus, editUserGroupAsAdmin, createGroupAsAdmin, editGroupStatusAsAdmin, getAllUserGroups, editUserProfile, getAllApplications, createApplication, createPlan, getAllPlans, createTask, getAllTasksByState, getOneApplication, getOnePlan, getOneTask, getAppAcronymForPlan, getPlanNameForTask, getAllTasks, getAllTaskByApplication, updateTaskState, updateTask, updateApplication, getAllUserEmail, updatePlan }
