// lib/api/ItemApi.js
import axios from "axios"

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const token = localStorage.getItem('token');


class ItemsAPI {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/api/items`,
        headers:{
          Authorization: `Bearer ${token}`,
        }
    })
  }

  // No need to set headers manually, cookies will handle auth

  async getAllItems({ page = 1, limit = 20, sort = "newest" }) {
    try {
      const response = await this.api.get("/", {
        params: { page, limit, sort },
      })
      return response.data.items || response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async getItemById(id) {
    try {
      const response = await this.api.get(`/${id}`)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async createItem(itemData, imageFiles = []) {
    try {
      const formData = new FormData()

      Object.keys(itemData).forEach((key) => {
        if (key !== "images" && itemData[key] !== undefined) {
          if (typeof itemData[key] === "object" && itemData[key] !== null) {
            formData.append(key, JSON.stringify(itemData[key]))
          } else {
            formData.append(key, itemData[key])
          }
        }
      })

      imageFiles.forEach((file) => {
        formData.append("images", file)
      })

      const response = await this.api.post("/create-items", formData)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async updateItem(id, itemData, imageFiles = [], removeImages = []) {
    try {
      const formData = new FormData()

      Object.keys(itemData).forEach((key) => {
        if (key !== "images" && itemData[key] !== undefined) {
          if (typeof itemData[key] === "object" && itemData[key] !== null) {
            formData.append(key, JSON.stringify(itemData[key]))
          } else {
            formData.append(key, itemData[key])
          }
        }
      })

      imageFiles.forEach((file) => {
        formData.append("images", file)
      })

      if (removeImages.length > 0) {
        formData.append("removeImages", JSON.stringify(removeImages))
      }

      const response = await this.api.put(`/${id}`, formData)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async deleteItem(id) {
    try {
      const response = await this.api.delete(`/${id}`)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async searchItems(params = {}) {
    try {
      const response = await this.api.get("/search", { params })
      return response.data.items ? response.data : { items: response.data }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async getItemsByUser(userId, includeRemoved = false, page = 1, limit = 20) {
    try {
      const response = await this.api.get(`/user/${userId}`, {
        params: { includeRemoved, page, limit },
      })
      return response.data.items || response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async toggleLike(itemId) {
    try {
      const response = await this.api.post(`/${itemId}/like`)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async createSwapRequest(itemId, offeredItemId, message = "") {
    try {
      const response = await this.api.post(`/${itemId}/swap-request`, {
        offeredItemId,
        message,
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async getItemLikes(itemId) {
    try {
      const response = await this.api.get(`/${itemId}/likes`)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async getItemSwapRequests(itemId) {
    try {
      const response = await this.api.get(`/${itemId}/swap-requests`)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async updateSwapRequestStatus(itemId, requestId, status) {
    try {
      const response = await this.api.put(`/${itemId}/swap-requests/${requestId}`, {
        status,
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  async getMarketplaceStats() {
    try {
      const response = await this.api.get("/stats")
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  getImageUrl(image) {
    if (!image) return null
    if (typeof image === "object" && image.url) {
      return image.url.startsWith("http")
        ? image.url
        : `${API_BASE_URL.replace("/api", "")}${image.url}`
    }
    if (typeof image === "string") {
      return image.startsWith("http")
        ? image
        : `${API_BASE_URL.replace("/api", "")}${image}`
    }
    return null
  }

  handleError(error) {
    if (error.response) {
      return new Error(error.response.data.message || "API Error")
    } else if (error.request) {
      return new Error("Network Error")
    } else {
      return new Error("Unknown Error")
    }
  }
}

export const itemsAPI = new ItemsAPI()
