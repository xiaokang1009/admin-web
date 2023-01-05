import { lazy } from 'react'

const lazyLoad = (path: string) => {
  const Module = lazy(() => import('@/view/dashboard'))
  return <Module />
}

export const importElement = (item: any) => {
  return item.map(item => {
    let children = ''
    if (item.children) {
      children = importElement(item.children)
    } else {
      children = item.children
    }
    return {
      ...item,
      element: lazyLoad(`@/${item.component}`),
      children
    }
  })
}
