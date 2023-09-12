import { InputMediaPhoto, InputMediaVideo } from 'node-telegram-bot-api';

export default function getMediaArray (msg: any): Array<InputMediaPhoto | InputMediaVideo> {
  let media: Array<InputMediaPhoto | InputMediaVideo> = []
  if (Array.isArray(msg.photo) && msg.photo.length > 0) {
    for (let i = 0; i < msg.photo.length; i++) {
      if (media.length == 0) {
        media.push({ type: 'photo', media: msg.photo[i].file_id, caption:msg.text });
      }else {
        media.push({ type: 'photo', media: msg.photo[i].file_id });
      }
      media.push({ type: 'photo', media: msg.photo[i].file_id });
    }
  }
  if (Array.isArray(msg.video) && msg.video.length > 0) {
    for (let i = 0; i < msg.video.length; i++) {
      if (media.length == 0) {
        media.push({ type: 'video', media: msg.video[i].file_id, caption:msg.text  });
      } else {
        media.push({ type: 'video', media: msg.video[i].file_id });
      }
    }
  }
  return media;
}