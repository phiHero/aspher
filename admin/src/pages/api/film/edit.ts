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
    delete req.body._id;
    const editedFilm = await Film.findByIdAndUpdate(
      req.query.id,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(editedFilm);
  } catch (err) {
    console.log(err);
  }
};
export default WithProtect(Add);
