import { NextApiRequest } from 'next';

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
}
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

export interface _animeListItem {
  _id: string;
  title: string;
  episode: string[];
  backgroundImg: string;
  trailer: string;
  updatedAt: string;
}
export interface _newEpisode {
  _id: string;
  tap: string | number;
}
export interface _randomAnime {
  _id: string;
  title: string;
  length: number;
  like: string[];
  dislike: string[];
  episode: _newEpisode[];
  adminRecommended: boolean;
  genre: string[];
  desc: string;
  backgroundImg: string;
  isMovie: boolean;
}
export type _verifiedApiUser = NextApiRequest & _user;
export interface _videoConfig {
  playing: boolean;
  muted: boolean;
  volume: number;
  playBackRate: number;
  played: number;
  seeking: boolean;
}
