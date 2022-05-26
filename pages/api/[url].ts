import type { NextApiRequest, NextApiResponse } from 'next';
const corsAnywhere = require('cors-anywhere');
const proxy = corsAnywhere.createServer({
  originWhitelist: [], // Allow all origins
  requireHeaders: [], // Do not require any headers.
  removeHeaders: [], // Do not remove any headers.
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'GET') {
    res.status(405).end();
    return;
  }
  try {
    req.url = '/' + decodeURIComponent(req.url?.replace('/api/', '') || '');
    proxy.emit('request', req, res);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
}
