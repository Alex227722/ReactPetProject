import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { text, target_lang = 'uk' } = req.body as { text: string; target_lang?: string };

  if (!text) {
    res.status(400).json({ error: 'Text is required' });
    return;
  }

  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      body: JSON.stringify({
        q: text,
        source: 'en',  
        target: target_lang,
        format: 'text',
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) {
      throw new Error('Translation failed');
    }

    const data = await response.json() as { translatedText: string };
    res.status(200).json({ translations: [{ text: data.translatedText }] });
  } catch (error) {
    console.error('Translation error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
}