export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
}

export type ApiStatus =
  | "loading"
  | "success"
  | "error"
  | "empty";

export type AvatarColorClass =
  | "avatar-purple"
  | "avatar-blue"
  | "avatar-pink"
  | "avatar-green"
  | "avatar-orange"
  | "avatar-cyan";
