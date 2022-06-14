import type { NextApiRequest, NextApiResponse } from 'next';
import Anime from '../../../lib/model/Anime';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  try {
    const data = await Anime.aggregate([
      {
        $search: {
          index: 'default',
          text: {
            query: req.query.q,
            path: 'title',
            fuzzy: {
              maxEdits: 2,
            },
          },
          highlight: {
            path: ['title'],
          },
        },
      },
      { $limit: 10 },
      {
        $project: {
          _id: 1,
          title: 1,
          otherName: 1,
          episode: 1,
          backgroundImg: 1,
          highlight: {
            $meta: 'searchHighlights',
          },
        },
      },
    ]);
    if (data) return res.status(200).json(data);
    res.status(200).json([]);
  } catch (error) {
    console.log(error);
    res.json([]);
  }
}
