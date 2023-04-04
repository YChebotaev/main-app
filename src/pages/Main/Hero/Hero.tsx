import { type FC } from 'react'
import { Button } from '../../../components/Button'

import classes from './Hero.module.css'

export const Hero: FC = () => (
  <div className={classes.hero}>
    <div className={classes.header}>Покупка токена MAIN</div>
    <div className={classes.info}>
      <div className={classes.infoLeft}>
        <div className={classes.primary}>2.345</div>
        <div className={classes.secondary}>платежей мы провели</div>
      </div>
      <div className={classes.infoRight}>
        <div className={classes.primary}>175.000.000</div>
        <div className={classes.secondary}>токенов MAIN готовы к продаже</div>
      </div>
    </div>
    <Button className={classes.button} to="/investments">Купить токен MAIN</Button>
    <div className={classes.secondary}>* Токены других популярных криптовалютных систем будут доступны в скором времени</div>
  </div>
)
