/*
 * @Author: xiaokang1009
 * @Date: 2022-11-16 14:55:31
 * @LastEditors: xiaokang1009
 * @LastEditTime: 2022-11-16 14:58:00
 * @Description:
 */
const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  }
}
