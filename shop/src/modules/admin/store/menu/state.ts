import { MenuState } from './types';
import { menuList } from '@/components/menu';
export const state: MenuState = {
    menu: JSON.parse(JSON.stringify(menuList)),
};