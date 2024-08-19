"use strict";
// 进制转换
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['api.exchangerate-api.com']);
block_basekit_server_api_1.basekit.addField({
    // 定义捷径的i18n语言资源
    i18n: {
        messages: {
            'zh-CN': {
                sourceType: '源进制类型',
                targetType: '目标进制类型',
                source: '源字段',
                2: '二进制',
                8: '八进制',
                10: '十进制',
                16: '十六进制',
                invalid: '无效的转换类型',
            },
            'en-US': {
                sourceType: 'Source Type',
                targetType: 'Target Type',
                source: 'Source Field',
                2: 'Binary',
                8: 'Octal',
                10: 'Decimal',
                16: 'Hexadecimal',
                invalid: 'Invalid Conversion Type',
            },
            'ja-JP': {
                sourceType: '元進数タイプ',
                targetType: '目標進数タイプ',
                source: '元フィールド',
                2: '二進数',
                8: '八進数',
                10: '十進数',
                16: '十六進数',
                invalid: '無効な変換タイプ',
            },
        },
    },
    // 定义捷径的入参
    formItems: [
        {
            key: 'sourceType',
            label: t('sourceType'),
            component: block_basekit_server_api_1.FieldComponent.SingleSelect,
            props: {
                options: [
                    { label: t('2'), value: '2' },
                    { label: t('8'), value: '8' },
                    { label: t('10'), value: '10' },
                    { label: t('16'), value: '16' },
                ],
            },
            validator: {
                required: true,
            },
        },
        {
            key: 'targetType',
            label: t('targetType'),
            component: block_basekit_server_api_1.FieldComponent.SingleSelect,
            props: {
                options: [
                    { label: t('2'), value: '2' },
                    { label: t('8'), value: '8' },
                    { label: t('10'), value: '10' },
                    { label: t('16'), value: '16' },
                ],
            },
            validator: {
                required: true,
            },
        },
        {
            key: 'source',
            label: t('source'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                // supportType: [FieldType.Number, FieldType.Text],
                supportType: [block_basekit_server_api_1.FieldType.Number],
            },
            validator: {
                required: true,
            },
        },
    ],
    // 定义捷径的返回结果类型
    resultType: {
        type: block_basekit_server_api_1.FieldType.Text,
    },
    // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
    execute: async (formItemParams) => {
        const { sourceType, targetType, source } = formItemParams;
        // 数字类型 source 直接为值
        //  文本类型 source 为 [{ type: 'text , text '8'}]
        const sourceValue = Array.isArray(source) && source.length > 0 ? source[0].text : source;
        function convertNumber(sourceType, targetType, input) {
            const type = sourceType.value + 'To' + targetType.value;
            let decimal;
            switch (type) {
                case '2To10': // 二进制转十进制
                    return parseInt(input, 2);
                case '2To8': // 二进制转八进制
                    decimal = parseInt(input, 2);
                    return decimal.toString(8);
                case '2To16': // 二进制转十六进制
                    decimal = parseInt(input, 2);
                    return decimal.toString(16).toUpperCase();
                case '8To2': // 八进制转二进制
                    decimal = parseInt(input, 8);
                    return decimal.toString(2);
                case '8To10': // 八进制转十进制
                    return parseInt(input, 8);
                case '8To16': // 八进制转十六进制
                    decimal = parseInt(input, 8);
                    return decimal.toString(16).toUpperCase();
                case '10To2': // 十进制转二进制
                    return Number(input).toString(2);
                case '10To8': // 十进制转八进制
                    return Number(input).toString(8);
                case '10To16': // 十进制转十六进制
                    return Number(input).toString(16).toUpperCase();
                case '16To2': // 十六进制转二进制
                    decimal = parseInt(input, 16);
                    return decimal.toString(2);
                case '16To8': // 十六进制转八进制
                    decimal = parseInt(input, 16);
                    return decimal.toString(8);
                case '16To10': // 十六进制转十进制
                    return parseInt(input, 16);
                default:
                    return t('invalid');
            }
        }
        let targetValue = convertNumber(sourceType, targetType, sourceValue);
        try {
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: targetValue.toLowerCase(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS1jb252ZXJzaW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2Jhc2UtY29udmVyc2lvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTzs7QUFFUCxtRkFROEM7QUFDOUMsTUFBTSxFQUFFLENBQUMsRUFBRSxHQUFHLGdDQUFLLENBQUM7QUFFcEIsMkJBQTJCO0FBQzNCLGtDQUFPLENBQUMsYUFBYSxDQUFDLENBQUMsMEJBQTBCLENBQUMsQ0FBQyxDQUFDO0FBRXBELGtDQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2YsZ0JBQWdCO0lBQ2hCLElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRTtnQkFDUCxVQUFVLEVBQUUsT0FBTztnQkFDbkIsVUFBVSxFQUFFLFFBQVE7Z0JBQ3BCLE1BQU0sRUFBRSxLQUFLO2dCQUNiLENBQUMsRUFBRSxLQUFLO2dCQUNSLENBQUMsRUFBRSxLQUFLO2dCQUNSLEVBQUUsRUFBRSxLQUFLO2dCQUNULEVBQUUsRUFBRSxNQUFNO2dCQUNWLE9BQU8sRUFBRSxTQUFTO2FBQ25CO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLFVBQVUsRUFBRSxhQUFhO2dCQUN6QixVQUFVLEVBQUUsYUFBYTtnQkFDekIsTUFBTSxFQUFFLGNBQWM7Z0JBQ3RCLENBQUMsRUFBRSxRQUFRO2dCQUNYLENBQUMsRUFBRSxPQUFPO2dCQUNWLEVBQUUsRUFBRSxTQUFTO2dCQUNiLEVBQUUsRUFBRSxhQUFhO2dCQUNqQixPQUFPLEVBQUUseUJBQXlCO2FBQ25DO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLFVBQVUsRUFBRSxRQUFRO2dCQUNwQixVQUFVLEVBQUUsU0FBUztnQkFDckIsTUFBTSxFQUFFLFFBQVE7Z0JBQ2hCLENBQUMsRUFBRSxLQUFLO2dCQUNSLENBQUMsRUFBRSxLQUFLO2dCQUNSLEVBQUUsRUFBRSxLQUFLO2dCQUNULEVBQUUsRUFBRSxNQUFNO2dCQUNWLE9BQU8sRUFBRSxVQUFV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