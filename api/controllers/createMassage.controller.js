import { errorHandler } from '../utils/error.js';
import MessageOfMainChat from '../models/messageOfMainChat.model.js';

export const createMassage = async (req, res, next) => {
    try {
        const { message, room, author, profilePicture, userId } = req.body;

        const newMessage = new MessageOfMainChat({
            message,
            room,
            time: new Date(Date.now()).getHours() + new Date(Date.now()).getMinutes(),
            userId: req.user.id,
            author,
            profilePicture
        });

        await newMessage.save();
        res.status(200).json({newMessage})
    } catch (error) {
        next(error);
    }
}

export const getMassages = async (req, res, next) => {
    try {
        const startIndex = parseInt(req.query.startIndex) || 0;
        const limit = parseInt(req.query.limit) || 9;
        const sortDirection =  req.query.sort === 'desc' ? -1 : 1;
        const massages = await MessageOfMainChat.find().sort({createdAt: sortDirection}).skip(startIndex).limit(limit);
        const totalMessages = await MessageOfMainChat.countDocuments();
        const now = new Date();
        const oneMonthAgo = new Date(
          now.getFullYear(),
          now.getMonth() - 1,
          now.getDate()
        );
        const lastMonthMassages = await MessageOfMainChat.countDocuments({createdAt: {$gte: oneMonthAgo}});
        res.status(200).json({
            massages,
            totalMessages,
            lastMonthMassages
        });
    } catch (error) {
        next(error);
    }
}