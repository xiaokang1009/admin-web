import { Spin } from 'antd'

interface Props {
  height?: number
}

const CustomSpin = (props: Props) => {
  const { height = 300 } = props
  return (
    <div
      style={{
        height: height,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%'
      }}
    >
      <Spin />
    </div>
  )
}

export default CustomSpin
