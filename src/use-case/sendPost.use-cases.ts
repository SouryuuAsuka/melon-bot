import TelegramBot from 'node-telegram-bot-api';
import Post from '../model/post.model';
import generateKeyboard from '../utils/generateKeyboard';

const mainChatId = process.env.CHAT_ID as string;

export const sendPost = async (bot: TelegramBot, callbackQuery: any) => {
  const msg = callbackQuery.message;
  const chatId = msg?.chat?.id;
  const callbackData = callbackQuery.data ?? '';
  const data = JSON.parse(callbackData);
  const oldPost = await Post.findOne({ keyboardId: msg.message_id });
  const status = Array.from(data.st).map((item) => {
    if (item === 't') return true
    else return false
  })
  if (!oldPost?.postId) throw new Error("KeyboardId error");
  const newPost = await bot.copyMessage(mainChatId, chatId, oldPost?.postId);
  bot.editMessageReplyMarkup({
    inline_keyboard: generateKeyboard(!status[0], status[1])
  }, {
    chat_id: chatId,
    message_id: msg.message_id
  })
  await Post.findOneAndUpdate({ keyboardId: msg.message_id }, { inChanelPostId: newPost });
  return true;
}