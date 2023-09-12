import { startCommand } from '../use-case/startCommand.use-cases';
import { getMessage } from '../use-case/getMessage.use-cases';
import { getStats } from '../use-case/getStats.use-cases';
import TelegramBot  from 'node-telegram-bot-api';

export const textBot = function (bot: TelegramBot) {
  return async (msg: any) => {
    try {
      const msgText = msg.text ?? '';
      if (msgText.startsWith('/start')) {
        await startCommand(bot, msg);
      } else if (msgText.startsWith('/stats')) {
        await getStats(bot, msg);
      } else {
        await getMessage(bot, msg);
      }
    }
    catch (error) {
      console.log(error);
    }
  }
}