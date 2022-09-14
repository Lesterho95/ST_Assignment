import { localStorage, useState } from "react"
import axios from "axios"
const API_URL = "http://localhost:8080/"

class UserService {
  //---------------- USER ------------------//
  findAllUser() {
    return axios.get(API_URL + "users").then((res) => {
      return res.data
    })
  }

  findOneUser(user) {
    return axios.post(API_URL + "users/getOneUser", user).then((res) => {
      return res.data
    })
  }

  userLogin(user) {
    return axios.post(API_URL + "users/userLogin", user).then((res) => {
      return res.data
    })
  }

  createUser(user) {
    return axios.post(API_URL + "admin/create_user", user).then((res) => {
      return res.data
    })
  }

  editUserPassword(user) {
    return axios.post(API_URL + "user/edit_password", user).then((res) => {
      return res.data
    })
  }

  editUserEmail(user) {
    return axios.post(API_URL + "user/edit_email", user).then((res) => {
      return res.data
    })
  }

  editUserStatus(status) {
    return axios.post(API_URL + "user/edit_status", status).then((res) => {
      return res.data
    })
  }

  editUserProfile(profile) {
    return axios.post(API_URL + "user/edit_profile", profile).then((res) => {
      return res.data
    })
  }

  checkGroup(user) {
    return axios.post(API_URL + "checkgroup", user).then((res) => {
      return res.data
    })
  }

  // -------------------GROUP ---------------------//
  createUserGroup(group) {
    return axios.post(API_URL + "admin/group", group).then((res) => {
      return res.data
    })
  }

  getAllUserGroup() {
    return axios.get(API_URL + "groups").then((res) => {
      return res.data
    })
  }

  editGroupStatus(status) {
    return axios.post(API_URL + "admin/edit_status", status).then((res) => {
      return res.data
    })
  }

  // --------------- APPLICATION --------------//

  getAllApplication() {
    return axios.get(API_URL + "applications").then((res) => {
      return res.data
    })
  }

  createApplication(status) {
    return axios.post(API_URL + "create_application", status).then((res) => {
      return res.data
    })
  }

  getOneApplication(app_acronym) {
    return axios.post(API_URL + "getOneApplication", app_acronym).then((res) => {
      return res.data
    })
  }

  updateApplication(application) {
    return axios.post(API_URL + "updateApplication", application).then((res) => {
      return res.data
    })
  }

  // --------------- PLAN --------------//

  getAllPlan() {
    return axios.get(API_URL + "plans").then((res) => {
      console.log("view all plans", res.data)
      return res.data
    })
  }

  createPlan(status) {
    return axios.post(API_URL + "create_plan", status).then((res) => {
      console.log("create plan", res.data)
      return res.data
    })
  }

  getOnePlan(plan_mvp_name) {
    return axios.post(API_URL + "getOnePlan", plan_mvp_name).then((res) => {
      console.log("get one plan", res.data)
      return res.data
    })
  }

  getAppAcronymForPlan(app_acronym) {
    return axios.post(API_URL + "getAppAcronymForPlan", app_acronym).then((res) => {
      return res.data
    })
  }

  updatePlan(plan) {
    console.log("wakakaka", plan)
    return axios.post(API_URL + "updatePlan", plan).then((res) => {
      return res.data
    })
  }

  // --------------- TASK --------------//

  getAllTasks() {
    return axios.get(API_URL + "tasks").then((res) => {
      console.log("view all task", res.data)
      return res.data
    })
  }

  getAllTasksByState(task_state) {
    return axios.post(API_URL + "tasks_state", task_state).then((res) => {
      return res.data
    })
  }

  getOneTask(taskname) {
    return axios.post(API_URL + "tasks_name", taskname).then((res) => {
      return res.data
    })
  }

  createTask(status) {
    return axios.post(API_URL + "create_task", status).then((res) => {
      return res.data
    })
  }

  getPlanNameForTask(plan_name) {
    return axios.post(API_URL + "getPlanNameForTask", plan_name).then((res) => {
      return res.data
    })
  }

  getAllTaskByApplication(app_name) {
    return axios.post(API_URL + "getAllTaskByApplication", app_name).then((res) => {
      return res.data
    })
  }
  updateTaskState(state) {
    return axios.post(API_URL + "updateTaskState", state).then((res) => {
      return res.data
    })
  }

  updateTask(state) {
    return axios.post(API_URL + "updateTask", state).then((res) => {
      return res.data
    })
  }

  sendEmail(email) {
    console.log("what is email", email)
    return axios.post(API_URL + "allUserEmail", email).then((res) => {
      return res.data
    })
  }
}

export default new UserService()
