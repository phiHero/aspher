import type { NextApiRequest, NextApiResponse } from 'next';
import User from '../../../lib/model/User';
import dbConnect from '../../../lib/dbConnect';
import AES from 'crypto-js/aes';

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
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });
    const user = await newUser.save();
    res.status(201).json(user);
  } catch (err) {
    throw err;
  }
}
