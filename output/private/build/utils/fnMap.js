/*
 * @Version    : v1.00
 * @Author     : Wang Chao
 * @Date       : 2024-08-19 21:34
 * @LastAuthor : Wang Chao
 * @LastTime   : 2025-02-26 00:05
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
    // 任意时间格式 -> 时间戳(毫秒)
    DateToTimestamp: (data) => {
        return data;
    },
    // 任意时间格式 -> 时间戳(秒)
    DateToSecond: (data) => {
        return Math.floor(data / 1000);
    },
};
module.exports = Conversion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm5NYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvZm5NYXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUVILE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQyxNQUFNLFVBQVUsR0FBRztJQUNqQixVQUFVO0lBQ1YsZUFBZSxFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDMUIsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQyxDQUFDO0lBRUQsV0FBVztJQUNYLG1CQUFtQixFQUFFLENBQUMsTUFBTSxFQUFFLEVBQUU7UUFDOUIsT0FBTyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBRUQsVUFBVTtJQUNWLGVBQWUsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQzNCLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELFdBQVc7SUFDWCxvQkFBb0IsRUFBRSxDQUFDLE9BQU8sRUFBRSxFQUFFO1FBQ2hDLE9BQU8sUUFBUSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVELFdBQVc7SUFDWCxtQkFBbUIsRUFBRSxDQUFDLFdBQVcsRUFBRSxFQUFFO1FBQ25DLE9BQU8sUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVELFdBQVc7SUFDWCxvQkFBb0IsRUFBRSxDQUFD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