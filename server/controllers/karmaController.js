import karmaModel from '../models/karmaModel.js'
import userModel from '../models/userModel.js'

// GET /api/karma/:userId – Get user karma points and history
const getUserKarma = async (req, res) => {
  try {
    const { userId } = req.params

    const user = await userModel.findById(userId).select('name email profilePic karmaPoints')
    if (!user) return res.status(404).json({ message: 'User not found' })

    const history = await karmaModel.find({ userId }).sort({ date: -1 })

    res.status(200).json({
      user,
      karmaPoints: user.karmaPoints || 0,
      history
    })
  } catch (error) {
    res.status(500).json({ message: 'Error fetching karma', error: error.message })
  }
}

// POST /api/karma/add – Add karma points to user
const addKarma = async (req, res) => {
  try {
    const { userId, points, reason } = req.body
    if (!userId || !points || !reason) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Add to history
    await karmaModel.create({ userId, points, reason })

    // Update user's total
    const user = await userModel.findByIdAndUpdate(
      userId,
      { $inc: { karmaPoints: points } },
      { new: true }
    )

    res.status(200).json({
      message: 'Karma added successfully',
      karmaPoints: user.karmaPoints
    })
  } catch (error) {
    res.status(500).json({ message: 'Error adding karma', error: error.message })
  }
}

// POST /api/karma/deduct – Deduct karma points
const deductKarma = async (req, res) => {
  try {
    const { userId, points, reason } = req.body
    if (!userId || !points || !reason) {
      return res.status(400).json({ message: 'Missing required fields' })
    }

    // Add negative log to history
    await karmaModel.create({ userId, points: -Math.abs(points), reason })

    // Subtract from user karma (minimum 0)
    const user = await userModel.findById(userId)
    if (!user) return res.status(404).json({ message: 'User not found' })

    const newPoints = Math.max(0, user.karmaPoints - points)
    user.karmaPoints = newPoints
    await user.save()

    res.status(200).json({
      message: 'Karma deducted successfully',
      karmaPoints: user.karmaPoints
    })
  } catch (error) {
    res.status(500).json({ message: 'Error deducting karma', error: error.message })
  }
}

// GET /api/karma/leaderboard?circleId=xxx
const getLeaderboard = async (req, res) => {
  try {
    const { circleId } = req.query
    if (!circleId) return res.status(400).json({ message: 'Missing circleId' })

    const topUsers = await userModel.find({ circleId })
      .sort({ karmaPoints: -1 })
      .limit(10)
      .select('name email profilePic karmaPoints')

    res.status(200).json(topUsers)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching leaderboard', error: error.message })
  }
}


export { getLeaderboard, getUserKarma, addKarma, deductKarma }