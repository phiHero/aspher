import { _user } from '../interface/_user';
export default function omitImportantInfo(
  user: _user & {
    password: string;
    __v: number;
    updatedAt: string;
    isAdmin: boolean;
  }
) {
  const { password, __v, isAdmin, updatedAt, ...omitted } = user;
  return omitted;
}
