const Sequelize = require('sequelize');
const User = require('../database/models/User');
const NotFoundError = require('./../utilities/errors/NotFoundError');

exports.getUserByUserName = async (userName) => {
  const user = await User.findOne({
    where: {
      userName,
    },
  });

  if (!user) return null;
  return user.dataValues;
};

exports.getUserByEmail = async (email) => {
  const user = await User.findOne({
    where: {
      email,
    },
  });

  if (!user) return null;
  return user.dataValues;
};

exports.getUserById = async (id) => {
  const user = await User.findOne({
    where: {
      id,
    },
  });

  if (!user) return null;
  return user.dataValues;
};

exports.getUsers = async (pageSize, pageNumber) => {
  const offset = (pageNumber - 1) * pageSize;
  const limit = pageSize;
  const users = await User.findAll({ offset, limit });
  const usersData = users.map((el) => el.dataValues);

  return usersData;
};

exports.getUsersCount = async () => {
  const userCount = await User.findAll({
    attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'id_count']],
  });

  return userCount[0].dataValues.id_count;
};

exports.getSpecificUsers = async (userNameKey, pageSize, pageNumber) => {
  const offset = (pageNumber - 1) * pageSize;
  const limit = pageSize;
  const users = await User.findAll({
    offset,
    limit,
    where: { userName: { [Sequelize.Op.substring]: userNameKey } },
  });
  const usersData = users.map((el) => el.dataValues);

  return usersData;
};

exports.getSpecificUsersCount = async (userNameKey) => {
  const userCount = await User.findAll({
    attributes: [[Sequelize.fn('COUNT', Sequelize.col('id')), 'id_count']],
    where: { userName: { [Sequelize.Op.substring]: userNameKey } },
  });

  return userCount[0].dataValues.id_count;
};

exports.createUser = async (userToCreate) => {
  const createdUser = await User.create(userToCreate);

  return createdUser.dataValues;
};

exports.updateUser = async (userName, userToUpdate) => {
  const user = await User.findOne({
    where: {
      userName,
    },
  });
  const updatedUser = await user.update(userToUpdate);

  return updatedUser.dataValues;
};

exports.deleteUser = async (userName) => {
  const user = await User.findOne({
    where: {
      userName,
    },
  });
  await user.destroy();

  return;
};
