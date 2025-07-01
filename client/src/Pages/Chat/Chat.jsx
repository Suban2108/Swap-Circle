import React,{ useEffect, useState } from "react"
import ChatContainer from "./Component/chatContainer"
import { useAuth } from "../../context/authContext"

export default function ChatPage() {
  const [userId, setUserId] = useState("")
  const [token, setToken] = useState("")
  const [apiUrl, setApiUrl] = useState("")
  const { PORT } = useAuth() 

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId")
    const storedToken = localStorage.getItem("token")
    const storedApiUrl = PORT

    if (storedUserId && storedToken) {
      setUserId(storedUserId)
      setToken(storedToken)
      setApiUrl(storedApiUrl)
    } else {
      window.location.href = "/login"
    }
  }, [])

  if (!userId || !token) {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  return <ChatContainer userId={userId} apiUrl={apiUrl} token={token} />
}
