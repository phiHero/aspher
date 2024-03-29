import type { NextApiRequest, NextApiResponse } from 'next';
import Film from '../../../lib/model/Film';
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
    const data = await Film.aggregate([
      {
        $search: {
          index: 'default',
          compound: {
            must: [
              {
                text: {
                  query: req.query.q,
                  path: ['title', 'otherName'],
                  fuzzy: {
                    maxEdits: 2,
                  },
                },
              },
            ],
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
          // like: 1,
          // dislike: 1,
          // followed: 1,
          adminRecommended: 1,
          genre: 1,
          year: 1,
          desc: 1,
          trailer: 1,
          isMovie: 1,
          highlight: {
            $meta: 'searchHighlights',
          },
        },
      },
    ]);
    if (data) return res.status(200).json(data);
    res.status(204).json([]);
  } catch (error) {
    res.status(500).json([]);
  }
}
