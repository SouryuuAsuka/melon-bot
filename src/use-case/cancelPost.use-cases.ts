import TelegramBot from 'node-telegram-bot-api';
import Post from '../model/post.model';
import generateKeyboard from '../utils/generateKeyboard';

const mainChatId = process.env.CHAT_ID as string;

export const cancelPost = async (bot: TelegramBot, callbackQuery: any) => {
  const msg = callbackQuery.message;
  const chatId = msg?.chat?.id;
  const callbackData = callbackQuery.data ?? '';
  const data = JSON.parse(callbackData);
  const oldPost = await Post.findOneAndUpdate({ keyboardId: msg.message_id }, { $unset: { "inChanelPostId": 1 } });
  const status = Array.from(data.st).map((item) => {
    if (item === '0') return false
    else return true
  })
  if (!oldPost?.inChanelPostId) throw new Error("inChanelPostId error");
  bot.deleteMessage(mainChatId, oldPost.inChanelPostId,);
  bot.editMessageReplyMarkup({
    inline_keyboard: generateKeyboard(!status[0], status[1])
  }, {
    chat_id: chatId,
    message_id: msg.message_id
  })
  return true;
}