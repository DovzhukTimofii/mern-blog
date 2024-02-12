import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const test = (req, res) => {
  res.json({message: 'Api working !'})
}

export const updateuser = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'Ви не маєте права оновлювати цього користувача'));
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return next(errorHandler(400, 'Пароль повинен містити щонайменше 6 символів'));
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 7 || req.body.username.length > 20) {
      return next(
        errorHandler(400, "Ім'я користувача має містити від 7 до 20 символів")
      );
    }
    if (req.body.username.includes(' ')) {
      return next(errorHandler(400, "Ім'я користувача не може містити пробілів"));
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return next(errorHandler(400, "Ім'я користувача має бути в нижньому регістрі"));
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return next(
        errorHandler(400, "Ім'я користувача може містити лише літери та цифри")
      );
    }
  }
  try {
    const updateduser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          profilePicture: req.body.profilePicture,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password, ...rest } = updateduser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteuser = async (req, res, next) => {
  if(!req.user.vip && req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'Ви не маєте права видаляти цього користувача'));
  }

  try {
    await User.findByIdAndDelete(req.params.userId);
    res.status(200).json('User has been deleted');
  } catch (error) {
    next(error);
  }
}

export const signout = async (req, res, next) => {
  try {
    res.clearCookie('acces_token').status(200).json('Користувача було видалено!');
  } catch (error) {
    next(error);
  }
}

export const getusers = async (req, res, next) => {
  if(!req.user.vip) {
    return next(errorHandler(403, 'Ви не маєте права бачити всіх користувачів'));
  }
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 9;
    const sortDirection = req.query.sort === 'asc' ? 1 : -1;

    const user = await User.find().sort({createAt: sortDirection}).skip(startIndex).limit(limit);

    const usersWhithoutPassword = user.map((user) => {
      const {password, ...rest} = user._doc;
      return rest;
    });

    const totalUsers = await User.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthUsers = await User.countDocuments({createAt: {$gte: oneMonthAgo}});

    res.status(200).json({
      users:  usersWhithoutPassword,
      totalUsers,
      lastMonthUsers
    })

  } catch (error) {
    next(error);
  }
}