import type { NextApiResponse } from 'next';
import WithProtect from '../middleware/withVerify';
import Anime from '../../../lib/model/Anime';
import dbConnect from '../../../lib/dbConnect';
import { _verifiedApiUser } from '../../../interface/_custom';

const handler = async (req: _verifiedApiUser, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }
  try {
    await dbConnect();
    const animeData = await Anime.find({
      _id: { $in: req.user.followedAnime },
    });
    res.status(200).json(animeData);
  } catch (err) {
    console.log(err);
  }
};
export default WithProtect(handler);
