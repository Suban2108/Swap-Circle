import Request from '../models/requestModel.js'
import User from '../models/userModel.js'

// GET /api/requests - Get all requests
const getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find().populate('requestedById', 'name email')
    res.status(200).json({ requests })
  } catch (err) {
    res.status(500).json({ message: 'Error fetching requests', error: err.message })
  }
}

// POST /api/requests - Create a new request
const createRequest = async (req, res) => {
  try {
    const { requestedById, description, category } = req.body

    if (!requestedById || !description) {
      return res.status(400).json({ message: 'requestedById and description are required' })
    }

    const newRequest = new Request({
      requestedById,
      description,
      category
    })

    await newRequest.save()
    res.status(201).json({ message: 'Request created successfully', request: newRequest })
  } catch (err) {
    res.status(500).json({ message: 'Error creating request', error: err.message })
  }
}

// PUT /api/requests/:id - Update a request (description, category, fulfilled)
const updateRequest = async (req, res) => {
  try {
    const { id } = req.params
    const { description, category, fulfilled } = req.body

    const updatedRequest = await Request.findByIdAndUpdate(
      id,
      { description, category, fulfilled },
      { new: true }
    )

    if (!updatedRequest) {
      return res.status(404).json({ message: 'Request not found' })
    }

    res.status(200).json({ message: 'Request updated', request: updatedRequest })
  } catch (err) {
    res.status(500).json({ message: 'Error updating request', error: err.message })
  }
}

// DELETE /api/requests/:id - Delete a request
const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params

    const deleted = await Request.findByIdAndDelete(id)
    if (!deleted) {
      return res.status(404).json({ message: 'Request not found' })
    }

    res.status(200).json({ message: 'Request deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: 'Error deleting request', error: err.message })
  }
}


export { deleteRequest, updateRequest, getAllRequests, createRequest }