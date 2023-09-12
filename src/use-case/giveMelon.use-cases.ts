import User from '../model/user.model';
import Post from '../model/post.model';
import generateKeyboard from '../utils/generateKeyboard';
import TelegramBot from 'node-telegram-bot-api';

export const giveMelon = async (bot: TelegramBot, callbackQuery: any) => {
  const msg = callbackQuery.message;
  const callbackData = callbackQuery.data ?? '';
  const data = JSON.parse(callbackData);
  const post = await Post.findOne({ keyboardId: msg.message_id })
  if(!post?.creatorId) throw new Error("Пост не найден")
  console.log("post.creatorId - "+post.creatorId)
  await User.updateOne({ chatId: post.creatorId }, { $inc: { score: 1 } })
  const text = `Админ передал тебе дыню🍈. Ты молодец!`;
  bot.sendMessage(post.creatorId, text);
  console.log("data.st - " + JSON.stringify(data.st))
  const status = Array.from(data.st).map((item) => {
    if (item === 't') return true
    else return false
  })
  console.log("status - "+JSON.stringify(status))
  bot.editMessageReplyMarkup({
    inline_keyboard: generateKeyboard(status[0], !status[1])
  }, {
    chat_id: msg.chat.id,
    message_id: msg.message_id
  })
  return true;
}