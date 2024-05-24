export interface Iperson {
  id: number
  lastName: string
  firstName: string
  middleName: string
  specializationList: {
    id: number
  }[]
}
export interface iCounter {
  total: number
  pages: number
}
export interface Ispecialization {
  id: number
  name: string
}
