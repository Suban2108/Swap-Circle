import React,{ useState } from "react"
import { Search, ArrowLeft, Plus, UserPlus } from "lucide-react"
import CreateGroupModal from "../Component/CreateGroupModal"
import JoinGroupModal from "../Component/JoinGroupModal"

const ChatList = ({
  list = [],
  onSelect,
  selectedId,
  mode,
  isMobileListOpen = false,
  onCloseMobileList,
  onBackToToggle,
  onCreateGroup,
  onJoinGroup,
  loading = false,
}) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showJoinModal, setShowJoinModal] = useState(false)
  const [actionLoading, setActionLoading] = useState(false)

  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getInitials = (name) =>
    name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)

  const formatTime = (timestamp) => {
    if (!timestamp) return ""
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    return diffInHours < 24
      ? date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
      : date.toLocaleDateString()
  }

  const handleCreateGroup = async (groupData) => {
    if (!onCreateGroup) return
    setActionLoading(true)
    try {
      await onCreateGroup(groupData)
    } finally {
      setActionLoading(false)
    }
  }

  const handleJoinGroup = async (inviteCode) => {
    if (!onJoinGroup) return
    setActionLoading(true)
    try {
      await onJoinGroup(inviteCode)
    } finally {
      setActionLoading(false)
    }
  }

  return (
    <>
      {isMobileListOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 mt-20 z-40 md:hidden"
          onClick={onCloseMobileList}
        />
      )}

      <div
        className={`fixed md:relative top-0 left-0 z-50 md:z-auto h-full w-full sm:w-80 md:w-80 flex-shrink-0 flex flex-col bg-gradient-to-b from-blue-50 to-orange-50 dark:from-blue-950 dark:to-orange-900 border-r border-blue-200 dark:border-blue-800 transform transition-transform duration-300 ease-in-out ${
          isMobileListOpen ? "translate-x-0 mt-15" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="p-4 border-b border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={onBackToToggle}
              className="md:hidden p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-slate-800 dark:text-white flex-1 md:flex-none">
              {mode === "groups" ? "Groups" : "Messages"}
            </h2>

            {mode === "groups" && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setShowJoinModal(true)}
                  className="p-2 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors shadow-lg"
                  title="Join Group"
                >
                  <UserPlus className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setShowCreateModal(true)}
                  className="p-2 rounded-full bg-gradient-to-r from-orange-500 to-blue-500 hover:from-orange-600 hover:to-blue-600 text-white transition-colors shadow-lg"
                  title="Create Group"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-600 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            />
          </div>
        </div>

        {mode === "groups" && (
          <div className="p-3 border-b border-blue-200 dark:border-blue-800 bg-gradient-to-r from-orange-50 to-blue-50 dark:from-orange-950 dark:to-blue-950">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setShowCreateModal(true)}
                className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl transition-all duration-200 hover:scale-105 shadow-md"
              >
                <Plus className="w-4 h-4" />
                <span className="text-sm font-medium">Create</span>
              </button>
              <button
                onClick={() => setShowJoinModal(true)}
                className="flex items-center justify-center space-x-2 p-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-xl transition-all duration-200 hover:scale-105 shadow-md"
              >
                <UserPlus className="w-4 h-4" />
                <span className="text-sm font-medium">Join</span>
              </button>
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-500"></div>
            </div>
          ) : filteredList.length === 0 ? (
            <div className="text-center py-8 text-slate-500 dark:text-slate-400">
              {searchTerm ? (
                "No results found"
              ) : (
                <div className="space-y-2">
                  <p>No {mode} available</p>
                  {mode === "groups" && (
                    <>
                      <button
                        onClick={() => setShowCreateModal(true)}
                        className="text-blue-500 hover:text-blue-600 text-sm underline"
                      >
                        Create your first group
                      </button>
                      <p className="text-xs">or</p>
                      <button
                        onClick={() => setShowJoinModal(true)}
                        className="text-orange-500 hover:text-orange-600 text-sm underline"
                      >
                        Join an existing group
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          ) : (
            filteredList.map((item) => (
              <div
                key={item._id}
                onClick={() => {
                  onSelect(item)
                  if (onCloseMobileList) onCloseMobileList()
                }}
                className={`p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] touch-manipulation ${
                  selectedId === item._id
                    ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-[1.02]"
                    : "hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-white hover:shadow-md bg-white/50 dark:bg-slate-800/50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                      selectedId === item._id
                        ? "bg-white/20 text-white"
                        : "bg-gradient-to-br from-blue-500 to-orange-500 text-white"
                    } relative flex-shrink-0`}
                  >
                    {item.avatar ? (
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-full h-full rounded-full object-cover"
                        onError={(e) => {
                          e.target.style.display = "none"
                          const next = e.target.nextElementSibling
                          if (next) next.textContent = getInitials(item.name)
                        }}
                      />
                    ) : (
                      getInitials(item.name)
                    )}
                    {item.online && (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="font-semibold truncate text-sm sm:text-base">{item.name}</div>
                      <div className="text-xs opacity-70 flex-shrink-0 ml-2">{formatTime(item.timestamp)}</div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm opacity-70 truncate pr-2">{item.lastMessage || "No messages yet"}</div>
                      {item.unread > 0 && (
                        <div
                          className={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-bold ${
                            selectedId === item._id ? "bg-white/20 text-white" : "bg-red-500 text-white"
                          }`}
                        >
                          {item.unread}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <CreateGroupModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreateGroup={handleCreateGroup}
        loading={actionLoading}
      />

      <JoinGroupModal
        isOpen={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        onJoinGroup={handleJoinGroup}
        loading={actionLoading}
      />
    </>
  )
}

export default ChatList
