import { errorHandler } from '../utils/error.js';
import  Post  from '../models/post.model.js'

export const create = async (req, res, next) => {
    if(!req.body.title || !req.body.content) {
        return next(errorHandler(400, "Будь ласка, заповніть всі обов'язкові поля"));
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '');

    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id
    });

    try{
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch(error) {
        next(error);
    }
}

export const update = async (req, res, next) => {
    try{
        const updatedPost = await Post.findByIdAndUpdate(
            req.params.userId,
            {
              $set: {
                likeOfVip: req.body.likeOfVip
              },
            },
            { new: true }
        );

        if (!updatedPost) {
            return next(errorHandler(404, 'Пост не знайдено'));
        }
    
        const { likeOfVip,...rest } = updatedPost._doc;
        res.status(200).json(rest);
    } catch(error) {
        next(error);
    }
}