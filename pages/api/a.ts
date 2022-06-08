import type { NextApiResponse } from 'next';
const handler = async (req, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }
  try {
    res.json({ url: 'https://www.dailymotion.com/embed/video/x8bas5g' });
  } catch (err) {
    console.log(err);
  }
};
export default handler;
