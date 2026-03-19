import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, dealerName, slug } = await req.json() as {
      messages: ChatMessage[];
      dealerName: string;
      slug: string;
    };

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Chat unavailable' }, { status: 503 });
    }

    const systemPrompt = `You are a friendly and helpful sales assistant for ${dealerName}, a used car dealership.

Your role:
- Help customers find the right vehicle for their needs and budget
- Answer questions about inventory, pricing, and financing
- Encourage scheduling test drives and visiting the dealership
- Answer questions about trade-ins

Guidelines:
- Be warm, professional, and concise
- Keep responses to 2-3 sentences max unless the question requires more detail
- Never make up specific vehicle inventory details — tell them to browse at /d/${slug}/inventory
- For financing questions, direct them to /d/${slug}/financing
- For trade-in questions, direct them to /d/${slug}/trade-in
- Never mention any software or platform. You work for ${dealerName} directly.
- If they ask for a specific car, suggest they browse inventory or call the dealership`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 256,
        system: systemPrompt,
        messages: messages.slice(-10), // keep last 10 for context
      }),
    });

    if (!response.ok) {
      throw new Error(`Anthropic API error: ${response.status}`);
    }

    const data = await response.json() as {
      content: Array<{ type: string; text: string }>;
    };
    const text = data.content.find((c) => c.type === 'text')?.text ?? '';

    return NextResponse.json({ message: text });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
