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
    const params = new URLSearchParams({
      q: text,
      langpair: `en|${target_lang}`,
    });

    const response = await fetch(`https://api.mymemory.translated.net/get?${params.toString()}`);

    console.log('MyMemory status:', response.status);  // Лог статусу

    if (!response.ok) {
      const errorText = await response.text();
      console.error('MyMemory error:', errorText);  // Лог помилки від MyMemory
      throw new Error('Translation failed');
    }

    const data = await response.json() as { responseData: { translatedText: string } };
    res.status(200).json({ translations: [{ text: data.responseData.translatedText }] });
  } catch (error) {
    console.error('Full translation error:', error);  // Детальний лог помилки
    res.status(500).json({ error: 'Translation failed' });
  }
}