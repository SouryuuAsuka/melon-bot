import Post from '../model/post.model';
import generateKeyboard from '../utils/generateKeyboard';
import TelegramBot  from 'node-telegram-bot-api';

const botOwner = process.env.BOT_OWNER as string;

export const getMessage = async (bot: TelegramBot, msg: any) => {
  const chatId = msg.chat.id;
  if(msg.from.id == botOwner) return true;
  const newPost = await bot.forwardMessage(botOwner, msg.chat.id, msg.message_id);
  const newKeyboard = await bot.sendMessage(botOwner,'Управление постом:',{
    reply_to_message_id: newPost.message_id,
    reply_markup: {
      inline_keyboard: generateKeyboard()
    }
  })
  await Post.create({creatorId: chatId, postId: newPost.message_id, keyboardId: newKeyboard.message_id, ownerId: botOwner})
  return true;
}
