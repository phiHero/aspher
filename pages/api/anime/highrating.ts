import type { NextApiRequest, NextApiResponse } from 'next';
import Anime from '../../../lib/model/Anime';
import dbConnect from '../../../lib/dbConnect';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }
  try {
    await dbConnect();
    const h_ratingAnime = await Anime.aggregate([
      {
        $project: {
          title: 1,
          length: { $size: '$like' },
          like: 1,
          dislike: 1,
          episode: 1,
          isRecommended: 1,
          genre: 1,
          year: 1,
          desc: 1,
          titleImg: 1,
          backgroundImg: 1,
          trailer: 1,
          isMovie: 1,
        },
      },
      { $sort: { length: -1 } },
      { $limit: 1 },
    ]);
    res.status(200).json(h_ratingAnime);
  } catch (err) {
    console.log(err);
  }
}
