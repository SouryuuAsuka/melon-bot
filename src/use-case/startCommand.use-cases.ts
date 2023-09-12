import User from '../model/user.model';
import TelegramBot from 'node-telegram-bot-api';

export const startCommand = async (bot: TelegramBot, msg: any) => {
  const chatId = msg.chat.id
  User.findOne({ chatId: chatId })
    .then((user) => {
      if (!user) {
        User.create({ chatId: msg.from.id, username: msg.from.username, firstname: msg.from.first_name, lastname: msg.from.last_name })
          .then(() => {
            const text = `Привет!\nЭтот бот создан для того, чтобы ты мог рассказать, как вкусно ты покушал`;
            bot.sendMessage(chatId, text)
          }).catch((err) => {
            console.log(err)
            const text = `Привет!\nПочему-то произошла ошибка при сохранении твоих данных. Пожалуйста, сообщи об этом админу`;
            bot.sendMessage(chatId, text)
          })
      } else {
        const text = `Привет!\nДобро пожаловать. Снова.`;
        bot.sendMessage(chatId, text)
      }
    }).catch((err) => {
      console.log(err)
      const text = `Привет!\nПочему-то произошла ошибка при сохранении твоих данных. Пожалуйста, сообщи об этом админу`;
      bot.sendMessage(chatId, text)
    })
  return true;
}