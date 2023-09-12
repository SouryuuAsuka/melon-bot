import Post from '../model/post.model';
import TelegramBot  from 'node-telegram-bot-api';

const botOwner = process.env.BOT_OWNER as string;
const mainChatId = process.env.CHAT_ID as string;

export const confDeletePost = async (bot: TelegramBot, callbackQuery: any) => {
  const msg = callbackQuery.message;
  const chatId = msg?.chat?.id;
  const callbackData = callbackQuery.data ?? '';
  const data = JSON.parse(callbackData);
  const post = await Post.findOneAndDelete({keyboardId: data.id})
  bot.deleteMessage(chatId, msg.message_id);
  if(post?.postId && post?.keyboardId && post.ownerId && post.creatorId ){
    bot.deleteMessage(post.ownerId, post.postId)
    bot.deleteMessage(post.ownerId, post.keyboardId)
    if(post.inChanelPostId){
      bot.deleteMessage(mainChatId, post.inChanelPostId)
    }
  } else {
    const text = "Ошибка при удалении поста";
    bot.sendMessage(post?.ownerId ?? botOwner, text);
  }
  return true;
}