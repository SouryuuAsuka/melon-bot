'use strict';

import Fastify from 'fastify'
//import * as path from 'path';
import TelegramBot from 'node-telegram-bot-api';

const token = process.env.MELON_TELEGRAM_BOT_TOKEN as string;
const bot = new TelegramBot(token, { polling: true })

// константы
const PORT = 3000;
const app = Fastify({
  logger: true
})

app.listen({ port: PORT }, (err) => {
  if (err) throw err
})

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id
  const text = `Привет!\nЭтот бот создан для того, чтобы ты мог рассказать, как вкусно ты покушал`
  bot.sendMessage(chatId, text)
});