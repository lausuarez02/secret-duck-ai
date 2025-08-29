import { NextRequest, NextResponse } from 'next/server';

const hintSets: Record<string, string[]> = {
  '0x1234567890123456789012345678901234567890': [
    '🎭 I have a thing for characters in sailor suits... just saying',
    '💰 Swimming in money? Nah, I prefer actual water',
    '📺 The 90s cartoons hit different, you know?',
    '🧠 Sometimes being confused is actually a superpower',
    '🎩 A good butler is worth their weight in gold',
    '🏛️ Classic never goes out of style, unlike your guesses',
    '🛁 Bath time companions make everything better',
    '🦸 Marvel sure knows how to create... interesting characters',
    '🎮 The 80s gave us some revolutionary gaming moments',
    '🏢 Disney vs Warner Bros? Now that\'s a tough choice...',
    '🎪 Some ducks are born entertainers, others... well...',
    '🔥 I might have expensive taste, just a hint...',
  ],
  '0x2345678901234567890123456789012345678901': [
    '🚀 Leadership is overrated, I prefer my own path',
    '🥇 Being first doesn\'t mean being best',
    '🤫 The quiet ones often have the most interesting thoughts',
    '🧘 Deep thinking about life? That\'s my vibe',
    '🏃 Speed isn\'t everything when you\'re swimming through life',
    '🌅 Dawn chorus? Please, I\'m more of a night owl',
    '🌊 Going with the flow is boring, rebellion is fun',
    '🍞 Food is nice, but personality is everything',
    '💕 Love might be in the air... or maybe it\'s just pollen',
    '🧭 Getting lost can lead to the best adventures',
    '💪 Athletic prowess? Overrated. Brain power? Now we\'re talking',
    '🎨 I appreciate creativity over conformity',
  ],
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const raceAddress = searchParams.get('raceAddress');
    
    if (!raceAddress) {
      return NextResponse.json(
        { error: 'Race address is required' },
        { status: 400 }
      );
    }
    
    const hints = hintSets[raceAddress] || [
      'The AI is thinking...',
      'Quack quack... which duck shall it be?',
      'So many ducks, so little time',
      'The choice has been made, but which one?',
      'Follow your instincts, human',
    ];
    
    return NextResponse.json(hints);
  } catch (error) {
    console.error('Failed to fetch hints:', error);
    return NextResponse.json(
      { error: 'Failed to fetch hints' },
      { status: 500 }
    );
  }
}