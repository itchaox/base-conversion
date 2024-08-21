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

const Conversion = require('./utils/fnMap');

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
};

basekit.addField({
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
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Number, FieldType.Text],
        placeholder: t('p1'),
      },
      validator: {
        required: true,
      },
    },
    {
      key: 'changeType',
      label: t('changeType'),
      component: FieldComponent.SingleSelect,
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
      component: FieldComponent.Input,
      props: {
        placeholder: t('placeholder'),
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
