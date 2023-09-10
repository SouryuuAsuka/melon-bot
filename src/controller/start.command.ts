import mongoose from 'mongoose';
const User = mongoose.model('User');

export const startCommand = function (bot: any) {
  return (msg: any) => {
    const chatId = msg.chat.id
    const newUser = new User({ chatId: msg.from.id, username: msg.from.id })
    newUser.save((err: any, result: any) => {
      let text: string;
      if (err) {
        console.log(err);
        text= `Привет!\nПочему-то произошла ошибка при сохранении твоих данных. Пожалуйста, сообщи об этом админу`
      }
      else {
        console.log(result)
        text= `Привет!\nЭтот бот создан для того, чтобы ты мог рассказать, как вкусно ты покушал`
      }
      bot.sendMessage(chatId, text)
    })

  }
}