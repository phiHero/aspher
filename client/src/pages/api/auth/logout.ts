import type { NextApiRequest, NextApiResponse } from 'next';
import { serialize } from 'cookie';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }
  try {
    const cookie = serialize('atk', 'null', {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development',
      sameSite: 'strict',
      maxAge: 3,
      path: '/',
    });
    res.setHeader('Set-Cookie', cookie);
    res.status(200).json({ msg: 'logout successfully!' });
  } catch (err) {
    res.status(500);
  }
}
