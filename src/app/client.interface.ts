export interface IClientsData {
  users: IClient[]
}

export interface IClient {
  name: string;
  surname: string;
  email: string;
  phone: string;
  checked: boolean
}

export interface IDeleteClient {
  checkedClientsCount: number
}