import { Consumable } from './consumable';

export type Menu = {
  id?: number;
  enabled?: boolean;
  deleted?: boolean;
  name?: string;
  photo?: string;
  price?: number;
  type?: string;
  wasSold?: boolean;
  consumables?: Consumable[];
};
