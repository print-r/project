import { CommonState } from './types';
import { theme } from '@/components/menu';

export const state: CommonState = {
    keepAlive: [], // 缓存组件name值
    mid: '',
    shopId: '',
    theme: '',
    themeList: theme,
    showCateProduct: false, // 显示商品分类
};