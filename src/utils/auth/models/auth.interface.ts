export interface MenuInformation {
  id: number;
  url: string;
  icon: string;
  title: string;
  childs: MenuInformation[];
}
export interface ClientInformation {
  typeDocument: string;

  numberDocument: string;

  address: string;

  phone: string;

  email: string;
}

export interface DataStoredInToken {
  id: number;

  name: string;

  username: string;

  client: ClientInformation;

  menus: MenuInformation[]
}