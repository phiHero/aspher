import { NextApiRequest } from 'next';

export interface _user {
  _id: string;
  username: string;
  email: string;
  profilePic?: string;
  customColor: string;
  followedFilm: string[];
  accessToken: string;
}

export interface _loginUser {
  email: string;
  password: string;
}
export interface _userstats {
  _id: number;
  total: number;
}
export type _verifiedApiUser = NextApiRequest & { user: _user };
