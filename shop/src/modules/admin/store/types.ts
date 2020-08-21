import { CommonState } from './common/types';
import { ShopState } from './shop/types';
import { MenuState } from './menu/types';
export interface StateOptions {
  common: CommonState;
  menu: MenuState;
  shop: ShopState;
}