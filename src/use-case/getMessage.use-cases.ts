import Post from '../model/post.model';
import generateKeyboard from '../utils/generateKeyboard';
import TelegramBot  from 'node-telegram-bot-api';
import getMediaArray from '../utils/getMediaArray';

const botOwner = process.env.BOT_OWNER as string;

export const getMessage = async (bot: TelegramBot, msg: any) => {
  const chatId = msg.chat.id;
  //TODO: if(msg.from.id != botOwner)
  const media = getMediaArray(msg);
  let newMsg;
  if (media.length > 0) {
    newMsg = await bot.sendMediaGroup(botOwner, media);
  } else {
    const msgText = msg.text ?? '';
    newMsg = await bot.sendMessage(botOwner, msgText);
  }

  const newKeyboard = await bot.sendMessage(botOwner,'',{
    reply_markup: {
      inline_keyboard: generateKeyboard(msg.from.id)
    }
  })
  await Post.create({creatorId: chatId, postId: newMsg.message_id, keyboardId: newKeyboard.message_id, ownerId: botOwner})
  return true;
}
