import { getMessage } from '../use-case/getMessage.use-cases';
import TelegramBot from 'node-telegram-bot-api';

export const textBot = function (bot: TelegramBot) {
  return async (msg: any) => {
    try {
      await getMessage(bot, msg);
    }
    catch (error) {
      console.log(error);
    }
  }
}