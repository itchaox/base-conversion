"use strict";
// 万能转换器
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
};
block_basekit_server_api_1.basekit.addField({
    // 定义捷径的i18n语言资源
    i18n: {
        messages: {
            'zh-CN': {
                source: '选择待转换的字段',
                changeType: '预置转换类型（主要）',
                fun: '自定义转换函数',
                placeholder: '请填入具体的转换函数（仅支持 javascript 语言）',
                1: '二进制 -> 十进制',
                2: '二进制 -> 十六进制',
                3: '十进制 -> 二进制',
                4: '十进制 -> 十六进制',
                5: '十六进制 -> 二进制',
                6: '十六进制 -> 十进制',
                7: 'RGB -> HEX',
                8: 'HEX -> RGB',
                p1: '请选择文本或数字类型字段',
            },
            'en-US': {
                source: 'Select the field to convert',
                changeType: 'Preset Conversion Type (Primary)',
                fun: 'Custom Conversion Function',
                placeholder: 'Please enter the specific conversion function (JavaScript language only)',
                1: 'Binary -> Decimal',
                2: 'Binary -> Hexadecimal',
                3: 'Decimal -> Binary',
                4: 'Decimal -> Hexadecimal',
                5: 'Hexadecimal -> Binary',
                6: 'Hexadecimal -> Decimal',
                7: 'RGB -> HEX',
                8: 'HEX -> RGB',
                p1: 'Please select a text or numeric field.',
            },
            'ja-JP': {
                source: '変換するフィールドを選択',
                changeType: 'プリセット変換タイプ（主要）',
                fun: 'カスタム変換関数',
                placeholder: '具体的な変換関数を入力してください（JavaScriptのみ対応）',
                1: 'バイナリ -> 十進法',
                2: 'バイナリ -> 十六進法',
                3: '十進法 -> バイナリ',
                4: '十進法 -> 十六進法',
                5: '十六進法 -> バイナリ',
                6: '十六進法 -> 十進法',
                7: 'RGB -> HEX',
                8: 'HEX -> RGB',
                p1: 'テキストまたは数値型のフィールドを選択してください。',
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
                supportType: [block_basekit_server_api_1.FieldType.Number, block_basekit_server_api_1.FieldType.Text],
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
            props: {
                options: [
                    { label: t('1'), value: 1 },
                    { label: t('2'), value: 2 },
                    { label: t('3'), value: 3 },
                    { label: t('4'), value: 4 },
                    { label: t('5'), value: 5 },
                    { label: t('6'), value: 6 },
                    { label: t('7'), value: 7 },
                    { label: t('8'), value: 8 },
                ],
            },
        },
        {
            key: 'fun',
            label: t('fun'),
            component: block_basekit_server_api_1.FieldComponent.Input,
            props: {
                placeholder: t('placeholder'),
            },
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
        let targetValueFun = new Function('return ' + fun)();
        // 选了预置转换类型，则以预置转换类型为准
        let targetValue = changeType ? Conversion[fnMap[changeType.value]](sourceValue) : targetValueFun(sourceValue);
        try {
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: targetValue,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQVE7O0FBRVIsbUZBUThDO0FBRTlDLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUU1QyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsZ0NBQUssQ0FBQztBQUVwQiwyQkFBMkI7QUFDM0Isa0NBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7QUFFcEQsTUFBTSxLQUFLLEdBQUc7SUFDWixDQUFDLEVBQUUsaUJBQWlCO0lBQ3BCLENBQUMsRUFBRSxxQkFBcUI7SUFDeEIsQ0FBQyxFQUFFLGlCQUFpQjtJQUNwQixDQUFDLEVBQUUsc0JBQXNCO0lBQ3pCLENBQUMsRUFBRSxxQkFBcUI7SUFDeEIsQ0FBQyxFQUFFLHNCQUFzQjtJQUN6QixDQUFDLEVBQUUsVUFBVTtJQUNiLENBQUMsRUFBRSxVQUFVO0NBQ2QsQ0FBQztBQUVGLGtDQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2YsZ0JBQWdCO0lBQ2hCLElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsVUFBVTtnQkFDbEIsVUFBVSxFQUFFLFlBQVk7Z0JBQ3hCLEdBQUcsRUFBRSxTQUFTO2dCQUNkLFdBQVcsRUFBRSwrQkFBK0I7Z0JBQzVDLENBQUMsRUFBRSxZQUFZO2dCQUNmLENBQUMsRUFBRSxhQUFhO2dCQUNoQixDQUFDLEVBQUUsWUFBWTtnQkFDZixDQUFDLEVBQUUsYUFBYTtnQkFDaEIsQ0FBQyxFQUFFLGFBQWE7Z0JBQ2hCLENBQUMsRUFBRSxhQUFhO2dCQUNoQixDQUFDLEVBQUUsWUFBWTtnQkFDZixDQUFDLEVBQUUsWUFBWTtnQkFDZixFQUFFLEVBQUUsY0FBYzthQUNuQjtZQUNELE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsNkJB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