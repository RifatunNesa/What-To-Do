const ForbiddenError = require('./../../utilities/errors/ForbiddenError');
const taskService = require('./../../services/taskService');

exports.isAuthorizedForTask = async (req, res, next) => {
  try {
    const id = req.params.id;
    const task = await taskService.getTaskById(id);
    if (task.userName !== req.currentUser.userName || task.userId !== parseInt(req.currentUser.id))
      throw new ForbiddenError('User not authorized for this operation');
    next();
  } catch (error) {
    next(error);
  }
};
