import { Menu } from "./menu.interface";

export interface Rol {
  id: number;
  name: string;
  menus: Menu[];
}