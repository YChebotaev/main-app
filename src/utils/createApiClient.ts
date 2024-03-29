import axios from 'axios'

export const createApiClient = () => {
  const client = axios.create({
    baseURL: process.env['REACT_APP_BACKEND_URL']
  })
  const nummaApiClient = axios.create({
    baseURL: process.env['REACT_APP_NUMMA_API_URL']
  })

  return {
    async signUpWebinar({ userId }: { userId: string }) {
      const { data } = await client.post('/sign_up_webinar', {
        user_id: userId
      })

      return data
    },
    crypto: {
      async purchase({
        userId,
        amountOfMoney,
        mainCourse,
        bank,
        city,
        coinType,
        getMoney,
        phoneNumber,
        purchaseType,
      }: {
        userId: string
        amountOfMoney: number
        mainCourse: number
        bank?: string
        city?: string
        coinType: string
        getMoney: number
        phoneNumber?: string
        purchaseType: string
      }) {
        const { data } = await client.post('/crypto/purchase', {
          user_id: userId,
          amount_of_money: amountOfMoney,
          main_course: mainCourse,
          bank: bank,
          city: city,
          coin_type: coinType,
          get_money: getMoney,
          phone_number: phoneNumber,
          purchase_type: purchaseType
        })

        return data
      },
      async walletAddress({ userId, address }: { userId: string, address: string }) {
        const { data } = await client.post('/crypto/wallet_address', {
          user_id: userId,
          address
        })

        return data
      },
      async walletAddressByUserId(userId: string) {
        const { data } = await client.get<{ address: string }>(`/crypto/wallet_address/${userId}`)

        return data
      }
    },
    numma: {
      currencyExchange: {
        async currencyExchanges({ fromFiat }: { fromFiat?: string }): Promise<{
          from_trade_methods: {
            trade_method: string
            trade_method_name: string
          }[]
        }> {
          const { data } = await nummaApiClient.get('/currency_exchange/currency_exchanges', {
            params: {
              from_fiat: fromFiat
            }
          })

          return data
        },
        async mainExchange({ fromFiat, fromTradeMethod, amount }: { fromFiat: string, fromTradeMethod: string, amount: number }): Promise<{
          client_bnb: number
          client_main: number
          client_usdt: number
          commission: number
          currency_exchange: number
          from_usdt: number
          operation_status: {
            status: string
            message: string
            code: number | null
          }
          service_commission_usdt: number
          min_amount?: number
          max_amount?: number
        }> {
          const { data } = await nummaApiClient.get('/currency_exchange/main_exchange', {
            params: {
              from_fiat: fromFiat,
              from_trade_method: fromTradeMethod,
              amount
            }
          })

          return data
        },
        async cryptoExchange({ fromCrypto, amount }: { fromCrypto: string, amount: number }) {
          const { data } = await nummaApiClient.get('/currency_exchange/crypto_exchange', {
            params: {
              from_crypto: fromCrypto,
              amount
            }
          })

          return data
        }
      }
    }
  }
}
