const User = require("../model/user.model")
const bcrypt = require("bcrypt")

const findAllUser = (req, response) => {
  User.getAllUsers(req.body, (data) => {
    response.send(data)
  })
}

const findOneUser = async (req, response) => {
  User.getOneUser(req.body, (data) => {
    if (data.message === "Not Found") {
      response.status(404).send({ message: "Invalid User", result: data.result })
    } else if (req.body.password != data.result.password) {
      response.send({ message: "Invalid Password", result: data.result })
    } else {
      response.send({ message: "Found", result: data.result })
    }
  })
}

const userLogin = (req, response) => {
  User.getOneUser(req.body, (data) => {
    if (data.message == "Not Found") {
      response.status(404).send({ message: "User Not Found", result: null })
    } else {
      if (data.result == null) {
        response.send(data)
      } else {
        bcrypt.compare(req.body.password, data.result.password).then((doMatch) => {
          if (doMatch) {
            console.log("found?")
            response.send({ message: "Found", result: data.result, iAmAdmin: data.iAmAdmin })
          } else {
            console.log("not found")
            response.send({ message: "Invalid Password", result: null })
          }
        })
      }
    }
  })
}
const checkGroup = (req, response) => {
  User.getOneUser(req.body, (data) => {
    console.log("user data", data)
    if (data.result.length == 0) {
      response.send({ result: false })
    } else {
      if (data.result.user_group.length > 1) {
        var userGroup = data.result.user_group.split(",")
        if (userGroup.includes(req.body.user_group)) {
          response.send({ result: true })
        } else {
          response.send({ result: false })
        }
      } else {
        //When there's only 1 usergroup
        if (req.body.user_group == data.result.user_group) {
          response.send({ result: true })
        } else {
          response.send({ result: false })
        }
      }
    }
  })
}

module.exports = { findAllUser, findOneUser, userLogin, checkGroup }
