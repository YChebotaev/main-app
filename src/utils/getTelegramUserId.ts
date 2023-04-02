export const getTelegramUserId = () => {
  const t = Reflect.get(window, 'Telegram')

  return t.WebApp.initDataUnsafe.user?.id ?? process.env['REACT_APP_DUMMY_USER_ID']
}
