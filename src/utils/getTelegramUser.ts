export const getTelegramUser = (): {
  id: string
  isBot: boolean
  first_name: string
  last_name: string
  username: string
  language_code: string
  photo_url: string
} => {
  const t = Reflect.get(window, 'Telegram')

  return t.WebApp.initDataUnsafe.user
}
