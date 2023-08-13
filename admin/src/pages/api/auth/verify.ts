import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function Verify(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const token = req.cookies.atk;
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: 'Please login to get access!' });
  }
  try {
    const verified = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
    if (!verified.id || !verified.isAdmin) {
      return res.status(401).json({ success: false, message: 'Invalid Token' });
    }
    return res.status(200).json({ success: true, message: 'Access Granted' });
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json({ success: false, message: 'An error occurred' });
  }
}
