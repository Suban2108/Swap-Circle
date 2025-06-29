// controllers/statsControllers.js
import reuseModel from '../models/reuseModel.js'
import userModel from '../models/userModel.js'

export const getOverviewStats = async (req, res) => {
  try {
    const reusedItems = await reuseModel.countDocuments()
    const totalWasteKg = await reuseModel.aggregate([
      { $group: { _id: null, totalKg: { $sum: '$estimatedWasteDivertedKg' } } }
    ])

    const totalUsers = await userModel.countDocuments()

    res.status(200).json({
      totalReusedItems: reusedItems,
      totalWasteDivertedKg: totalWasteKg[0]?.totalKg || 0,
      totalUsers
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch overview stats', error: error.message })
  }
}

export const getUserStats = async (req, res) => {
  try {
    const { userId } = req.params

    const userReuse = await reuseModel.find({ userId })

    const totalItems = userReuse.length
    const totalKg = userReuse.reduce((sum, item) => sum + (item.estimatedWasteDivertedKg || 0), 0)

    res.status(200).json({
      userId,
      totalReusedItems: totalItems,
      totalWasteDivertedKg: totalKg
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user stats', error: error.message })
  }
}

export const getCircleStats = async (req, res) => {
  try {
    const { circleId } = req.params

    const circleReuse = await reuseModel.find({ circleId })

    const totalItems = circleReuse.length
    const totalKg = circleReuse.reduce((sum, item) => sum + (item.estimatedWasteDivertedKg || 0), 0)

    res.status(200).json({
      circleId,
      totalReusedItems: totalItems,
      totalWasteDivertedKg: totalKg
    })
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch circle stats', error: error.message })
  }
}
