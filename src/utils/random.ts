// 生成随机数
export function random(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

export function randomColor() {
  return `rgb(${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)})`
}
// 生成随机文本
export function randomText() {
  const text = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 4; i++) {
    result += text.charAt(random(0, text.length - 1))
  }
  return result
}
// 生成随机字体和字体大小
export function randomFont() {
  const fonts = ['Georgia', 'Times', 'Helvetica', 'Arial', 'Verdana', 'Courier']
  return `${random(18, 24)}px ${fonts[random(0, fonts.length - 1)]}`
}
