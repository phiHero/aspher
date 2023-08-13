import dbConnect from '../../../../lib/dbConnect';
import Episode from '../../../../lib/model/Episode';
import Film from '../../../../lib/model/Film';
import WithProtect from '../../middleware/withVerify';
import { NextApiResponse } from 'next';
import { _verifiedApiUser } from '../../../../interface/_custom';

const Add = async (req: _verifiedApiUser, res: NextApiResponse) => {
  const method = 'POST';
  if (req.method !== method) {
    return res
      .status(405)
      .send({ message: `Only ${method} requests are allowed` });
  }
  try {
    await dbConnect();
    const newEpisode = new Episode(req.body);
    const savedEpisode = await newEpisode.save();
    if (savedEpisode) {
      const film = await Film.findById(savedEpisode.belongTo);
      film.episode.push(savedEpisode._id);
      await film.save();
    }
    res.status(201).json(savedEpisode);
  } catch (err) {
    res.status(400).json({ message: 'Error!' });
  }
};
export default WithProtect(Add);
