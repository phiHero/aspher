import type { NextApiRequest, NextApiResponse } from 'next';
import Anime from '../../../lib/model/Anime';
import dbConnect from '../../../lib/dbConnect';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  if (!req.query.q || req.query.q?.length <= 3) return;
  try {
    await dbConnect();
    const data = await Anime.aggregate([
      {
        $search: {
          index: 'default',
          compound: {
            must: [
              {
                text: {
                  query: req.query.q,
                  path: 'title',
                  fuzzy: {
                    maxEdits: 2,
                  },
                },
              },
            ],
          },
        },
      },
      { $limit: 1 },
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
