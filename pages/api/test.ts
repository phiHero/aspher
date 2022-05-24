import type { NextApiRequest, NextApiResponse } from 'next';
import cheerio from 'cheerio';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }
  const originalURL =
    'https://www.instagram.com/tv/CdoTQxrF303/?utm_source=ig_web_copy_link';
  let url;
  try {
    if (originalURL?.includes('?utm_source=ig_web_copy_link'))
      url = originalURL.slice(0, originalURL.lastIndexOf('/') + 1);
    url += 'embed';
    const ress = await axios.get(url);
    const html = ress.data;
    const $ = cheerio.load(html);
    const scriptTag = Array.from($('body').find('script'));
    const filteredScriptTag = scriptTag.filter((item) =>
      item.children[0]?.data.includes(
        "window.__additionalDataLoaded('extra'" && 'mp4'
      )
    );
    const scriptTagContent = filteredScriptTag[0].children[0].data;
    const firstSubstring = scriptTagContent.substring(
      scriptTagContent.indexOf('{')
    );
    const SecondSubstring = firstSubstring.substring(
      0,
      firstSubstring.lastIndexOf('}') + 1
    );
    const jsonString = JSON.parse(SecondSubstring);
    const thumbnail = jsonString.shortcode_media.display_url;
    const video = jsonString.shortcode_media.video_url;
    console.log({ thumbnail, video });
    res.json({ thumbnail, video });
  } catch (err) {
    console.log(err);
  }
}
