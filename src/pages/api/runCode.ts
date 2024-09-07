import type { NextApiRequest, NextApiResponse } from 'next';
import { cpp } from 'compile-run';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { code } = req.body;
    try {
      const result = await cpp.runSource(`cout<<"hello world";`);
      res.status(200).json({ output: result.stdout || result.stderr });
    } catch (error) {
      res.status(500).json({ error: 'Error executing code' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
