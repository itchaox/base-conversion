import {
  basekit,
  FieldType,
  field,
  FieldComponent,
  FieldCode,
  NumberFormatter,
  AuthorizationType,
} from '@lark-opdev/block-basekit-server-api';
const { t } = field;

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['api.exchangerate-api.com']);

basekit.addField({
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
      component: FieldComponent.SingleSelect,
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
      component: FieldComponent.SingleSelect,
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
      component: FieldComponent.FieldSelect,
      props: {
        // supportType: [FieldType.Number, FieldType.Text],
        supportType: [FieldType.Number],
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
  execute: async (formItemParams: {
    sourceType: { text: string; value: string };
    targetType: { text: string; value: string };
    source: { type: string; text: string }[] | number;
  }) => {
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
        code: FieldCode.Success,
        data: targetValue.toLowerCase(),
      };
    } catch (e) {
      return {
        code: FieldCode.Error,
      };
    }
  },
});
export default basekit;
