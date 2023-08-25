import dbConnect from '@/lib/dbConnect';
import Film from '@/lib/model/Film';
import User from '@/lib/model/User';
import WithProtect from '../middleware/withVerify';
import { NextApiResponse } from 'next';
import { _verifiedApiUser } from '@/interface/_custom';

const Add = async (req: _verifiedApiUser, res: NextApiResponse) => {
  const method = 'GET';
  if (req.method !== method) {
    return res
      .status(405)
      .send({ message: `Only ${method} requests are allowed` });
  }
  const token = req.cookies.atk;

  try {
    await dbConnect();
    const totalUser = await User.countDocuments({});
    const totalFilm = await Film.countDocuments({});
    const chartData = await User.aggregate([
      {
        $project: {
          month: { $month: '$createdAt' },
        },
      },
      {
        $group: {
          _id: '$month',
          total: { $sum: 1 },
        },
      },
    ]);

    let newMember = [];

    if (token !== 'guest') {
      newMember = await User.aggregate([
        {
          $project: {
            username: 1,
            email: 1,
            profilePic: 1,
            createdAt: 1,
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: 20 },
      ]);
    } else {
      for (let i = 0; i < 20; i++) {
        newMember.push({
          _id: 'loginToShow',
          username: 'loginToShow',
          email: 'login@to.show',
          profilePic: '',
          createdAt: 'login to show',
        });
      }
    }

    res.status(200).json({ totalUser, totalFilm, chartData, newMember });
  } catch (err) {
    console.log(err);
  }
};
export default Add;
