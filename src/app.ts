'use strict';

import Fastify from 'fastify'
import TelegramBot from 'node-telegram-bot-api';
import mongoose from 'mongoose';

const token = process.env.MELON_TELEGRAM_BOT_TOKEN as string;
const mongoLink = process.env.MELON_MONGODB_URL as string;
const bot = new TelegramBot(token, { polling: true })
import { startCommand } from './controller/user.controller';


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

bot.onText(/\/start/, startCommand(bot));

bot.on('message', (msg) => {
  const chatId = msg.chat.id;

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, 'Received your message');
});