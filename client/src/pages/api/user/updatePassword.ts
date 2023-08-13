import type { NextApiResponse } from 'next';
import WithProtect from '../middleware/withVerify';
import dbConnect from '@/lib/dbConnect';
import { _verifiedApiUser } from '@/interface/_user';
import CryptoJS from 'crypto-js';

const handler = async (req: _verifiedApiUser, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    res.status(405).end();
    return;
  }
  try {
    await dbConnect();
    const user: any = req.user;
    const { password, newPassword } = req.body;

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    if (originalPassword !== password) {
      res.status(401).json('Wrong password or email!');
      return;
    }
    user.password = CryptoJS.AES.encrypt(
      newPassword,
      process.env.SECRET_KEY
    ).toString();
    console.log(user.password);

    await user.save();
    res.status(200).json({ message: 'Success!' });
  } catch (err) {
    console.log(err);

    res.status(401).json({ message: 'Error!' });
  }
};
export default WithProtect(handler);
