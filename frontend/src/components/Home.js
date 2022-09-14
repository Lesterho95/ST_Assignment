import React, { useEffect } from "react"

function Home() {
  const username = localStorage.getItem("username")
  return (
    <div class="homepage">
      <div
        class="content-center
          justify-center
          flex text-xl mt-10"
      >
        Welcome {username}
      </div>
    </div>
  )
}

export default Home
