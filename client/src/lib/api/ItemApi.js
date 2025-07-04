import axios from "axios"

const API_BASE_URL = "http://localhost:5005"

class ItemsAPI {
  constructor() {
    this.api = axios.create({
      baseURL: `${API_BASE_URL}/api/items`,
    })

    // Add request interceptor for auth token
    this.api.interceptors.request.use((config) => {
      const token = localStorage.getItem("token")
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    })
  }

  // Get all items
  async getAllItems(page = 1, limit = 20, sort = "newest") {
    try {
      const response = await this.api.get("/", {
        params: { page, limit, sort },
      })
      return response.data.items || response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Get item by ID
  async getItemById(id) {
    try {
      const response = await this.api.get(`/${id}`)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Create new item with file upload
  async createItem(itemData, imageFiles = []) {
    try {
      const formData = new FormData()

      // Add text fields
      Object.keys(itemData).forEach((key) => {
        if (key !== "images" && itemData[key] !== undefined) {
          // Handle arrays and objects by converting to JSON strings
          if (typeof itemData[key] === "object" && itemData[key] !== null) {
            formData.append(key, JSON.stringify(itemData[key]))
          } else {
            formData.append(key, itemData[key])
          }
        }
      })

      // Add image files
      imageFiles.forEach((file) => {
        formData.append("images", file)
      })

      const response = await this.api.post("/create-items", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Update item with optional file upload
  async updateItem(id, itemData, imageFiles = [], removeImages = []) {
    try {
      const formData = new FormData()

      // Add text fields
      Object.keys(itemData).forEach((key) => {
        if (key !== "images" && itemData[key] !== undefined) {
          // Handle arrays and objects by converting to JSON strings
          if (typeof itemData[key] === "object" && itemData[key] !== null) {
            formData.append(key, JSON.stringify(itemData[key]))
          } else {
            formData.append(key, itemData[key])
          }
        }
      })

      // Add new image files
      imageFiles.forEach((file) => {
        formData.append("images", file)
      })

      // Add images to remove
      if (removeImages.length > 0) {
        formData.append("removeImages", JSON.stringify(removeImages))
      }

      const response = await this.api.put(`/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Delete item
  async deleteItem(id) {
    try {
      const response = await this.api.delete(`/${id}`)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Search items
  async searchItems(params = {}) {
    try {
      const response = await this.api.get("/search", { params })
      return response.data.items ? response.data : { items: response.data }
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Get items by user
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

  // Like/unlike an item
  async toggleLike(itemId) {
    try {
      const response = await this.api.post(`/${itemId}/like`)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Create swap request
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

  // Get image URL from image object or string
  getImageUrl(image) {
    if (!image) return null

    // Handle new image object structure
    if (typeof image === "object" && image.url) {
      const imagePath = image.url
      if (imagePath.startsWith("http")) return imagePath
      return `${API_BASE_URL.replace("/api", "")}${imagePath}`
    }

    // Handle legacy string format
    if (typeof image === "string") {
      if (image.startsWith("http")) return image
      return `${API_BASE_URL.replace("/api", "")}${image}`
    }

    return null
  }

  // Get likes for an item
  async getItemLikes(itemId) {
    try {
      const response = await this.api.get(`/${itemId}/likes`)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Get swap requests for an item
  async getItemSwapRequests(itemId) {
    try {
      const response = await this.api.get(`/${itemId}/swap-requests`)
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Update swap request status
  async updateSwapRequestStatus(itemId, requestId, status) {
    try {
      const response = await this.api.put(`/${itemId}/swap-requests/${requestId}`, { status })
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
  }

  // Get marketplace statistics
  async getMarketplaceStats() {
    try {
      const response = await this.api.get("/stats")
      return response.data
    } catch (error) {
      throw this.handleError(error)
    }
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
