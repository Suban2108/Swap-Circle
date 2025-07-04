const API_BASE_URL = "http://localhost:5005/api"

class ApiClient {
  getAuthHeaders() {
    const token = localStorage.getItem("token")
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    }
  }

  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers: {
          ...this.getAuthHeaders(),
          ...options.headers,
        },
      })

      const data = await response.json()
      return data
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "An error occurred",
      }
    }
  }

  // Events API
  async getAllEvents() {
    return this.request(`/events`)
  }

  async getEvent(id) {
    return this.request(`/events/${id}`)
  }

  async createEvent(eventData) {
    return this.request("/events", {
      method: "POST",
      body: JSON.stringify(eventData),
    })
  }

  async updateEvent(id, eventData) {
    return this.request(`/events/${id}`, {
      method: "PUT",
      body: JSON.stringify(eventData),
    })
  }

  async deleteEvent(id) {
    return this.request(`/events/${id}`, {
      method: "DELETE",
    })
  }

  async joinEvent(id) {
    return this.request(`/events/${id}/join`, {
      method: "POST",
    })
  }

  async leaveEvent(id) {
    return this.request(`/events/${id}/leave`, {
      method: "POST",
    })
  }

  async rewardParticipants(id, data) {
    return this.request(`/events/${id}/reward`, {
      method: "POST",
      body: JSON.stringify(data),
    })
  }

  async getUserEvents(userId, type = "all") {
    return this.request(`/events/user/${userId}?type=${type}`)
  }

  async getAllEvents(id){
    return this.request('/events')
  }
}

export const apiClient = new ApiClient()
