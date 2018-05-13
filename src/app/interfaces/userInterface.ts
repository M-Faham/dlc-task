import { Iaddress } from './addressInterface';
export interface IUser {
    id: number;
    name: string;
    email: string;
    address: Iaddress;
    phone: string;
}
