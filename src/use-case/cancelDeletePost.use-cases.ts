import Post from '../model/post.model';
import TelegramBot  from 'node-telegram-bot-api';

const botOwner = process.env.BOT_OWNER as string;
const mainChatId = process.env.CHAT_ID as string;

export const cancelDeletePost = async (bot: TelegramBot, callbackQuery: any) => {
  const msg = callbackQuery.message;
  const chatId = msg?.chat?.id;
  const callbackData = callbackQuery.data ?? '';
  const data = JSON.parse(callbackData);
  bot.deleteMessage(chatId, msg.message_id);
}