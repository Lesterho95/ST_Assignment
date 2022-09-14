import { useState, useEffect, useContext } from "react"
import userService from "./services/user.service"
import { BrowserRouter, Routes, Route } from "react-router-dom"

//Components
import Home from "./components/Home"
import Header from "./components/Header"
import CreateUser from "./components/CreateUser"
import LoginContext from "./components/LoginContext"
import GroupManagement from "./components/GroupManagement"
import MyProfile from "./components/MyProfile"
import UserManagement from "./components/UserManagenment"
import UserProfile from "./components/UserProfile"
import EditEmail from "./components/EditEmail"
import EditPassword from "./components/EditPassword"
import EditUser from "./components/EditUser"
import Application from "./components/Application"
// import ViewApplication from "./components/ViewApplication"
import ApplicationModal from "./components/modal/ApplicationModal"
import KanBanBoard from "./components/KanBanBoard"

function App() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("userToken")))
  const [isAdmin, setIsAdmin] = useState(false)

  // when there is a params in the route, use Route Path
  // just normal path /home... use Route exact path
  return (
    <LoginContext.Provider value={{ setLoggedIn, setIsAdmin }}>
      <BrowserRouter>
        <Header loggedIn={loggedIn} />
        <Routes>
          {/* <Route path="/" element={<Login />} /> */}
          <Route path="/groupmanagement" element={<GroupManagement />} />
          <Route path="/usermanagement" element={<UserManagement />} />
          <Route path="/myprofile" element={<MyProfile />} />
          <Route path="/userprofile" element={<UserProfile />} />
          <Route path="/editemail" element={<EditEmail />} />
          <Route path="/editpassword" element={<EditPassword />} />
          <Route path="/edituser" element={<EditUser />} />
          <Route path="/home" element={<Home />} />
          <Route path="/createuser" element={<CreateUser />} />
          <Route path="/application" element={<Application />} />
          {/* <Route path="/viewapplication" element={<ViewApplication />} /> */}
          <Route path="/applicationmodal" element={<ApplicationModal />} />
          <Route path="/kanbanboard" element={<KanBanBoard />} />
        </Routes>
      </BrowserRouter>
    </LoginContext.Provider>
  )
}

export default App
