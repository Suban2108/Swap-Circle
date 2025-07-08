import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const token = localStorage.getItem('token');



class ChatAPI {
  // Global axios config using cookies
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/api`,
      headers:{
        Authorization: `Bearer ${token}`,
      }
    })
  }

  async getOrCreateDirectConversation(userId1, userId2) {
    try {
      const response = await this.api.post("/conversations/direct", { userId1, userId2 })
      return response.data
    } catch (error) {
      console.error("Error getting/creating direct conversation:", error)
      throw error
    }
  }

  async getOrCreateGroupConversation(groupId) {
    try {
      const response = await this.api.post("/conversations/group", { groupId })
      return response.data
    } catch (error) {
      console.error("Error getting/creating group conversation:", error)
      throw error
    }
  }

  async getUserConversations(userId, type) {
    try {
      const params = type ? `?type=${type}` : ""
      const response = await this.api.get(`/conversations/user/${userId}${params}`)
      return response.data
    } catch (error) {
      console.error("Error fetching user conversations:", error)
      throw error
    }
  }

  async sendMessage(messageData) {
    try {
      const response = await this.api.post("/messages/send", messageData)
      return response.data
    } catch (error) {
      console.error("Error sending message:", error)
      throw error
    }
  }

  async getConversationMessages(conversationId, page = 1, limit = 50) {
    try {
      const response = await this.api.get(`/messages/conversation/${conversationId}?page=${page}&limit=${limit}`)
      return response.data
    } catch (error) {
      console.error("Error fetching conversation messages:", error)
      throw error
    }
  }

  async markMessagesAsRead(conversationId, userId) {
    try {
      const response = await this.api.post("/messages/mark-read", { conversationId, userId })
      return response.data
    } catch (error) {
      console.error("Error marking messages as read:", error)
      throw error
    }
  }

  async deleteConversation(conversationId, userId) {
    try {
      const response = await this.api.delete(`/conversations/${conversationId}`, {
        data: { userId },
      })
      return response.data
    } catch (error) {
      console.error("Error deleting conversation:", error)
      throw error
    }
  }

  async deleteMessage(messageId, userId) {
    try {
      const response = await this.api.delete(`/messages/${messageId}`, {
        data: { userId },
      })
      return response.data
    } catch (error) {
      console.error("Error deleting message:", error)
      throw error
    }
  }

  async createCircle(circleData) {
    try {
      const response = await this.api.post("/circles/create", circleData)
      return response.data
    } catch (error) {
      console.error("Error creating circle:", error)
      throw error
    }
  }

  async joinCircle(joinData) {
    try {
      const response = await this.api.post("/circles/join", joinData)
      return response.data
    } catch (error) {
      console.error("Error joining circle:", error)
      throw error
    }
  }

  async getUserGroups(userId) {
    try {
      const response = await this.api.get(`/circles/user-groups/${userId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching user groups:", error)
      throw error
    }
  }

  async getCircleMembers(circleId) {
    try {
      const response = await this.api.get(`/circles/${circleId}/members`)
      return response.data
    } catch (error) {
      console.error("ChatAPI: Error fetching circle members:", error)
      throw error
    }
  }

  async getCircleDetails(circleId) {
    try {
      const response = await this.api.get(`/circles/${circleId}`)
      return response.data
    } catch (error) {
      console.error("Error fetching circle details:", error)
      throw error
    }
  }

  async updateCircle(groupId, { name, avatar, userId }) {
    try {
      const formData = new FormData()
      if (name) formData.append("name", name)
      if (userId) formData.append("userId", userId)
      if (avatar) formData.append("avatar", avatar)

      const response = await this.api.put(`/circles/${groupId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })

      return response.data
    } catch (error) {
      console.error("Error updating circle:", error)
      throw error
    }
  }

  async refreshConversationData(conversationId) {
    try {
      const response = await this.api.get(`/conversations/${conversationId}`)
      return response.data
    } catch (error) {
      console.error("Error refreshing conversation data:", error)
      throw error
    }
  }
}

export const chatAPI = new ChatAPI()
