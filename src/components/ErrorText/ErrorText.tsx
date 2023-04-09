import { type FC, type CSSProperties, type ReactNode } from 'react'
import cn from 'classnames'

import classes from './ErrorText.module.css'

export const ErrorText: FC<{ className?: string, style?: CSSProperties, children: ReactNode }> = ({ className, style, children }) => (
  <div className={cn(classes.errorText, className)} style={style}>
    {children}
  </div>
)
