import dbConnect from '../../../lib/dbConnect';
import Film from '../../../lib/model/Film';
import WithProtect from '../middleware/withVerify';
import { NextApiResponse } from 'next';
import { _verifiedApiUser } from '../../../interface/_custom';

const Add = async (req: _verifiedApiUser, res: NextApiResponse) => {
  const method = 'POST';
  if (req.method !== method) {
    return res
      .status(405)
      .send({ message: `Only ${method} requests are allowed` });
  }
  try {
    await dbConnect();
    const newFilm = new Film(req.body);
    const savedFilm = await newFilm.save();
    res.status(201).json(savedFilm);
  } catch (err) {
    res.status(400).json({ message: 'Error! Please try again!' });
    console.log(err);
  }
};
export default WithProtect(Add);
