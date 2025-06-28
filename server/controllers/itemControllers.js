import Item from '../models/itemModel.js'

// GET /api/items - Get all items
const getAllItems = async (req, res) => {
  try {
    const items = await Item.find().populate('ownerId', 'name email profilePic')
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch items', error: error.message })
  }
}

// GET /api/items/:id - Get single item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id).populate('ownerId', 'name email profilePic')

    if (!item) return res.status(404).json({ message: 'Item not found' })

    res.status(200).json(item)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching item', error: error.message })
  }
}

// POST /api/items - Create a new item
const createItem = async (req, res) => {
  try {
    const {
      ownerId,
      title,
      description,
      images,
      category,
      type,
      deliveryNotes
    } = req.body

    const newItem = new Item({
      ownerId,
      title,
      description,
      images,
      category,
      type,
      deliveryNotes
    })

    await newItem.save()
    res.status(201).json({ message: 'Item created successfully', item: newItem })
  } catch (error) {
    res.status(500).json({ message: 'Failed to create item', error: error.message })
  }
}

// PUT /api/items/:id - Update an item
const updateItem = async (req, res) => {
  try {
    const updatedItem = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    })

    if (!updatedItem) return res.status(404).json({ message: 'Item not found' })

    res.status(200).json({ message: 'Item updated', item: updatedItem })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update item', error: error.message })
  }
}

// DELETE /api/items/:id - Delete an item
const deleteItem = async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id)

    if (!deletedItem) return res.status(404).json({ message: 'Item not found' })

    res.status(200).json({ message: 'Item deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete item', error: error.message })
  }
}

// GET /api/items/search – Search/filter items
const searchItems = async (req, res) => {
  try {
    const { keyword, category, type, status } = req.query

    const filter = {}

    if (keyword) {
      filter.title = { $regex: keyword, $options: 'i' }
    }

    if (category) {
      filter.category = category
    }

    if (type) {
      filter.type = type
    }

    if (status) {
      filter.status = status
    }

    const items = await Item.find(filter).populate('ownerId', 'name email')

    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({ message: 'Search failed', error: error.message })
  }
}

// GET /api/items/user/:userId – Get items listed by a user
const getItemsByUser = async (req, res) => {
  try {
    const { userId } = req.params
    const items = await Item.find({ ownerId: userId }).populate('ownerId', 'name email')
    res.status(200).json(items)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user items', error: error.message })
  }
}



export { deleteItem, updateItem, getAllItems, getItemById, createItem, searchItems, getItemsByUser }