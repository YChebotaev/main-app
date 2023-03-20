import { type FC, type CSSProperties, type ReactNode } from 'react'
import cn from 'classnames'

import classes from './Title.module.css'

export const Title: FC<{ className?: string, style?: CSSProperties, children: ReactNode }> = ({ className, style, children }) => (
  <div className={cn(classes.title, className)} style={style}>
    {children}
  </div>
)
