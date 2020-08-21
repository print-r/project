import { MenuFindValidata, MenuFindData } from '@/src/types/menu';
/**
 * 数据验证模块
 */
class Validate {

    /**
     * 验证空
     * @param value [string] 值
     */
    public required(value: string | []): boolean {
        return !Boolean(value.length);
    }

    /**
     * 正则验证
     * @param value [string] 值
     * @param reg [regex] 正则表达式
     */
    public regex(value: string, reg: RegExp): boolean {
        return reg.test(value);
    }

    /**
     * 验证数字
     * @param value [string | number] 值
     */
    public isNumber(value: number): boolean {
        return !isNaN(value);
    }


    /** 
     * * 验证长度
     * @param value [string | array] 值
     * @param num [number] 数值
     * @param type [string] 可选类型：max、min
     */
    public long(value: string | [], num: number, type: string): boolean {
        return type === 'max' ? value.length <= num : value.length >= num;
    }

    /**
     * 多层验证
     */
    public check(value: MenuFindData): [] | string[] {
        // 保存错误信息
        let errorMsg: string[] = [];
        // 空值状态
        let isNull = false;
        // 验证规则
        let validate = value.validate;
        // 存在验证
        if (Array.isArray(validate) && validate.length) {
            // 保存验证状态
            let status: boolean;
            try {
                // 循环验证
                validate.forEach(( val: MenuFindValidata) => {
                    // TODO:跳出验证
                    if (isNull && validate.length > 1) {
                        throw Error;
                    }
                    // 重置验证状态
                    status = false;
                    // 匹配验证规则
                    switch (val.rules) {
                        case 'required':
                            status = this.required(value.data);
                            isNull = status;
                            break;
                        case 'regex':
                            status = !this.regex(value.data, val.regex as RegExp);
                            break;
                        case 'isNumber':
                            status = !this.isNumber(value.data);
                            break;
                        default :
                            let rules: [string, number] = val.rules;
                            if ( ['min', 'max'].indexOf(rules[0]) !== -1 && this.isNumber(rules[1])) {
                                status = !this.long(value.data, Number(rules[1]), rules[0]);
                            } 
                            break;
                    }
                    // 保存错误信息
                    if (status) {
                        errorMsg.push(val.message);
                    }
                });
            } catch (e) {
                console.log('执行required，跳出循环验证');
            }
        }
        return errorMsg;
    }
}

export default new Validate();