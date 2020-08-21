import { ITheme } from '@/modules/admin/store/common/types';

export interface CommonState {
  keepAlive: string[];
  mid: string;
  theme: string;
  themeList: ITheme;
}