const User = require('../../models/user');
const Message = require('../../models/message');

module.exports = async (root, args, context) => {
  const { isAuthorized } = context;
  const decodedToken = isAuthorized();
  const isUser = await User.findById(decodedToken.user._id);
  if(!isUser){
    throw 'Unauthorized';
  }
  return await Message.find();
}