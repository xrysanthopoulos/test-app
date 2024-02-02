import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT!, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    
    res.setHeader('Cache-Control', 'public, max-age=3600');

    const data = await response.json();
    res.status(200).json(data);
  } catch (error: any) {
    // Explicitly type 'error' as 'any' to access its 'message' property
    res.status(500).json({ error: error.message });
  }
}
