import { rulesType } from './validate';

export interface MenuFindValidata {
    rules: rulesType // 验证规则类型
    message: string // 错误提示
    regex?: RegExp // 正则表达式
}

export interface MenuFindData {
    [key: string]: any
    data: any // 数据
    validate: MenuFindValidata[] // 验证规则
    errorMsg: string[] // 错误信息
}

export interface MenuFind<S> {
    [key: string]: S
}

export interface MenuOption {
    template: string // 组件名称
    name: string // 模板名称
    img: string // 组件图片
    order: number // 排序
    fixed: boolean // 是否固定组件 TODO:该组件的位置无法更改
    show: boolean // 是否显示
    isEdit: boolean // 是否可编辑
    isDelete: boolean // 组件是否可删除
    max: number // 组件生成的最大数
    exist: number // 当前组件存在数量
    utils?: string // 数据填写框组件名
    utils_title?: string // 标题
    data: any // 数据列表
}

export interface MenuOptions {
    [key: string]: MenuOption
}
