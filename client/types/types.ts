import { CSSProp } from 'styled-components';

declare module 'react' {
  interface Attributes {
    css?: CSSProp;
  }
}

export type authDataType = {
    id: number,
    email: string,
    role: string
}
export interface AuthDataTypeInterface {
    id?: number,
    email?: string,
    role?: string
}
export interface UserProfileDataTypeInterface {
  id?: number,
  email?: string,
  name?: string,
  secondName?: string,
  nickname?: string,
  avatar?: string,
  dateOfBirth: string,
  aboutSelf: string
}

export interface OrderInterface {
  id: string | number
  name: string
  position: number
  link: string
  price: number
  count: number
  total: number

}
export interface UserInterface {
  id?: string | number
  name?: string
  userProfile?: UserProfileDataTypeInterface
}


