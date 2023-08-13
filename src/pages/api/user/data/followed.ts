import type { NextApiResponse } from 'next';
import WithProtect from '../../middleware/withVerify';
import Film from '@/lib/model/Film';
import dbConnect from '@/lib/dbConnect';
import { _verifiedApiUser } from '@/interface/_user';

const handler = async (req: _verifiedApiUser, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }
  try {
    await dbConnect();
    const animeData = await Film.find({
      _id: { $in: req.user.followedFilm },
    });
    res.status(200).json(animeData);
  } catch (err) {
    res.status(401).json({ message: 'error' });
  }
};
export default WithProtect(handler);
