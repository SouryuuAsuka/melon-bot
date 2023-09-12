'use strict';

import Fastify from 'fastify'
import TelegramBot from 'node-telegram-bot-api';
import mongoose from 'mongoose';

const token = process.env.MELON_TELEGRAM_BOT_TOKEN as string;
const mongoLink = process.env.MELON_MONGODB_URL as string;
const bot = new TelegramBot(token, { polling: true })
import { textBot } from './controller/text.controller';
import { callbackQueryBot } from './controller/callbackQuery.controller';

function connect() {
  mongoose.connection
    .on('error', console.log)
    .on('disconnected', connect)
  return mongoose.connect(mongoLink, {
    keepAlive: true,
  });
}

// константы
const PORT = 3000;
const app = Fastify({
  logger: true
})
connect();

app.listen({ port: PORT }, (err) => {
  if (err) throw err
})

bot.on('text', textBot(bot));

bot.on('callback_query', callbackQueryBot(bot))
