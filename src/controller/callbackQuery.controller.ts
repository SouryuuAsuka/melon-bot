import { giveMelon } from '../use-case/giveMelon.use-cases';
import { cancelMelon } from '../use-case/cancelMelon.use-cases';
import { deletePost } from '../use-case/deletePost.use-cases';
import { sendPost } from '../use-case/sendPost.use-cases';
import { cancelPost } from '../use-case/cancelPost.use-cases';
import { confDeletePost } from '../use-case/confDeletePost.use-cases';
import { cancelDeletePost } from '../use-case/cancelDeletePost.use-cases';
import TelegramBot  from 'node-telegram-bot-api';

export const callbackQueryBot = function (bot: TelegramBot) {
  return async (callbackQuery: any) => {
    try {
      const callbackData = callbackQuery.data ?? '';
      const data = JSON.parse(callbackData);
      if (data.act === 'giveMelon') {
        const status = Array.from(data.st).map((item) => {
          if (item === 't') return true
          else return false
        })
        if (status[1]) {
          await cancelMelon(bot, callbackQuery);
        } else {
          await giveMelon(bot, callbackQuery);
        }
      } else if (data.act === 'delPost') {
        await deletePost(bot, callbackQuery);
      } else if (data.act === 'confDelPost') {
        await confDeletePost(bot, callbackQuery);
      } else if (data.act === 'cancelDelPost') {
        await cancelDeletePost(bot, callbackQuery);
      } else if (data.act === 'sendPost') {
        const status = Array.from(data.st).map((item) => {
          if (item === 't') return true
          else return false
        })
        if (status[0]) {
          await cancelPost(bot, callbackQuery);
        } else {
          await sendPost(bot, callbackQuery);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}