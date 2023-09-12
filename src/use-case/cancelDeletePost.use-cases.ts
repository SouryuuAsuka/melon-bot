import TelegramBot  from 'node-telegram-bot-api';

export const cancelDeletePost = async (bot: TelegramBot, callbackQuery: any) => {
  const msg = callbackQuery.message;
  const chatId = msg?.chat?.id;
  const callbackData = callbackQuery.data ?? '';
  const data = JSON.parse(callbackData);
  bot.deleteMessage(chatId, msg.message_id);
  return true;
}