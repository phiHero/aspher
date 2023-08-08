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
    const userID = req.user._id;
    const action = req.query.action;
    const anime = await Anime.findById(req.body.animeID);

    if (action === 'like') {
      if (anime.like.includes(userID)) {
        await anime.like.splice(anime.like.indexOf(userID), 1);
      } else if (anime.dislike.includes(userID)) {
        await anime.dislike.splice(anime.dislike.indexOf(userID), 1);
        await anime.like.push(userID);
      } else {
        await anime.like.push(userID);
      }
    } else if (action === 'dislike') {
      if (anime.dislike.includes(userID)) {
        await anime.dislike.splice(anime.dislike.indexOf(userID), 1);
      } else if (anime.like.includes(userID)) {
        await anime.like.splice(anime.like.indexOf(userID), 1);
        await anime.dislike.push(userID);
      } else {
        await anime.dislike.push(userID);
      }
    }

    const like = await anime.save();
    res.status(200).json(like);
  } catch (err) {
    console.log(err);
  }
};
export default WithProtect(handler);
