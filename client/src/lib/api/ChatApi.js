import axios from "axios"

const API_BASE_URL = "http://localhost:5005"

class ChatAPI {
  getAuthHeaders() {
    const token = localStorage.getItem("token")
    return {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  }

  async getOrCreateDirectConversation(userId1, userId2) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/conversations/direct`,
        { userId1, userId2 },
        this.getAuthHeaders()
      )
      return response.data
    } catch (error) {
      console.error("Error getting/creating direct conversation:", error)
      throw error
    }
  }

  async getOrCreateGroupConversation(groupId) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/conversations/group`,
        { groupId },
        this.getAuthHeaders()
      )
      return response.data
    } catch (error) {
      console.error("Error getting/creating group conversation:", error)
      throw error
    }
  }

  async getUserConversations(userId, type) {
    try {
      const params = type ? `?type=${type}` : ""
      const response = await axios.get(
        `${API_BASE_URL}/api/conversations/user/${userId}${params}`,
        this.getAuthHeaders()
      )
      return response.data
    } catch (error) {
      console.error("Error fetching user conversations:", error)
      throw error
    }
  }

  async sendMessage(messageData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/messages/send`,
        messageData,
        this.getAuthHeaders()
      )
      return response.data
    } catch (error) {
      console.error("Error sending message:", error)
      throw error
    }
  }

  async getConversationMessages(conversationId, page = 1, limit = 50) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/messages/conversation/${conversationId}?page=${page}&limit=${limit}`,
        this.getAuthHeaders()
      )
      return response.data
    } catch (error) {
      console.error("Error fetching conversation messages:", error)
      throw error
    }
  }

  async markMessagesAsRead(conversationId, userId) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/messages/mark-read`,
        { conversationId, userId },
        this.getAuthHeaders()
      )
      return response.data
    } catch (error) {
      console.error("Error marking messages as read:", error)
      throw error
    }
  }

  async deleteConversation(conversationId, userId) {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/conversations/${conversationId}`,
        {
          ...this.getAuthHeaders(),
          data: { userId },
        }
      )
      return response.data
    } catch (error) {
      console.error("Error deleting conversation:", error)
      throw error
    }
  }

  async deleteMessage(messageId, userId) {
    try {
      const response = await axios.delete(
        `${API_BASE_URL}/api/messages/${messageId}`,
        {
          ...this.getAuthHeaders(),
          data: { userId },
        }
      )
      return response.data
    } catch (error) {
      console.error("Error deleting message:", error)
      throw error
    }
  }

  async createCircle(circleData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/circles/create`,
        circleData,
        this.getAuthHeaders()
      )
      return response.data
    } catch (error) {
      console.error("Error creating circle:", error)
      throw error
    }
  }

  async joinCircle(joinData) {
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/circles/join`,
        joinData,
        this.getAuthHeaders()
      )
      return response.data
    } catch (error) {
      console.error("Error joining circle:", error)
      throw error
    }
  }

  async getUserGroups(userId) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/circles/user-groups/${userId}`,
        this.getAuthHeaders()
      )
      return response.data
    } catch (error) {
      console.error("Error fetching user groups:", error)
      throw error
    }
  }

  async getCircleMembers(circleId) {
    try {
      console.log("ChatAPI: Getting members for circle:", circleId)
      console.log("ChatAPI: Making request to:", `${API_BASE_URL}/api/circles/${circleId}/members`)

      const response = await axios.get(
        `${API_BASE_URL}/api/circles/${circleId}/members`,
        this.getAuthHeaders()
      )

      console.log("ChatAPI: Response received:", response.data)
      return response.data
    } catch (error) {
      console.error("ChatAPI: Error fetching circle members:", error)
      if (error.response) {
        console.error("ChatAPI: Error response:", error.response.status, error.response.data)
      }
      throw error
    }
  }

  async getCircleDetails(circleId) {
    try {
      const response = await axios.get(
        `${API_BASE_URL}/api/circles/${circleId}`,
        this.getAuthHeaders()
      )
      return response.data
    } catch (error) {
      console.error("Error fetching circle details:", error)
      throw error
    }
  }
}

export const chatAPI = new ChatAPI()
