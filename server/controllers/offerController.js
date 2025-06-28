import Offer from '../models/offerModel.js'

// POST /api/offers – Make an offer for an item
const createOffer = async (req, res) => {
  try {
    const { itemId, offeredById, offerItemId } = req.body

    const newOffer = new Offer({ itemId, offeredById, offerItemId })
    await newOffer.save()

    res.status(201).json({ message: 'Offer created successfully', offer: newOffer })
  } catch (error) {
    res.status(500).json({ message: 'Failed to create offer', error: error.message })
  }
}

// GET /api/offers/item/:itemId – Get all offers for an item
const getOffersByItem = async (req, res) => {
  try {
    const { itemId } = req.params

    const offers = await Offer.find({ itemId })
      .populate('offeredById', 'name email')
      .populate('offerItemId', 'title images')

    res.status(200).json({ offers })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch offers', error: error.message })
  }
}

// GET /api/offers/user/:userId – Get offers made by user
const getOffersByUser = async (req, res) => {
  try {
    const { userId } = req.params

    const offers = await Offer.find({ offeredById: userId })
      .populate('itemId', 'title images')
      .populate('offerItemId', 'title images')

    res.status(200).json({ offers })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user offers', error: error.message })
  }
}

// PUT /api/offers/:id – Update offer status (accept/reject/withdraw)
const updateOfferStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const validStatuses = ['pending', 'accepted', 'rejected', 'withdrawn']
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid offer status' })
    }

    const updatedOffer = await Offer.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )

    if (!updatedOffer) {
      return res.status(404).json({ message: 'Offer not found' })
    }

    res.status(200).json({ message: 'Offer updated', offer: updatedOffer })
  } catch (error) {
    res.status(500).json({ message: 'Failed to update offer', error: error.message })
  }
}

// DELETE /api/offers/:id – Delete an offer
const deleteOffer = async (req, res) => {
  try {
    const { id } = req.params

    const deleted = await Offer.findByIdAndDelete(id)
    if (!deleted) {
      return res.status(404).json({ message: 'Offer not found' })
    }

    res.status(200).json({ message: 'Offer deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete offer', error: error.message })
  }
}

export { deleteOffer, createOffer, getOffersByItem, getOffersByUser, updateOfferStatus}
