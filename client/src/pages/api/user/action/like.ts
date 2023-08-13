import type { NextApiResponse } from 'next';
import WithProtect from '../../middleware/withVerify';
import Film from '@/lib/model/Film';
import dbConnect from '@/lib/dbConnect';
import { _verifiedApiUser } from '@/interface/_user';

const handler = async (req: _verifiedApiUser, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    res.status(405).end();
    return;
  }
  try {
    await dbConnect();
    const userID = req.user._id;
    const action = req.query.action;
    const film = await Film.findById(req.body.filmId);
    if (action === 'like') {
      // if user has already liked remove the like
      if (film.like.includes(userID)) {
        await film.like.splice(film.like.indexOf(userID), 1);
        // if user has already disliked then change to like
      } else if (film.dislike.includes(userID)) {
        await film.dislike.splice(film.dislike.indexOf(userID), 1);
        await film.like.push(userID);
      } else {
        await film.like.push(userID);
      }
    } else if (action === 'dislike') {
      if (film.dislike.includes(userID)) {
        await film.dislike.splice(film.dislike.indexOf(userID), 1);
      } else if (film.like.includes(userID)) {
        await film.like.splice(film.like.indexOf(userID), 1);
        await film.dislike.push(userID);
      } else {
        await film.dislike.push(userID);
      }
    }

    const like = await film.save();
    res.status(200).json(like);
  } catch (err) {
    res
      .status(500)
      .json({ message: 'There was an error please try again later!' });
  }
};
export default WithProtect(handler);
