import { createUser } from '../use-case/createUser.use-cases';
import { getStats } from '../use-case/getStats.use-cases';
import TelegramBot from 'node-telegram-bot-api';

const botOwner = process.env.BOT_OWNER as string;

export const startCommand = function (bot: TelegramBot) {
  return async (msg: any) => {
    try {
      await createUser(bot, msg);
    }
    catch (error) {
      console.log(error);
    }
  }
}

export const statsCommand = function (bot: TelegramBot) {
  return async (msg: any) => {
    try {
      if(msg.from.id === botOwner){
        await getStats(bot, msg);
      } else {
        const text = 'Эта команда доступна только администраторам';
        bot.sendMessage(msg.from.id, text)
      }
    }
    catch (error) {
      console.log(error);
    }
  }
}