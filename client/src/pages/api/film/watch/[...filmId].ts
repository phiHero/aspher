import type { NextApiRequest, NextApiResponse } from 'next';
import Film from '../../../../lib/model/Film';
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
  const { filmId } = req.query;
  try {
    await dbConnect();
    const watchingFilm = await Film.findById(filmId)
      .populate({ path: 'episode', model: Episode })
      .catch((err) => {
        res
          .status(500)
          .json({ error: 'There is an error, please try again later!' });
        throw err;
      });

    res.status(200).json(watchingFilm);
  } catch (err) {
    console.log(err);
  }
}
