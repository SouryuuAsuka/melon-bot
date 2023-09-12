import { createUser } from '../use-case/createUser.use-cases';
import { getStats } from '../use-case/getStats.use-cases';
import TelegramBot from 'node-telegram-bot-api';

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
      await getStats(bot, msg);
    }
    catch (error) {
      console.log(error);
    }
  }
}