import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem('token');


class ApiClient {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
  }

  async getAllEvents(filters = {}) {
    try {
      const response = await this.client.get("/api/events", { params: filters })
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async getEvent(id) {
    try {
      const response = await this.client.get(`/api/events/${id}`)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async createEvent(eventData) {
    try {
      const response = await this.client.post("/api/events", eventData)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async updateEvent(id, eventData) {
    try {
      const response = await this.client.put(`/api/events/${id}`, eventData)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async deleteEvent(id) {
    try {
      const response = await this.client.delete(`/api/events/${id}`)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async joinEvent(id) {
    try {
      const response = await this.client.post(`/api/events/${id}/join`)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async leaveEvent(id) {
    try {
      const response = await this.client.post(`/api/events/${id}/leave`)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async rewardParticipants(id, data) {
    try {
      const response = await this.client.post(`/api/events/${id}/reward`, data)
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  async getUserEvents(type = "all") {
    try {
      const response = await this.client.get(`/api/events/user/me`, {
        params: { type },
      })
      return response.data
    } catch (error) {
      return this.handleError(error)
    }
  }

  handleError(error) {
    if (error.response) {
      return {
        success: false,
        message: error.response.data?.message || "API Error",
        status: error.response.status,
        data: error.response.data,
      }
    }
    return {
      success: false,
      message: error.message || "Unexpected Error",
    }
  }
}

export const apiClient = new ApiClient()
