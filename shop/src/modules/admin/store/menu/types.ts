import { MenuOption } from '@/types/menu';

export interface MenuState {
    menu: MenuOption[];
}

export interface IMenuInitParams {
    data: MenuOption[];
    thmem: string;
}