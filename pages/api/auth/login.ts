import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../lib/model/User';
import dbConnect from '../../../lib/dbConnect';
import CryptoJS from 'crypto-js';
import { sign } from 'jsonwebtoken';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  try {
    await dbConnect();
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(401).json('Wrong password or email!');
      return;
    }
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      res.status(401).json('Wrong password or email!');
      return;
    }

    const accessToken = sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: '7d' }
    );

    const { password, ...info } = user._doc;

    res.status(200).json({ ...info, accessToken });
  } catch (err) {
    console.log(err);

    throw err;
  }
}
