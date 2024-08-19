"use strict";
// 万能转换器
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const fnMap_1 = __importDefault(require("./utils/fnMap"));
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
                source: '源字段',
            },
            'en-US': {
                source: 'Source Field',
            },
            'ja-JP': {
                source: '元フィールド',
            },
        },
    },
    // 定义捷径的入参
    formItems: [
        {
            key: 'changeType',
            label: '预置转换类型',
            component: block_basekit_server_api_1.FieldComponent.SingleSelect,
            props: {
                options: [
                    { label: '二进制转十进制', value: 1 },
                    { label: '二进制转十六进制', value: 2 },
                    { label: '十进制转二进制', value: 3 },
                    { label: '十进制转十六进制', value: 4 },
                    { label: '十六进制转二进制', value: 5 },
                    { label: '十六进制转十进制', value: 6 },
                    { label: 'RGB 转 HEX', value: 7 },
                    { label: 'HEX 转 RGB', value: 8 },
                ],
            },
        },
        {
            key: 'fun',
            label: '自定义转换函数',
            component: block_basekit_server_api_1.FieldComponent.Input,
            props: {
                placeholder: '请填入函数具体内容（javascript 语言）',
            },
        },
        {
            key: 'source',
            label: t('source'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Number, block_basekit_server_api_1.FieldType.Text, block_basekit_server_api_1.FieldType.DateTime],
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
        const { source, fun, changeType } = formItemParams;
        console.log('tttt', fnMap_1.default['bab'], changeType, fnMap[changeType.value], fnMap_1.default[fnMap[changeType.value]]);
        // 数字类型 source 直接为值
        //  文本类型 source 为 [{ type: 'text , text '8'}]
        const sourceValue = Array.isArray(source) && source.length > 0 ? source[0].text : source;
        let targetValueFun = new Function('return ' + fun)();
        // 选了预置转换类型，则以预置转换类型为准
        let targetValue = changeType ? fnMap_1.default[fnMap[changeType.value]](sourceValue) : targetValueFun(sourceValue);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQVE7Ozs7O0FBRVIsbUZBUThDO0FBRTlDLDBEQUF1QztBQUV2QyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsZ0NBQUssQ0FBQztBQUVwQiwyQkFBMkI7QUFDM0Isa0NBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7QUFFcEQsTUFBTSxLQUFLLEdBQUc7SUFDWixDQUFDLEVBQUUsaUJBQWlCO0lBQ3BCLENBQUMsRUFBRSxxQkFBcUI7SUFDeEIsQ0FBQyxFQUFFLGlCQUFpQjtJQUNwQixDQUFDLEVBQUUsc0JBQXNCO0lBQ3pCLENBQUMsRUFBRSxxQkFBcUI7SUFDeEIsQ0FBQyxFQUFFLHNCQUFzQjtJQUN6QixDQUFDLEVBQUUsVUFBVTtJQUNiLENBQUMsRUFBRSxVQUFVO0NBQ2QsQ0FBQztBQUVGLGtDQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2YsZ0JBQWdCO0lBQ2hCLElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsS0FBSzthQUNkO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxjQUFjO2FBQ3ZCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLE1BQU0sRUFBRSxRQUFRO2FBQ2pCO1NBQ0Y7S0FDRjtJQUNELFVBQVU7SUFDVixTQUFTLEVBQUU7UUFDVDtZQUNFLEdBQUcsRUFBRSxZQUFZO1lBQ2pCLEtBQUssRUFBRSxRQUFRO1lBQ2YsU0FBUyxFQUFFLHlDQUFjLENBQUMsWUFBWTtZQUN0QyxLQUFLLEVBQUU7Z0JBQ0wsT0FBTyxFQUFFO29CQUNQLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO29CQUM5QixFQUFFLEtBQUssRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUFFLENBQUMs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