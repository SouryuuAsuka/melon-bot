import User from '../model/user.model';
import Post from '../model/post.model';
import generateKeyboard from '../utils/generateKeyboard';
import TelegramBot from 'node-telegram-bot-api';

export const cancelMelon = async (bot: TelegramBot, callbackQuery: any) => {
  const msg = callbackQuery.message;
  const callbackData = callbackQuery.data ?? '';
  const data = JSON.parse(callbackData);
  const post = await Post.findOne({ keyboardId: msg.message_id })
  if(!post?.creatorId) throw new Error("Пост не найден")
  User.findOneAndUpdate({ chatId: post.creatorId }, { $inc: { score: -1 } })
  const text = `Админ забрал у тебя дыню... Жизнь жестока...💔`;
  bot.sendMessage(post.creatorId, text);
  const status = Array.from(data.st).map((item) => {
    if (item === '0') return false
    else return true
  })
  bot.editMessageReplyMarkup({
    inline_keyboard: generateKeyboard(status[0], !status[1])
  }, {
    chat_id: msg.chat.id,
    message_id: msg.message_id
  })
  return true;
}