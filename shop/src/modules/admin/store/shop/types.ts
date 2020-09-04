import { MenuOption } from '@/types/menu';

export interface ShopState {
    shop: MenuOption[];
}

export interface IAddParams {
    index: number;
    data: MenuOption;
}

export type SortType = 'up' | 'down';

export interface ISortParams {
    type?: SortType;
    index: number;
    oldIndex?: number;
    fn?: (index: number) => void;
}

export interface IEditParams {
    index: number;
    data: any;
}