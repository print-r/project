import mobile from './mobile';
import pc from './pc';
import mobileTheme from './theme/mobile';
import pcTheme from './theme/pc';
import { menuData } from './data/menuList';
import mobileUtilsMenu from './mobile/utils';
import pcUtilsMenu from './pc/utils';
import { MenuOption } from '@/types/menu';
import { ITheme } from '@/modules/admin/store/common/types';

interface Menu {
    [k: string]: any;
}

// 组件模块
export const menu: Menu = {
   mobile,
   pc,
};

// 组件数据插入数据框
export const utils: Menu = {
    mobile: mobileUtilsMenu,
    pc: pcUtilsMenu,
};

// 主题
export const theme: ITheme = {
    mobile: mobileTheme,
    pc: pcTheme,
};

// 组件数据
export const menuList: MenuOption[] = menuData;
