import dbConnect from '../../../../lib/dbConnect';
import Film from '../../../../lib/model/Film';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function Add(req: NextApiRequest, res: NextApiResponse) {
  const method = 'PUT';
  if (req.method !== method) {
    res.status(405).send({ message: `Only ${method} requests allowed` });
    return;
  }
  try {
    await dbConnect();
    const newEpisode = await new Film(req.body);
    res.status(200).json(newEpisode);
  } catch (err) {
    console.log(err);
  }
}
