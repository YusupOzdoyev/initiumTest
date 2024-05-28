export interface IClientsData {
  users: IClient[]
}

interface IClient {
  name: string,
  surname: string,
  email: string,
  phone: string
}