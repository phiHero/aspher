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
    const newMember = await User.aggregate([
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
    // const newFilm = await Film.aggregate([
    //   {
    //     $project: {
    //       title: 1,
    //       like: 1,
    //       dislike: 1,
    //       isRecommended: 1,
    //       genre: 1,
    //       year: 1,
    //       backgroundImg: 1,
    //       espisode: { $size: '$espisode' },
    //       createdAt: 1,
    //     },
    //   },
    //   { $sort: { createdAt: -1 } },
    //   { $limit: 10 },
    // ]);
    res.status(200).json({ totalUser, totalFilm, chartData, newMember });
  } catch (err) {
    console.log(err);
  }
};
export default WithProtect(Add);
