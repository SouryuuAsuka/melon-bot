import mongoose from 'mongoose';
import User from '../model/user.model';

export const startCommand = function (bot: any) {
  return (msg: any) => {
    const chatId = msg.chat.id
    User.create({ chatId: msg.from.id, username: msg.from.id })
      .then(() => {
        const text = `Привет!\nЭтот бот создан для того, чтобы ты мог рассказать, как вкусно ты покушал`;
        bot.sendMessage(chatId, text)
      }).catch((err) => {
        console.log(err)
        const text = `Привет!\nПочему-то произошла ошибка при сохранении твоих данных. Пожалуйста, сообщи об этом админу`;
        bot.sendMessage(chatId, text)
      })
  }
}