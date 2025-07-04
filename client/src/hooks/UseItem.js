"use client"

import { useState, useEffect, useCallback } from "react"
import { itemsAPI } from "../lib/api/ItemApi"
import toast from "react-hot-toast"

export const useItems = () => {
  const [items, setItems] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchItems = useCallback(async (searchParams = {}, page = 1, limit = 20, sort = "newest") => {
    setLoading(true)
    setError(null)
    try {
      let result
      if (Object.keys(searchParams).length > 0) {
        result = await itemsAPI.searchItems({
          ...searchParams,
          page,
          limit,
          sort,
        })
      } else {
        result = await itemsAPI.getAllItems(page, limit, sort)
      }

      // Handle both paginated and non-paginated responses
      if (result.items && result.pagination) {
        setItems(result.items)
        setPagination(result.pagination)
      } else {
        setItems(Array.isArray(result) ? result : [])
        setPagination({
          current: 1,
          pages: 1,
          total: Array.isArray(result) ? result.length : 0,
        })
      }
    } catch (err) {
      setError(err.message)
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  const createItem = useCallback(async (itemData, imageFiles = []) => {
    try {
      const result = await itemsAPI.createItem(itemData, imageFiles)
      setItems((prev) => [result.item, ...prev])
      toast.success("Item created successfully!")
      return result
    } catch (err) {
      toast.error(err.message)
      throw err
    }
  }, [])

  const updateItem = useCallback(async (id, itemData, imageFiles = [], removeImages = []) => {
    try {
      const result = await itemsAPI.updateItem(id, itemData, imageFiles, removeImages)
      setItems((prev) => prev.map((item) => (item._id === id ? result.item : item)))
      toast.success("Item updated successfully!")
      return result
    } catch (err) {
      toast.error(err.message)
      throw err
    }
  }, [])

  const deleteItem = useCallback(async (id) => {
    try {
      await itemsAPI.deleteItem(id)
      setItems((prev) => prev.filter((item) => item._id !== id))
      toast.success("Item deleted successfully!")
    } catch (err) {
      toast.error(err.message)
      throw err
    }
  }, [])

  const toggleLike = useCallback(async (id) => {
    try {
      const result = await itemsAPI.toggleLike(id)
      setItems((prev) =>
        prev.map((item) => {
          if (item._id === id) {
            const userId = localStorage.getItem("userId")
            let updatedLikes = [...(item.likes || [])]

            if (result.liked) {
              // Add like if not already present
              if (!updatedLikes.some((like) => like.userId === userId)) {
                updatedLikes.push({ userId, likedAt: new Date() })
              }
            } else {
              // Remove like
              updatedLikes = updatedLikes.filter((like) => like.userId !== userId)
            }

            return { ...item, likes: updatedLikes }
          }
          return item
        }),
      )
      return result
    } catch (err) {
      toast.error(err.message)
      throw err
    }
  }, [])

  const createSwapRequest = useCallback(async (itemId, offeredItemId, message = "") => {
    try {
      const result = await itemsAPI.createSwapRequest(itemId, offeredItemId, message)
      toast.success("Swap request sent successfully!")
      return result
    } catch (err) {
      toast.error(err.message)
      throw err
    }
  }, [])

  useEffect(() => {
    fetchItems()
  }, [fetchItems])

  return {
    items,
    pagination,
    loading,
    error,
    fetchItems,
    createItem,
    updateItem,
    deleteItem,
    toggleLike,
    createSwapRequest,
    refetch: fetchItems,
  }
}

export const useUserItems = (userId) => {
  const [userItems, setUserItems] = useState([])
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchUserItems = useCallback(
    async (includeRemoved = false, page = 1, limit = 20) => {
      if (!userId) return

      setLoading(true)
      setError(null)
      try {
        const result = await itemsAPI.getItemsByUser(userId, includeRemoved, page, limit)

        // Handle both paginated and non-paginated responses
        if (result.items && result.pagination) {
          setUserItems(result.items)
          setPagination(result.pagination)
        } else {
          setUserItems(Array.isArray(result) ? result : [])
          setPagination({
            current: 1,
            pages: 1,
            total: Array.isArray(result) ? result.length : 0,
          })
        }
      } catch (err) {
        setError(err.message)
        toast.error(err.message)
      } finally {
        setLoading(false)
      }
    },
    [userId],
  )

  useEffect(() => {
    fetchUserItems()
  }, [fetchUserItems])

  return {
    userItems,
    pagination,
    loading,
    error,
    refetch: fetchUserItems,
  }
}
