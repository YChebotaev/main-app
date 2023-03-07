import { type FC, type ReactNode } from 'react'

import classes from './Label.module.css'

export const Label: FC<{
  children: ReactNode
}> = ({ children }) => (
  <div className={classes.label}>
    {children}
  </div>
)
