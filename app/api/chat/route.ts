import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

interface VehicleItem {
  year: string;
  make: string;
  model: string;
  price?: number | null;
  odometer?: number | null;
  inspection?: { overallScore?: number | null } | null;
}

export async function POST(req: NextRequest) {
  try {
    const { messages, dealerName, slug } = await req.json() as {
      messages: ChatMessage[];
      dealerName: string;
      slug: string;
    };

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: 'Chat unavailable' }, { status: 503 });
    }

    const openai = new OpenAI({ apiKey });

    const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://smart-dealer-saas.vercel.app';

    // Fetch dealer info + inventory in parallel for rich context
    const [dealerRes, inventoryRes] = await Promise.all([
      fetch(`${API_BASE}/api/public/${slug}/dealer`).catch(() => null),
      fetch(`${API_BASE}/api/public/${slug}/vehicles?pageSize=30`).catch(() => null),
    ]);

    const dealerData = dealerRes?.ok
      ? (await dealerRes.json() as Record<string, unknown>)
      : null;
    const inventoryData = inventoryRes?.ok
      ? (await inventoryRes.json() as { vehicles?: VehicleItem[]; pagination?: { totalCount?: number } })
      : null;

    const address = [dealerData?.address, dealerData?.city, dealerData?.state]
      .filter(Boolean)
      .join(', ');
    const phone = (dealerData?.phone as string) ?? null;
    const totalVehicles = inventoryData?.pagination?.totalCount ?? 0;

    const inventoryLines = inventoryData?.vehicles
      ?.slice(0, 20)
      .map((v) =>
        `- ${v.year} ${v.make} ${v.model}` +
        (v.price ? ` — $${Number(v.price).toLocaleString()}` : '') +
        (v.odometer ? ` — ${Math.round(Number(v.odometer) / 1000)}k mi` : '') +
        (v.inspection?.overallScore != null ? ` — Score: ${v.inspection.overallScore}/100` : '')
      )
      .join('\n') ?? 'Contact us for current inventory';

    const systemPrompt = `You are a helpful sales assistant for ${dealerName}, a used car dealership.

DEALERSHIP INFO:
- Name: ${dealerName}
- Address: ${address || 'Contact us for address'}
- Phone: ${phone || 'Contact us'}

CURRENT INVENTORY (${totalVehicles} vehicles total):
${inventoryLines}

YOUR JOB:
- Help customers find the right vehicle for their needs and budget
- Answer questions about specific vehicles in inventory (year, make, model, price, mileage)
- Explain financing options (rates vary by credit score)
- Help schedule test drives
- Answer dealership questions (location, contact, hours)

RULES:
- Keep responses to 2-3 sentences max
- Be warm, friendly, and professional
- Never mention Smart Dealer or any software platform
- Never make up vehicle details that are not in the inventory list above
- For financing rates always say "rates vary by credit score — apply online or call us"
- If asked something you can't answer → give the phone number: ${phone || 'call the dealership directly'}
- Always end your response with a helpful next step
- NEVER say "I'm sorry, I couldn't process that" — always give a useful response`;

    // Build OpenAI messages array from chat history
    const history = messages.slice(-10, -1).map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.content,
    }));

    const lastMessage = messages[messages.length - 1];

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: systemPrompt },
        ...history,
        { role: 'user', content: lastMessage?.content ?? '' },
      ],
      max_tokens: 256,
    });

    const text = completion.choices[0]?.message?.content ?? '';

    return NextResponse.json({ message: text });
  } catch (err) {
    console.error('Chat API error:', err);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
