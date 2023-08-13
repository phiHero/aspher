import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { NextApiHandler, NextApiResponse } from 'next';
import { _verifiedApiUser } from '../../../interface/_custom';

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
      if (!verified.id || !verified.isAdmin) {
        return res
          .status(401)
          .json({ success: false, message: 'Invalid Token' });
      }
      req.user = verified;
      return handler(req, res);
    } catch (err) {
      return res.status(401).json({ success: false, message: 'Invalid token' });
    }
  };
}
