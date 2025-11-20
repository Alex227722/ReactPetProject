import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { text, target_lang = 'UK' } = req.body || {};

  if (!text) {
    res.status(400).json({ error: 'Missing text' });
    return;
  }

  const apiKey = process.env.DEEPL_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Missing DeepL API key on server' });
    return;
  }

  try {
    const params = new URLSearchParams({
      auth_key: apiKey,
      text: text,
      target_lang: String(target_lang),
    });

    const r = await fetch('https://api-free.deepl.com/v2/translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const data = await r.json();
    if (!r.ok) {
      res.status(r.status).json({ error: data });
      return;
    }

    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err?.message || String(err) });
  }
}
