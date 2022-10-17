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
}