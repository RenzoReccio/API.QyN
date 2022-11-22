export interface Menu {
  id: number;
  url: string;
  icon: string;
  title: string;
  parent: Menu;
  childs: Menu[];
}