import type { NextApiRequest, NextApiResponse } from 'next';
import Anime from '../../../../lib/model/Anime';
import Episode from '../../../../lib/model/Episode';
import dbConnect from '../../../../lib/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }
  const { animeId } = req.query;
  try {
    await dbConnect();
    const watchingAnime = await Anime.findById(animeId)
      .populate({ path: 'episode', model: Episode })
      .catch((err) => {
        res.status(500).json({ error: 'Có lỗi xảy ra, vui lòng thử lại sau!' });
        throw err;
      });
    res.status(200).json(watchingAnime);
  } catch (err) {
    console.log(err);
  }
}
