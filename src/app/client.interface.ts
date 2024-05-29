export interface IClientsData {
  users: IClient[];
}

export interface IClient {
  name: string;
  email: string;
  phone: string;
  surname: string;
  checked: boolean;
}

export interface IDeleteClient {
  checkedClientsCount: number;
}