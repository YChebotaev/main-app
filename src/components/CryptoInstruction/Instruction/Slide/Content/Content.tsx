import { type FC, type CSSProperties, type ReactNode } from 'react'
import cn from 'classnames'

import classes from './Content.module.css'

export const Content: FC<{ className?: string, style?: CSSProperties, children: ReactNode }> = ({ className, style, children }) => (
  <div className={cn(classes.content, className)} style={style}>
    {children}
  </div>
)
