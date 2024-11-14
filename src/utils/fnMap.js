/*
 * @Version    : v1.00
 * @Author     : Wang Chao
 * @Date       : 2024-08-19 21:34
 * @LastAuthor : Wang Chao
 * @LastTime   : 2024-11-15 00:43
 * @desc       :
 */

const crypto = require('crypto');

const Conversion = {
  // 二进制转十进制
  BinaryToDecimal: (binary) => {
    return parseInt(binary, 2).toString(10);
  },

  // 二进制转十六进制
  BinaryToHexadecimal: (binary) => {
    return parseInt(binary, 2).toString(16).toLowerCase();
  },

  // 十进制转二进制
  DecimalToBinary: (decimal) => {
    return parseInt(decimal, 10).toString(2);
  },

  // 十进制转十六进制
  DecimalToHexadecimal: (decimal) => {
    return parseInt(decimal, 10).toString(16).toLowerCase();
  },

  // 十六进制转二进制
  HexadecimalToBinary: (hexadecimal) => {
    return parseInt(hexadecimal, 16).toString(2);
  },

  // 十六进制转十进制
  HexadecimalToDecimal: (hexadecimal) => {
    return parseInt(hexadecimal, 16).toString(10);
  },

  // 将 RGB 颜色转换为 HEX 颜色格式
  RGBToHEX: (rgbString) => {
    // 从字符串中解析出 R、G、B 值
    const [r, g, b] = rgbString.split(',').map(Number);

    // 将 R、G、B 值转换为 HEX 格式
    const toHex = (x) => x.toString(16).padStart(2, '0').toUpperCase();
    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  },

  // 将 HEX 颜色格式转换为 RGB 颜色格式
  HEXToRGB: (hex) => {
    // 移除开头的 #
    hex = hex.replace(/^#/, '');

    // 将 HEX 颜色值转换为 RGB 分量
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);

    // 返回 RGB 字符串
    return `${r},${g},${b}`;
  },

  // 秒转年月日时间
  SecondToTime: (timestampInSeconds) => {
    // 将秒级时间戳转换为毫秒级时间戳
    const date = new Date(timestampInSeconds * 1000);

    // 获取年、月、日、小时和分钟
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以加1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // 组合成 "YYYY/MM/DD HH:mm" 格式
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  },

  // 毫秒转年月日时间
  MillisecondToTime: (timestampInMilliseconds) => {
    const date = new Date(Number(timestampInMilliseconds));

    // 获取年、月、日、小时和分钟
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从0开始，所以加1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // 组合成 "YYYY/MM/DD HH:mm" 格式
    return `${year}/${month}/${day} ${hours}:${minutes}`;
  },

  // MD5
  MD5: (data) => {
    return crypto.createHash('md5').update(data).digest('hex');
  },

  // SHA-256
  SHA256: (data) => {
    return crypto.createHash('sha256').update(data).digest('hex');
  },

  // SHA-1
  SHA1: (data) => {
    return crypto.createHash('sha1').update(data).digest('hex');
  },
};

module.exports = Conversion;
