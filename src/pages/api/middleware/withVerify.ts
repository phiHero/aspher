import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import User from '../../../lib/model/User';
import { NextApiHandler, NextApiResponse } from 'next';
import { _verifiedApiUser } from '@/interface/_user';

type _handler =
  | NextApiHandler
  | ((
      req: _verifiedApiUser,
      res: NextApiResponse
    ) => Promise<unknown> | unknown);

export default function WithProtect(handler: _handler) {
  return async (req: _verifiedApiUser, res: NextApiResponse) => {
    const token = req.cookies.atk;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: 'Please login to get access!' });
    }
    try {
      const verified = await promisify(jwt.verify)(
        token,
        process.env.SECRET_KEY
      );
      if (!verified.id) {
        return res
          .status(401)
          .json({ success: false, message: 'Invalid Token' });
      }
      const user = await User.findById(verified.id);
      if (!user) {
        return res
          .status(401)
          .json({ success: false, message: 'User is no longer exist!' });
      }
      req.user = user;
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
  };
}
