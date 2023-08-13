import type { NextApiResponse } from 'next';
import WithProtect from '../../middleware/withVerify';
import Film from '../../../../lib/model/Film';
import dbConnect from '../../../../lib/dbConnect';
import { _user, _verifiedApiUser } from '@/interface/_user';

const handler = async (req: _verifiedApiUser, res: NextApiResponse) => {
  if (req.method !== 'PUT') {
    res.status(405).end();
    return;
  }
  try {
    await dbConnect();
    const user: any = req.user;
    const filmId = req.body.filmId;
    const anime = await Film.findById(filmId);
    if (user.followedFilm.includes(filmId)) {
      user.followedFilm.splice(user.followedFilm.indexOf(filmId), 1);
      anime.followed > 0 && anime.followed--;
    } else {
      user.followedFilm.push(filmId);
      anime.followed++;
    }
    const follow = await user.save(); // user get from middleware;
    await anime.save();
    res.status(200).json(follow);
  } catch (err) {
    res.status(500);
  }
};
export default WithProtect(handler);
