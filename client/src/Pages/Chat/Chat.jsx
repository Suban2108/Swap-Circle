import React,{ useState } from "react"
import ChatSidebarToggle from "./Component/ChatSidebar"
import ChatListSidebar from "./Component/ChatsList"
import ChatMainWindow from "./Component/ChatMainWindow"

// Mock data
const groups = [
  { id: "g1", name: "Dev Team", lastMessage: "Push your code", time: "2:30 PM", unread: 3, avatar: "DT", online: true },
  { id: "g2", name: "Designers", lastMessage: "Logo finalized!", time: "1:45 PM", unread: 0, avatar: "DS", online: false },
  { id: "g3", name: "Marketing Team", lastMessage: "Campaign launch tomorrow", time: "12:20 PM", unread: 1, avatar: "MT", online: true },
  { id: "g4", name: "QA Squad", lastMessage: "Bug reported in login flow", time: "3:50 PM", unread: 2, avatar: "QA", online: true },
  { id: "g5", name: "HR Group", lastMessage: "Townhall rescheduled", time: "10:10 AM", unread: 0, avatar: "HR", online: false },
  { id: "g6", name: "All Hands", lastMessage: "Slides updated", time: "9:30 AM", unread: 4, avatar: "AH", online: true },
  { id: "g7", name: "Frontend Crew", lastMessage: "Need review on PR #234", time: "11:45 AM", unread: 1, avatar: "FE", online: false },
  { id: "g8", name: "Backend Ops", lastMessage: "Database migration tonight", time: "4:15 PM", unread: 5, avatar: "BO", online: true },
  { id: "g9", name: "Product Managers", lastMessage: "Feedback needed on v2", time: "2:05 PM", unread: 0, avatar: "PM", online: true },
  { id: "g10", name: "Support Team", lastMessage: "Ticket backlog updated", time: "1:00 PM", unread: 3, avatar: "ST", online: false },
  { id: "g11", name: "UX Research", lastMessage: "User interviews start Monday", time: "5:30 PM", unread: 0, avatar: "UX", online: false },
  { id: "g12", name: "Security Cell", lastMessage: "New policy doc shared", time: "6:20 PM", unread: 2, avatar: "SC", online: true },
]

const individuals = [
  { id: "u1", name: "Alice Chen", lastMessage: "Let's talk later", time: "3:15 PM", unread: 2, avatar: "AC", online: true },
  { id: "u2", name: "Bob Wilson", lastMessage: "Check this out!", time: "2:50 PM", unread: 0, avatar: "BW", online: false },
  { id: "u3", name: "Carol Smith", lastMessage: "Thanks for the help", time: "11:30 AM", unread: 0, avatar: "CS", online: true },
  { id: "u4", name: "Daniel Lee", lastMessage: "Meeting starts in 5 mins", time: "9:45 AM", unread: 1, avatar: "DL", online: true },
  { id: "u5", name: "Ella Patel", lastMessage: "Can you review my PR?", time: "10:10 AM", unread: 3, avatar: "EP", online: false },
  { id: "u6", name: "Frank Gomez", lastMessage: "Lunch was great!", time: "1:20 PM", unread: 0, avatar: "FG", online: true },
  { id: "u7", name: "Grace Kim", lastMessage: "Sent the documents", time: "4:05 PM", unread: 0, avatar: "GK", online: false },
  { id: "u8", name: "Henry Zhao", lastMessage: "I'll join the call shortly", time: "12:00 PM", unread: 1, avatar: "HZ", online: true },
  { id: "u9", name: "Isla Moore", lastMessage: "Sounds good!", time: "8:15 AM", unread: 0, avatar: "IM", online: false },
  { id: "u10", name: "Jack Nguyen", lastMessage: "Working on it now", time: "3:55 PM", unread: 2, avatar: "JN", online: true },
  { id: "u11", name: "Kira Davis", lastMessage: "See you tomorrow", time: "5:10 PM", unread: 0, avatar: "KD", online: false },
  { id: "u12", name: "Liam Johnson", lastMessage: "Almost done with the task", time: "6:00 PM", unread: 1, avatar: "LJ", online: true },
]

const Chat = () => {
  const [mode, setMode] = useState("groups")
  const [selectedChat, setSelectedChat] = useState(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileListOpen, setIsMobileListOpen] = useState(false)

  const handleShowMobileMenu = () => {
    setIsMobileMenuOpen(true)
    setIsMobileListOpen(false)
  }

  const handleShowMobileList = () => {
    setIsMobileListOpen(true)
    setIsMobileMenuOpen(false)
  }

  const handleBackToToggle = () => {
    setIsMobileListOpen(false)
    setIsMobileMenuOpen(true)
  }

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  const handleCloseMobileList = () => {
    setIsMobileListOpen(false)
  }

  return (
    <div className="h-screen md:h-[700px] md:mt-16 mt-16 flex bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-orange-950 dark:via-slate-900 dark:to-blue-950 overflow-hidden">

      {/* Mobile Sidebar Toggle */}
      <ChatSidebarToggle
        selected={mode}
        onSelect={setMode}
        isMobileMenuOpen={isMobileMenuOpen}
        onCloseMobileMenu={handleCloseMobileMenu}
      />

      {/* Mobile Chat List */}
      <ChatListSidebar
        list={mode === "groups" ? groups : individuals}
        selectedId={selectedChat?.id}
        onSelect={setSelectedChat}
        mode={mode}
        isMobileListOpen={isMobileListOpen}
        onCloseMobileList={handleCloseMobileList}
        onBackToToggle={handleBackToToggle}
      />

      {/* Main Chat Area */}
      <div className="flex-1 min-w-0">
        <ChatMainWindow
          selectedChat={selectedChat}
          onShowMobileMenu={handleShowMobileMenu}
          onShowMobileList={handleShowMobileList}
        />
      </div>
    </div>
  )
}

export default Chat
