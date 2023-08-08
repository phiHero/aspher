import type { NextApiResponse } from 'next';
import WithProtect from '../../middleware/withVerify';
import Anime from '../../../../lib/model/Anime';
import dbConnect from '../../../../lib/dbConnect';
import { _verifiedApiUser } from '../../../../src/interface/_custom';

const handler = async (req: _verifiedApiUser, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    res.status(405).end();
    return;
  }
  try {
    await dbConnect();
    const user = req.user;
    const animeID = req.body.animeID;
    const anime = await Anime.findById(animeID);
    if (user.followedAnime.includes(animeID)) {
      await user.followedAnime.splice(user.followedAnime.indexOf(animeID), 1);
      anime.followed--;
    } else {
      await user.followedAnime.push(animeID);
      anime.followed++;
    }
    const follow = await user.save();
    await anime.save();
    res.status(200).json(follow);
  } catch (err) {
    console.log(err);
  }
};
export default WithProtect(handler);
