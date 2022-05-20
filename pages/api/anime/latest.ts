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
    const latestAnime = await Anime.aggregate([
      {
        $project: {
          _id: 1,
          title: 1,
          episode: 1,
          backgroundImg: 1,
          trailer: 1,
          updatedAt: 1,
        },
      },
      { $sort: { updatedAt: -1 } },
      { $limit: 3 },
    ]);
    res.status(200).json(latestAnime);
  } catch (err) {
    console.log(err);
  }
}
