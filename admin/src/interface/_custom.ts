import { NextApiRequest } from 'next';
import { Dispatch, SetStateAction } from 'react';
export interface _loginUser {
  email: string;
  password: string;
}

export interface _user {
  _id: string;
  username: string;
  email: string;
  password: string;
  profilePic?: string;
  customColor: string;
  isAdmin: boolean;
  followedAnime: string[];
  accessToken: string;
  createdAt: string;
}
export type _verifiedApiUser = NextApiRequest & { user: _user };
export interface _children {
  children: React.ReactNode;
}
export interface _initialState {
  user: _user | null;
  isFetching: boolean;
  error: boolean;
}

export type _dispatch = (action: _action) => _initialState;
export type _authContext = _initialState;
export type _action =
  | {
      type: string;
    }
  | {
      type: string;
      payload: _user;
    };
export interface _SideBarData {
  title: string;
  icon: React.ReactNode;
  path: string;
}
export interface _open {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface _userstats {
  _id: number;
  total: number;
}

export type _filmData = {
  _id: string;
  title: string;
  otherName: string;
  episode: string[];
  backgroundImg: string;
  adminRecommended: boolean;
  genre: string[];
  year: string;
  desc: string;
  trailer: string;
  isMovie: boolean;
};
export type _rawFilmData = Omit<_filmData, 'isMovie' | 'adminRecommended'> & {
  isMovie: string | boolean;
  adminRecommended: string | boolean;
};
export type _setPassingSearchData = Dispatch<SetStateAction<_filmData | null>>;
