import { randomColor, randomFont, randomText } from '@/utils/random'
import { FC, useEffect, useImperativeHandle, useState } from 'react'

interface IProps {
  changeCaptcha: (captchaId: string) => void
  cRef?: React.RefObject<any>
}

export const Captcha: FC<IProps> = props => {
  const { changeCaptcha } = props
  const [resultUrl, setResultUrl] = useState<string>('')
  const [captchaId, setCaptchaId] = useState<string>(randomText)

  const canvas = document.createElement('canvas')
  canvas.width = 120
  canvas.height = 40
  const ctx = canvas.getContext('2d')

  const draw = () => {
    if (ctx) {
      ctx.clearRect(0, 0, 120, 40)
      ctx.fillStyle = 'rgba(0,0,0,.5)'
      ctx.fillRect(0, 0, 120, 40)
      ctx.fillStyle = randomColor()
      ctx.font = randomFont()
      ctx.fillText(captchaId, (Math.random() * 100) / 3, 20)
      for (let i = 0; i < 4; i++) {
        ctx.moveTo(Math.random() * 100, Math.random() * 40)
        ctx.lineTo(Math.random() * 100, Math.random() * 40)
        ctx.strokeStyle = randomColor()
        ctx.stroke()
        ctx.beginPath()
      }
      setResultUrl(canvas.toDataURL('image/png', 1))
    }
  }

  const handleClick = () => {
    setCaptchaId(randomText)
    draw()
    changeCaptcha(captchaId)
  }
  useEffect(() => {
    draw()
    changeCaptcha(captchaId)
  }, [captchaId])

  useImperativeHandle(props.cRef, () => ({
    handleClick
  }))
  return (
    <div className='captcha-box' id='captcha'>
      <img
        src={resultUrl}
        onClick={() => {
          handleClick()
        }}
      />
    </div>
  )
}
