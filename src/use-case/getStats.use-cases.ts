import TelegramBot from 'node-telegram-bot-api';
import User from '../model/user.model';

export const getStats = async (bot: TelegramBot, callbackQuery: any) => {
  const users = await User.find({ score: { $gt: 0 } }).sort({ score: -1 }).limit(10);
  let text = `Рейтинг дынных чуваков:\n\n`
  users.forEach((user, index)=>{
    text+= (index+1)+') '+user.firstname??'' + ' ' + user.lastname??'' + ' - '+  user.score + ' динь\n';
  })
}