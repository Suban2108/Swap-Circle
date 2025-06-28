import Message from '../models/chatModel.js'
import mongoose from 'mongoose';


// POST /api/chat/send
const sendMessage = async (req, res) => {
  try {
    const { senderId, receiverId, groupId, itemId, content } = req.body

    const message = new Message({
      senderId,
      receiverId,
      groupId,
      itemId,
      content
    })

    await message.save()
    res.status(201).json({ message: 'Message sent', data: message })
  } catch (err) {
    res.status(500).json({ message: 'Error sending message', error: err.message })
  }
}

// GET /api/chat/one-to-one?senderId=&receiverId=
const getOneToOneMessages = async (req, res) => {
  try {
    const { senderId, receiverId } = req.query

    const messages = await Message.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).sort({ timestamp: 1 })

    res.status(200).json(messages)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching messages', error: err.message })
  }
}

// GET /api/chat/group/:groupId
const getGroupMessages = async (req, res) => {
  try {
    const { groupId } = req.params
    const messages = await Message.find({ groupId }).sort({ timestamp: 1 })

    res.status(200).json(messages)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching group messages', error: err.message })
  }
}

// GET /api/chat/contacts/:userId
const getUserChatContacts = async (req, res) => {
  try {
    const { userId } = req.params

    // Get distinct users this user has chatted with (1:1)
    const contacts = await Message.aggregate([
      {
        $match: {
          $or: [
            { senderId: new mongoose.Types.ObjectId(userId) },
            { receiverId: new mongoose.Types.ObjectId(userId) }
          ]
        }
      },
      {
        $project: {
          contact: {
            $cond: [
              { $eq: ['$senderId', new mongoose.Types.ObjectId(userId)] },
              '$receiverId',
              '$senderId'
            ]
          }
        }
      },
      { $group: { _id: '$contact' } },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'user'
        }
      },
      {
        $unwind: '$user'
      },
      {
        $project: {
          _id: '$user._id',
          name: '$user.name',
          email: '$user.email',
          profilePic: '$user.profilePic'
        }
      }
    ])

    res.status(200).json(contacts)
  } catch (err) {
    res.status(500).json({ message: 'Error fetching contacts', error: err.message })
  }
}


export { getGroupMessages, getOneToOneMessages, getUserChatContacts, sendMessage }