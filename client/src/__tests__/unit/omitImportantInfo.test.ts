import omitImportantInfo from '@/utils/omitImportantInfo';
import { expect, it } from 'vitest';

it('Omit user info', () => {
  const userInfo = {
    _id: '123',
    username: '123',
    email: '123@gmail.com',
    followedFilm: [],
    customColor: '#a41e1e',
    profilePic: '123',
    accessToken: '',
  };
  const sensitiveInfo = {
    password: '123',
    __v: 1,
    isAdmin: true,
    updatedAt: '123',
  };
  expect(omitImportantInfo({ ...userInfo, ...sensitiveInfo })).toStrictEqual(
    userInfo
  );
});
