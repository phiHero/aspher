import type { NextApiRequest, NextApiResponse } from 'next';
import * as cheerio from 'cheerio';
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
    const hd_nr = data.hd_src_no_ratelimit?.replace(
      '//video.fdad1-2.fna.fbcdn.net',
      '//video.xx.fbcdn.net'
    );
    const hd = data.hd_src?.replace(
      '//video.fdad1-2.fna.fbcdn.net',
      '//video.xx.fbcdn.net'
    );
    const sd_nr = data.hd_src_no_ratelimit?.replace(
      '//video.fdad1-2.fna.fbcdn.net',
      '//video.xx.fbcdn.net'
    );
    const sd = data.sd_src?.replace(
      '//video.fdad1-2.fna.fbcdn.net',
      '//video.xx.fbcdn.net'
    );
    res.status(200).json({ hd_nr, hd, sd_nr, sd });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: 'Có lỗi xảy ra, vui lòng thử lại sau!',
    });
  }
}
