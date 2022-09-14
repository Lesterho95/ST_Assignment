// import React, { useEffect, useState } from "react"
// import "../App.css"
// import { useNavigate } from "react-router-dom"
// import userService from "../services/user.service"
// function Login() {
//   const [username, setUsername] = useState("")
//   const [password, setPassword] = useState("")
//   const navigate = useNavigate()

//   const SignIn = (e) => {
//     e.preventDefault()
//     const user = {
//       username: username,
//       password: password,
//     }
//     userService.findOneUser(user).then((res) => {
//       console.log("the result", res)
//       if (res.result) {
//         console.log("admin account", res.result.user_group)
//         console.log("admin account", res.result.user_group == "admin")

//         console.log("user object", res.result)
//         navigate("/home")
//         console.log(res.result.username)
//       } else {
//         console.log(res.message)
//       }
//     })
//   }

//   return (
//     <>
//       <form onSubmit={SignIn} className="form">
//         <h1>Sign In</h1>

//         <label>Username</label>
//         <input
//           type="text"
//           name="username"
//           onChange={(e) => {
//             setUsername(e.target.value)
//           }}
//         ></input>
//         <label>Password</label>
//         <input
//           name="password"
//           type="password"
//           required
//           onChange={(e) => {
//             setPassword(e.target.value)
//           }}
//         ></input>
//         <button>Sign in</button>
//       </form>
//     </>
//   )
// }

// export default Login
