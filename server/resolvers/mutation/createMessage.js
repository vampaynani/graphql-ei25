const Message = require('../../models/message');

module.exports = async (root, args, context) => {
  const {message} = args;
  const newMessage = await Message.create({text: message});
  if(!newMessage){
    throw 'Message was not created!!!';
  }
  context.pubsub.publish('NEW_MESSAGE', {newMessage});
  return newMessage;
}