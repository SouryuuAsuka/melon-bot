import Post from '../model/post.model';
import TelegramBot from 'node-telegram-bot-api';

const botOwner = process.env.BOT_OWNER as string;

export const deletePost = async (bot: TelegramBot, callbackQuery: any) => {
  const msg = callbackQuery.message;
  const post = await Post.findOne({ keyboardId: msg.message_id })
  if (post?.postId && post?.keyboardId && post.ownerId && post.creatorId) {
    bot.sendMessage(botOwner, 'Че, реально удаляешь?(\nТогда он удалится и с самого канала', {
      reply_markup: {
        inline_keyboard: [[
          {
            text: "Да",
            callback_data: JSON.stringify({
              act: "confDelPost",
              id: post?.keyboardId
            })
          },
          {
            text: "Нет",
            callback_data: JSON.stringify({
              act: "cancelDelPost",
            })
          }
        ]]
      }
    })
  } else {
    const text = "Ошибка при удалении поста";
    bot.sendMessage(post?.ownerId ?? botOwner, text);
  }
  return true;
}