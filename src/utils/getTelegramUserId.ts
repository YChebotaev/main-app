import { getTelegramUser } from './getTelegramUser'

export const getTelegramUserId = () => {
  const user = getTelegramUser()

  return user?.id ?? process.env['REACT_APP_DUMMY_USER_ID']
}
