// 万能转换器

import {
  basekit,
  FieldType,
  field,
  FieldComponent,
  FieldCode,
  NumberFormatter,
  AuthorizationType,
} from '@lark-opdev/block-basekit-server-api';

import Conversion from './utils/fnMap';

const { t } = field;

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['api.exchangerate-api.com']);

const fnMap = {
  1: 'BinaryToDecimal',
  2: 'BinaryToHexadecimal',
  3: 'DecimalToBinary',
  4: 'DecimalToHexadecimal',
  5: 'HexadecimalToBinary',
  6: 'HexadecimalToDecimal',
  7: 'RGBToHEX',
  8: 'HEXToRGB',
  9: 'KGToLB',
  10: 'LBToKG',
};

basekit.addField({
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
      component: FieldComponent.SingleSelect,
      props: {
        options: [
          { label: '二进制 -> 十进制', value: 1 },
          { label: '二进制 -> 十六进制', value: 2 },
          { label: '十进制 -> 二进制', value: 3 },
          { label: '十进制 -> 十六进制', value: 4 },
          { label: '十六进制 -> 二进制', value: 5 },
          { label: '十六进制 -> 十进制', value: 6 },
          { label: 'RGB -> HEX', value: 7 },
          { label: 'HEX -> RGB', value: 8 },
          { label: '千克 -> 磅', value: 9 },
          { label: '磅 -> 千克', value: 10 },
        ],
      },
    },
    {
      key: 'fun',
      label: '自定义转换函数',
      component: FieldComponent.Input,
      props: {
        placeholder: '请填入函数具体内容（javascript 语言）',
      },
    },
    {
      key: 'source',
      label: t('source'),
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Number, FieldType.Text, FieldType.DateTime],
      },
      validator: {
        required: true,
      },
    },
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Text,
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (formItemParams: { changeType: any; source: { type: string; text: string }[] | number; fun: any }) => {
    const { source, fun, changeType } = formItemParams;

    console.log('tttt', Conversion['bab'], changeType, fnMap[changeType.value], Conversion[fnMap[changeType.value]]);

    // 数字类型 source 直接为值
    //  文本类型 source 为 [{ type: 'text , text '8'}]
    const sourceValue = Array.isArray(source) && source.length > 0 ? source[0].text : source;

    let targetValueFun = new Function('return ' + fun)();

    // 选了预置转换类型，则以预置转换类型为准
    let targetValue = changeType ? Conversion[fnMap[changeType.value]](sourceValue) : targetValueFun(sourceValue);

    try {
      return {
        code: FieldCode.Success,
        data: targetValue,
      };
    } catch (e) {
      return {
        code: FieldCode.Error,
      };
    }
  },
});
export default basekit;
