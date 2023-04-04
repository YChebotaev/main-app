import { useEffect, type FC, type ReactNode } from 'react'
import cn from 'classnames'

import classes from './Backdrop.module.css'

export const Backdrop: FC<{
  className?: string
  children: ReactNode
}> = ({ className, children }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.removeProperty('overflow')
    }
  }, [])

  return (
    <div className={cn(classes.backdrop, className)}>
      {children}
    </div>
  )
}
