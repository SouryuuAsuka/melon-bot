export default function generateKeyboard(posted: boolean = false, melon: boolean = false) {
  const status = posted ? '1' : '0' + melon ? '1' : '0';
  let melonBtn;
  let postBtn;
  if (melon) {
    melonBtn = {
      text: "🍈 Забрать диню",
      callback_data: JSON.stringify({
        act: "giveMelon",
        st: status
      })
    }
  } else {
    melonBtn = {
      text: "🍈 Дать диню",
      callback_data: JSON.stringify({
        act: "giveMelon",
        st: status
      })
    }
  }
  if (posted) {
    postBtn = {
      text: "❌ Распостить",
      callback_data: JSON.stringify({
        act: "sendPost",
        st: status
      })
    }
  } else {
    postBtn = {
      text: "✅ Запостить",
      callback_data: JSON.stringify({
        act: "sendPost",
        st: status
      })
    }
  }
  const keyboard = [[
    postBtn
  ], [
    melonBtn,
    {
      text: "🔪 Удоли",
      callback_data: JSON.stringify({
        act: "delPost"
      })
    },
  ]]
  return keyboard;
}