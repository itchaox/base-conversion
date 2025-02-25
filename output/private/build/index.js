"use strict";
// FIXME 万能转换器
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const Conversion = require('./utils/fnMap');
const { t } = block_basekit_server_api_1.field;
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['api.exchangerate-api.com']);
const fnMap = {
    1: 'BinaryToDecimal',
    2: 'BinaryToHexadecimal',
    3: 'DecimalToBinary',
    4: 'DecimalToHexadecimal',
    5: 'HexadecimalToBinary',
    6: 'HexadecimalToDecimal',
    7: 'RGBToHEX',
    8: 'HEXToRGB',
    12: 'SecondToTime',
    13: 'MillisecondToTime',
    14: 'MD5',
    15: 'SHA256',
    16: 'SHA1',
    17: 'DateToTimestamp',
    18: 'DateToSecond',
};
block_basekit_server_api_1.basekit.addField({
    // 定义捷径的i18n语言资源
    i18n: {
        messages: {
            'zh-CN': {
                source: '选择待转换的字段',
                changeType: '预置转换类型',
                fun: '自定义转换函数',
                placeholder: '请填写具体的 JavaScript 转换函数',
                p1: '请选择文本、数字或日期类型字段',
                0: '自定义转换函数',
                1: '二进制 -> 十进制',
                2: '二进制 -> 十六进制',
                3: '十进制 -> 二进制',
                4: '十进制 -> 十六进制',
                5: '十六进制 -> 二进制',
                6: '十六进制 -> 十进制',
                7: 'RGB -> HEX',
                8: 'HEX -> RGB',
                9: '当未选择『自定义转换函数』时，将使用所选的预置转换类型进行转换。',
                10: '更多详情，请参考',
                11: ' 使用文档',
                12: '时间戳（秒） -> 年/月/日 时:分',
                13: '时间戳（毫秒） -> 年/月/日 时:分',
                14: 'MD5',
                15: 'SHA256',
                16: 'SHA1',
                17: '任意日期格式 -> 时间戳(毫秒)',
                18: '任意日期格式 -> 时间戳(秒)',
            },
            'en-US': {
                source: 'Select the field to convert',
                changeType: 'Preset Conversion Type',
                fun: 'Custom Conversion Function',
                placeholder: 'Please provide the specific JavaScript conversion function.',
                p1: 'Please select a text, number or date type field.',
                0: 'Custom conversion function',
                1: 'Binary -> Decimal',
                2: 'Binary -> Hexadecimal',
                3: 'Decimal -> Binary',
                4: 'Decimal -> Hexadecimal',
                5: 'Hexadecimal -> Binary',
                6: 'Hexadecimal -> Decimal',
                7: 'RGB -> HEX',
                8: 'HEX -> RGB',
                9: 'If the “Custom conversion function” option is not selected, the conversion will use the chosen preset conversion type.',
                10: 'For more details, please refer to',
                11: ' User documentation',
                12: 'Timestamp (seconds) -> YYYY/MM/DD HH:mm',
                13: 'Timestamp (milliseconds) -> YYYY/MM/DD HH:mm',
                14: 'MD5',
                15: 'SHA256',
                16: 'SHA1',
                17: 'Any date format -> timestamp (milliseconds)',
                18: 'Any date format -> timestamp (seconds)',
            },
            'ja-JP': {
                source: '変換するフィールドを選択',
                changeType: 'プリセット変換タイプ',
                fun: 'カスタム変換関数',
                placeholder: '具体的なJavaScript変換関数を記入してください。',
                p1: 'テキスト、数値、日付タイプのフィールドを選択してください。',
                0: 'カスタム変換関数',
                1: 'バイナリ -> 十進法',
                2: 'バイナリ -> 十六進法',
                3: '十進法 -> バイナリ',
                4: '十進法 -> 十六進法',
                5: '十六進法 -> バイナリ',
                6: '十六進法 -> 十進法',
                7: 'RGB -> HEX',
                8: 'HEX -> RGB',
                9: '「カスタム変換関数」が選択されていない場合は、選択したプリセット変換タイプを使用して変換を行います。',
                10: '詳細については、参照してください',
                11: ' 使用文書',
                12: 'タイムスタンプ（秒） -> 年/月/日 時:分',
                13: 'タイムスタンプ（ミリ秒） -> 年/月/日 時:分',
                14: 'MD5',
                15: 'SHA256',
                16: 'SHA1',
                17: '任意の日付形式 -> タイムスタンプ (ミリ秒)',
                18: '任意の日付形式 -> タイムスタンプ (秒)',
            },
        },
    },
    // 定义捷径的入参
    formItems: [
        {
            key: 'source',
            label: t('source'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Number, block_basekit_server_api_1.FieldType.Text, block_basekit_server_api_1.FieldType.DateTime],
                placeholder: t('p1'),
            },
            validator: {
                required: true,
            },
        },
        {
            key: 'changeType',
            label: t('changeType'),
            component: block_basekit_server_api_1.FieldComponent.SingleSelect,
            tooltips: [
                {
                    type: 'text',
                    content: t('9'),
                },
            ],
            props: {
                options: [
                    { label: t('0'), value: 0 },
                    { label: t('1'), value: 1 },
                    { label: t('2'), value: 2 },
                    { label: t('3'), value: 3 },
                    { label: t('4'), value: 4 },
                    { label: t('5'), value: 5 },
                    { label: t('6'), value: 6 },
                    { label: t('7'), value: 7 },
                    { label: t('8'), value: 8 },
                    { label: t('12'), value: 12 },
                    { label: t('13'), value: 13 },
                    { label: t('14'), value: 14 },
                    { label: t('15'), value: 15 },
                    { label: t('16'), value: 16 },
                    { label: t('17'), value: 17 },
                    { label: t('18'), value: 18 },
                ],
            },
            validator: {
                required: true,
            },
        },
        {
            key: 'fun',
            label: t('fun'),
            component: block_basekit_server_api_1.FieldComponent.Input,
            props: {
                placeholder: t('placeholder'),
            },
            tooltips: [
                {
                    type: 'text',
                    content: t('10'),
                },
                {
                    type: 'link',
                    text: t('11'),
                    link: 'https://bcmcjimpjd.feishu.cn/base/I7AWbeSTLafqaJsTJ4BcmCF2nMg?table=ldxyob7oZYiCcGzh',
                },
            ],
        },
    ],
    // 定义捷径的返回结果类型
    resultType: {
        type: block_basekit_server_api_1.FieldType.Text,
    },
    // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
    execute: async (formItemParams) => {
        const { source, fun, changeType } = formItemParams;
        // 数字类型 source 直接为值
        //  文本类型 source 为 [{ type: 'text , text '8'}]
        const sourceValue = Array.isArray(source) && source.length > 0 ? source[0].text : source;
        let targetValueFun = '';
        if (changeType.value === 0) {
            targetValueFun = new Function('return ' + fun)();
        }
        // 选了预置转换类型，则以预置转换类型为准
        let targetValue = '';
        if (changeType.value !== 0) {
            targetValue = Conversion[fnMap[changeType.value]](sourceValue);
        }
        else {
            if (typeof targetValueFun === 'function') {
                targetValue = targetValueFun(sourceValue);
            }
        }
        try {
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: String(targetValue),
            };
        }
        catch (e) {
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7O0FBRWQsbUZBQTRHO0FBRTVHLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUU1QyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsZ0NBQUssQ0FBQztBQUVwQiwyQkFBMkI7QUFDM0Isa0NBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7QUFFcEQsTUFBTSxLQUFLLEdBQUc7SUFDWixDQUFDLEVBQUUsaUJBQWlCO0lBQ3BCLENBQUMsRUFBRSxxQkFBcUI7SUFDeEIsQ0FBQyxFQUFFLGlCQUFpQjtJQUNwQixDQUFDLEVBQUUsc0JBQXNCO0lBQ3pCLENBQUMsRUFBRSxxQkFBcUI7SUFDeEIsQ0FBQyxFQUFFLHNCQUFzQjtJQUN6QixDQUFDLEVBQUUsVUFBVTtJQUNiLENBQUMsRUFBRSxVQUFVO0lBQ2IsRUFBRSxFQUFFLGNBQWM7SUFDbEIsRUFBRSxFQUFFLG1CQUFtQjtJQUN2QixFQUFFLEVBQUUsS0FBSztJQUNULEVBQUUsRUFBRSxRQUFRO0lBQ1osRUFBRSxFQUFFLE1BQU07SUFDVixFQUFFLEVBQUUsaUJBQWlCO0lBQ3JCLEVBQUUsRUFBRSxjQUFjO0NBQ25CLENBQUM7QUFFRixrQ0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNmLGdCQUFnQjtJQUNoQixJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLFVBQVU7Z0JBQ2xCLFVBQVUsRUFBRSxRQUFRO2dCQUNwQixHQUFHLEVBQUUsU0FBUztnQkFDZCxXQUFXLEVBQUUsd0JBQXdCO2dCQUNyQyxFQUFFLEVBQUUsaUJBQWlCO2dCQUNyQixDQUFDLEVBQUUsU0FBUztnQkFDWixDQUFDLEVBQUUsWUFBWTtnQkFDZixDQUFDLEVBQUUsYUFB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