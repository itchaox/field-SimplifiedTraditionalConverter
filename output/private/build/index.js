"use strict";
// FIXME 简体繁体互转
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const node_opencc_1 = __importDefault(require("node-opencc"));
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
                source: '待转换字段',
                changeType: '目标格式',
                p1: '请选择文本类型字段',
                0: '简体',
                1: '正体繁体',
                2: '台湾繁体',
                3: '台湾模式-台湾繁体',
                4: '香港繁体',
            },
            'en-US': {
                source: 'Field to convert',
                changeType: 'Target format',
                p1: 'Please select a text-type field',
                0: 'Simplified Chinese',
                1: 'Traditional Chinese',
                2: 'Taiwan Traditional',
                3: 'Taiwan Mode - Traditional',
                4: 'Hong Kong Traditional',
            },
            'ja-JP': {
                source: '変換するフィールド',
                changeType: 'ターゲット形式',
                p1: 'テキストタイプのフィールドを選択してください',
                0: '簡体字',
                1: '正字体',
                2: '台湾正字体',
                3: '台湾モード-台湾正字体',
                4: '香港正字体',
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
                supportType: [block_basekit_server_api_1.FieldType.Text],
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
                    { label: t('0'), value: 0 },
                    { label: t('1'), value: 1 },
                    { label: t('2'), value: 2 },
                    { label: t('3'), value: 3 },
                    { label: t('4'), value: 4 },
                ],
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
        const { source, changeType } = formItemParams;
        // 数字类型 source 直接为值
        //  文本类型 source 为 [{ type: 'text , text '8'}]
        const sourceValue = Array.isArray(source) && source.length > 0 ? source[0].text : source;
        // 转换函数
        function converter(value) {
            let result;
            // 简体
            if (changeType.value === 0) {
                result = node_opencc_1.default.taiwanToSimplifiedWithPhrases(value);
            }
            // 正体繁体
            if (changeType.value === 1) {
                result = node_opencc_1.default.simplifiedToTraditional(value);
            }
            // 台湾繁体
            if (changeType.value === 2) {
                result = node_opencc_1.default.simplifiedToTaiwan(value);
            }
            // 台湾模式-台湾繁体
            if (changeType.value === 3) {
                result = node_opencc_1.default.simplifiedToTaiwanWithPhrases(value);
            }
            // 香港繁体
            if (changeType.value === 4) {
                result = node_opencc_1.default.simplifiedToHongKong(value);
            }
            return result;
        }
        // 选了预置转换类型，则以预置转换类型为准
        let targetValue = converter(sourceValue);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGVBQWU7Ozs7O0FBRWYsbUZBQTRHO0FBRTVHLDhEQUFpQztBQUVqQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEdBQUcsZ0NBQUssQ0FBQztBQUVwQiwyQkFBMkI7QUFDM0Isa0NBQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUM7QUFFcEQsTUFBTSxLQUFLLEdBQUc7SUFDWixDQUFDLEVBQUUsaUJBQWlCO0lBQ3BCLENBQUMsRUFBRSxxQkFBcUI7SUFDeEIsQ0FBQyxFQUFFLGlCQUFpQjtJQUNwQixDQUFDLEVBQUUsc0JBQXNCO0lBQ3pCLENBQUMsRUFBRSxxQkFBcUI7SUFDeEIsQ0FBQyxFQUFFLHNCQUFzQjtJQUN6QixDQUFDLEVBQUUsVUFBVTtJQUNiLENBQUMsRUFBRSxVQUFVO0NBQ2QsQ0FBQztBQUVGLGtDQUFPLENBQUMsUUFBUSxDQUFDO0lBQ2YsZ0JBQWdCO0lBQ2hCLElBQUksRUFBRTtRQUNKLFFBQVEsRUFBRTtZQUNSLE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsT0FBTztnQkFDZixVQUFVLEVBQUUsTUFBTTtnQkFDbEIsRUFBRSxFQUFFLFdBQVc7Z0JBQ2YsQ0FBQyxFQUFFLElBQUk7Z0JBQ1AsQ0FBQyxFQUFFLE1BQU07Z0JBQ1QsQ0FBQyxFQUFFLE1BQU07Z0JBQ1QsQ0FBQyxFQUFFLFdBQVc7Z0JBQ2QsQ0FBQyxFQUFFLE1BQU07YUFDVjtZQUNELE9BQU8sRUFBRTtnQkFDUCxNQUFNLEVBQUUsa0JBQWtCO2dCQUMxQixVQUFVLEVBQUUsZUFBZTtnQkFDM0IsRUFBRSxFQUFFLGlDQUFpQztnQkFDckMsQ0FBQyxFQUFFLG9CQUFvQjtnQkFDdkIsQ0FBQyxFQUFFLHFCQUFxQjtnQkFDeEIsQ0FBQyxFQUFFLG9CQUFvQjtnQkFDdkIsQ0FBQyxFQUFFLDJCQUEy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