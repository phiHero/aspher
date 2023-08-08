import type { NextApiResponse } from 'next';
import WithProtect from '../middleware/withVerify';
import dbConnect from '../../../lib/dbConnect';
import { _verifiedApiUser } from '../../../src/interface/_custom';

const handler = async (req: _verifiedApiUser, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    res.status(405).end();
    return;
  }
  try {
    await dbConnect();
    const user = req.user;
    user.username = req.body.username;
    user.profilePic = req.body.profilePic;
    user.customColor = req.body.customColor;
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
};
export default WithProtect(handler);
