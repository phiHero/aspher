import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import User from '../../../lib/model/User';
import { NextApiHandler, NextApiResponse } from 'next';
import { _verifiedApiUser } from '../../../interface/_custom';

export default function WithProtect(handler: NextApiHandler) {
  return async (req: _verifiedApiUser, res: NextApiResponse) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
      return res
        .status(401)
        .json({ success: false, message: 'Please login to get access!' });
    }
    try {
      const token = authHeader.split(' ')[1];
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
