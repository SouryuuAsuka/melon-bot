import User from '../model/user.model';
import generateKeyboard from '../utils/generateKeyboard';
import TelegramBot  from 'node-telegram-bot-api';

export const giveMelon = async (bot: TelegramBot, callbackQuery: any) => {
  const msg = callbackQuery.message;
  const chatId = msg?.chat?.id;
  const callbackData = callbackQuery.data ?? '';
  const data = JSON.parse(callbackData);
  const msgText = msg.text ?? '';
  User.findOneAndUpdate({ chatId: data.id }, { $inc: { 'score': 1 } })
  const text = `Админ передал тебе дыню🍈. Ты молодец!`;
  bot.sendMessage(data.id, text);
  const status = Array.from(data.st).map((item) => {
    if (item === '0') return false
    else return true
  })
  bot.editMessageReplyMarkup({
    inline_keyboard: generateKeyboard( status[0], !status[1])
  }, {
    chat_id: msg.from.id,
    message_id: msg.message_id
  })
}