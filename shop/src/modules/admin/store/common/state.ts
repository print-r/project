import { CommonState } from './types';
import { theme } from '@/components/menu';

export const state: CommonState = {
    keepAlive: [], // 缓存组件name值
    mode: '', // 当前端
    phoneSize: {}, // 移动端尺寸
    theme: '1', // 默认主题
    themeList: theme, // 主题数据
    mid: '', // 商家ID
    dragStatus: false, // 拖拽状态
    isEdit: false, // 数据发生改变状态
    showCateProduct: false, // 显示商品分类
};