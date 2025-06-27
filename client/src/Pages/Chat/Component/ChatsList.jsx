import React,{ useState } from "react"
import { Search, ArrowLeft } from "lucide-react"

const ChatListSidebar = ({
  list = [],
  onSelect,
  selectedId,
  mode,
  isMobileListOpen = false,
  onCloseMobileList,
  onBackToToggle,
}) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredList = list.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileListOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onCloseMobileList}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:relative top-0 left-0 z-50 md:z-auto
          h-full w-full sm:w-80 md:w-80 flex-shrink-0
          flex flex-col bg-gradient-to-b from-blue-50 to-orange-50 
          dark:from-blue-950 dark:to-orange-900 
          border-r border-blue-200 dark:border-blue-800
          transform transition-transform duration-300 ease-in-out
          ${isMobileListOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-4 border-b border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between mb-3">
            {/* Mobile Back Button */}
            <button
              onClick={onBackToToggle}
              className="md:hidden p-2 rounded-full hover:bg-blue-100 dark:hover:bg-slate-700 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <h2 className="text-lg font-bold text-slate-800 dark:text-white flex-1 md:flex-none">
              {mode === "groups" ? "Groups" : "Messages"}
            </h2>
          </div>

          {/* Search */}
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

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {filteredList.map((item) => (
            <div
              key={item.id}
              onClick={() => {
                onSelect(item)
                if (onCloseMobileList) onCloseMobileList()
              }}
              className={`p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02] touch-manipulation ${
                selectedId === item.id
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg transform scale-[1.02]"
                  : "hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-white hover:shadow-md bg-white/50 dark:bg-slate-800/50"
              }`}
            >
              <div className="flex items-center space-x-3">
                {/* Avatar */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold ${
                    selectedId === item.id
                      ? "bg-white/20 text-white"
                      : "bg-gradient-to-br from-blue-500 to-orange-500 text-white"
                  } relative flex-shrink-0`}
                >
                  {item.avatar}
                  {item.online && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="font-semibold truncate text-sm sm:text-base">{item.name}</div>
                    <div className="text-xs opacity-70 flex-shrink-0 ml-2">{item.time}</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm opacity-70 truncate pr-2">{item.lastMessage}</div>
                    {item.unread > 0 && (
                      <div
                        className={`flex-shrink-0 px-2 py-1 rounded-full text-xs font-bold ${
                          selectedId === item.id
                            ? "bg-white/20 text-white"
                            : "bg-red-500 text-white"
                        }`}
                      >
                        {item.unread}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default ChatListSidebar
