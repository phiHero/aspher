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
export interface _data {
  _id: string;
  title: string;
  like: string[];
  dislike: [];
  isRecommended: true;
  genre: string[];
  year: number;
  desc: string;
  titleImg: string;
  backgroundImg: string;
  trailer: string;
  isMovie: boolean;
  length: number;
}
export interface _animeListItem {
  _id: string;
  title: string;
  episode: string[];
  backgroundImg: string;
  trailer: string;
  updatedAt: string;
}
