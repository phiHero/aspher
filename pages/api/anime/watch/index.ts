import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.status(405).end();
    return;
  }
  const fbID = req.body.fbID;
  try {
    const { data } = await axios.get(
      'https://es-la.facebook.com/video/video_data/?video_id=1040055266604651'
    );
    const hd_nr =
      'https://video.xx.fbcdn.net' +
      data.hd_src_no_ratelimit?.slice(data.hd_src_no_ratelimit.indexOf('/v/'));
    const hd =
      'https://video.xx.fbcdn.net' +
      data.hd_src?.slice(data.hd_src_no_ratelimit.indexOf('/v/'));
    const sd_nr =
      'https://video.xx.fbcdn.net' +
      data.hd_src_no_ratelimit?.slice(data.hd_src_no_ratelimit.indexOf('/v/'));
    const sd =
      'https://video.xx.fbcdn.net' +
      data.sd_src?.slice(data.hd_src_no_ratelimit.indexOf('/v/'));

    res.status(200).json({ hd_nr, hd, sd_nr, sd });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra, vui lòng thử lại sau!',
    });
  }
}
