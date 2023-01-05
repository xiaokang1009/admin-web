/*
 * @Author: xiaokang1009
 * @Date: 2022-11-16 17:00:04
 * @LastEditors: xiaokang1009
 * @LastEditTime: 2022-11-16 17:00:22
 * @Description: 全局d,ts
 */
declare module '*.module.css' {
  const classes: { [key: string]: string }
  export default classes
}
declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}
declare module '*.module.sass' {
  const classes: { [key: string]: string }
  export default classes
}
