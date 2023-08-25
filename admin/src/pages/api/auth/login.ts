import type { NextApiRequest, NextApiResponse } from 'next';
import User from '@/lib/model/User';
import dbConnect from '@/lib/dbConnect';
import CryptoJS from 'crypto-js';
import { sign } from 'jsonwebtoken';
import { serialize } from 'cookie';

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
      return res
        .status(401)
        .json({ success: false, message: 'Wrong password or email!' });
    }
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== req.body.password) {
      res.status(401).json('Wrong password or email!');
      return;
    } else if (!user.isAdmin) {
      return res
        .status(401)
        .json({ success: false, message: 'You are not an admin!' });
    }
    const accessToken = sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: '1d' }
    );
    const cookie = serialize('atk', accessToken, {
      httpOnly: true,
      //  secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24,
      path: '/',
    });
    const { password, ...info } = user._doc;
    res.setHeader('Set-Cookie', cookie);
    res.status(200).json({ ...info });
  } catch (err) {
    console.log(err);

    res.status(500);
  }
}
