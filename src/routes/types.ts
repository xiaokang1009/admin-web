import type { ReactNode } from 'react'

export interface MenuItem {
  path: string
  name?: string
  element?: ReactNode
  meta: {
    title: string
  }
  children?: MenuItem[]
}

export type MenuChild = Omit<MenuItem, 'children'>
