import { useUpdate } from 'ahooks'
import { equals, filter, isNil, map, not } from 'ramda'
import {
  ReactElement,
  JSXElementConstructor,
  useRef,
  useState,
  useLayoutEffect,
  RefObject,
  useEffect,
  memo
} from 'react'
import ReactDOM from 'react-dom'

// 定义 children 类型
type Children = ReactElement<any, string | JSXElementConstructor<any>> | null

// 定义 keepAlive 组件的 props 类型
interface Props {
  active?: string
  isAsyncInclude: boolean // 是否异步添加 Include  如果不是又填写了 true 会导致重复渲染
  include?: string[]
  exclude?: string[]
  maxLen?: number
  children: Children
}

const KeepAlive = (props: Props) => {
  const { active, children, include, exclude, isAsyncInclude, maxLen = 10 } = props
  const containerRef = useRef<HTMLDivElement>(null)
  const components = useRef<Array<{ name: string; ele: Children }>>([])
  const [asyncInclude] = useState<boolean>(isAsyncInclude)
  const update = useUpdate()
  useLayoutEffect(() => {
    if (isNil(active)) {
      return
    }
    // 缓存超上限的
    if (components.current.length >= maxLen) {
      components.current.shift()
    }
    // 添加
    const component = components.current.find(item => equals(item.name, active))
    if (isNil(component)) {
      components.current = [...components.current, { name: active, ele: children }]
    }
    if (not(asyncInclude)) {
      update()
    }
    return () => {
      if (isNil(exclude) && isNil(include)) {
        return
      }
      components.current = filter(({ name }) => {
        if (exclude && exclude.includes(name)) {
          return false
        }
        if (include) {
          return include.includes(name)
        }
        return true
      }, components.current)
    }
  }, [children, active, asyncInclude, exclude, include, maxLen, update])
  return (
    <>
      <div ref={containerRef} className='keep-alive'></div>
      {map(({ name, ele }) => {
        ;<Component active={equals(name, active)} name={name} renderDiv={containerRef}>
          {ele}
        </Component>
      }, components.current)}
    </>
  )
}
export default memo(KeepAlive)
// 定义 Component 的 props 类型
interface ComponentProps {
  active: boolean
  children: Children
  name: string
  renderDiv: RefObject<HTMLDivElement>
}

const Component = (props: ComponentProps) => {
  const { active, children, name, renderDiv } = props
  const [targetElement] = useState(() => document.createElement('div'))
  const activatedRef = useRef(false)
  useEffect(() => {
    if (active) {
      renderDiv.current?.appendChild(targetElement)
    } else {
      try {
        renderDiv.current?.removeChild(targetElement)
      } catch (e) {
        console.log(e)
      }
    }
  }, [active, name, renderDiv, targetElement])
  useEffect(() => {
    targetElement.setAttribute('id', name)
  }, [active, name, renderDiv, targetElement])
  return <>{activatedRef.current && ReactDOM.createPortal(children, targetElement)}</>
}
