const User = require('./User');
const Task = require('./Task');

// association between User and Task model
User.hasMany(Task, {
  foreignKey: 'userId',
  onDelete: 'CASCADE',
});
Task.belongsTo(User);
