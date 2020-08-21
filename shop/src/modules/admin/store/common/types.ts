import { ThemeOptions } from '@/types/theme';

export interface ITheme {
    [key: string]: ThemeOptions;
}

export interface PhoneSize {
    width: number;
    height: number;
}
export interface CommonState {
    keepAlive: string[];
    mode: string;
    phoneSize: PhoneSize | object;
    theme: string;
    themeList: ITheme;
    mid: string;
    dragStatus: boolean;
    isEdit: boolean;
  }