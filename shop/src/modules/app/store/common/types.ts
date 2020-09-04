import { ITheme } from '@/modules/admin/store/common/types';

export interface CommonState {
  keepAlive: string[];
  mid: string;
  shopId: string;
  theme: string;
  themeList: ITheme;
  showCateProduct: boolean;
}