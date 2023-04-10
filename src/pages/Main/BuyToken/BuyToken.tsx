import { type FC } from 'react'

import classes from './BuyToken.module.css'
import { Button } from '../../../components/Button'

export const BuyToken: FC = () => (
  <div className={classes.buyToken}>
    <div className={classes.title}>
      Покупка токена MAIN
      <span className={classes.smallMainLogo} />
    </div>
    <div className={classes.info}>
      <div className={classes.number}>75.000.000</div>
      <div className={classes.text}>токенов MAIN готовы к продаже</div>
    </div>
    <Button unstyled className={classes.button2} to="/investments/buy">Купить токен MAIN</Button>
    <div className={classes.coin1} />
    <div className={classes.coin2} />
  </div>
)
