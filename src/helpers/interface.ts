export interface IIdAndName {
  id?: string
  name: string
  status?: 'ACTIVE' | 'INACTIVE'
  subject_id?:number
}

export interface IPerson {
  firstName?: string
  lastName?: string
  phone?: string
  username?: string
  password?: string
  subject?: IIdAndName[]
  status?: 'ACTIVE' | 'INACTIVE'
}
