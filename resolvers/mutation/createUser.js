const usersData = require('../../usersData');

module.exports = (root, args) => {
  const { name, email } = args;
  usersData.users.push({ name, email });
  return usersData.users;
}