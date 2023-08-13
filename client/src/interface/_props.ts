import { _user } from './_user';

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
