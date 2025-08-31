import { NextRequest, NextResponse } from 'next/server';

interface Duck {
  title: string;
  blurb: string;
  image: string;
}

interface AISelection {
  selectedDucks: string[];
  reasoning: Record<string, string>;
  overallStrategy: string;
}

export async function POST(request: NextRequest) {
  try {
    const { ducks, topic } = await request.json();
    
    if (!ducks || !Array.isArray(ducks)) {
      return NextResponse.json(
        { error: 'Ducks array is required' },
        { status: 400 }
      );
    }

    // Create AI prompt with duck descriptions
    const duckDescriptions = ducks.map((duck: Duck, index: number) => 
      `${index + 1}. **${duck.title}**: ${duck.blurb}`
    ).join('\n');

    const prompt = `You are QuackAI, an advanced AI system that needs to pick 4 ducks from the following list for a prediction game about "${topic}".

Available Ducks:
${duckDescriptions}

Your task:
1. Pick exactly 4 ducks from this list
2. Explain your reasoning for each pick
3. Provide an overall strategy explanation

Consider factors like:
- Duck personality traits
- How they complement each other
- Strategic advantages
- Fun factor and entertainment value

Respond with your selections and detailed reasoning for each choice. Be creative and entertaining in your explanations!`;

    // For demo, let's simulate an AI response
    const availableDucks = ducks.map((d: Duck) => d.title);
    
    // Smart selection algorithm (for demo - replace with actual AI API call)
    const selectedDucks = selectDucksWithLogic(availableDucks, topic);
    const reasoning = generateReasoningForDucks(selectedDucks, ducks, topic);
    const overallStrategy = generateOverallStrategy(selectedDucks, topic);

    const response: AISelection = {
      selectedDucks,
      reasoning,
      overallStrategy
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('AI duck selection failed:', error);
    return NextResponse.json(
      { error: 'Failed to select ducks' },
      { status: 500 }
    );
  }
}

function selectDucksWithLogic(ducks: string[], topic: string): string[] {
  // Smart selection based on duck characteristics and topic
  const selections: string[] = [];
  
  // Always include a leader-type duck
  const leaders = ducks.filter(d => d.includes('King') || d.includes('CEO') || d.includes('Leader'));
  if (leaders.length > 0) selections.push(leaders[0]);
  
  // Include a strategic/smart duck
  const smart = ducks.filter(d => d.includes('Wizard') || d.includes('Doctor') || d.includes('Detective'));
  if (smart.length > 0 && !selections.includes(smart[0])) selections.push(smart[0]);
  
  // Include an action/fighter duck
  const fighters = ducks.filter(d => d.includes('Ninja') || d.includes('Samurai') || d.includes('Firefighter'));
  if (fighters.length > 0 && !selections.includes(fighters[0])) selections.push(fighters[0]);
  
  // Fill remaining slots randomly from unused ducks
  const remaining = ducks.filter(d => !selections.includes(d));
  while (selections.length < 4 && remaining.length > 0) {
    const randomIndex = Math.floor(Math.random() * remaining.length);
    selections.push(remaining.splice(randomIndex, 1)[0]);
  }
  
  return selections.slice(0, 4);
}

function generateReasoningForDucks(selectedDucks: string[], allDucks: Duck[], topic: string): Record<string, string> {
  const reasoningMap: Record<string, string[]> = {
    'Astronaut': [
      'Out-of-this-world thinking gives cosmic perspective',
      'Space exploration requires ultimate problem-solving skills',
      'Zero gravity experience = thinking outside the box'
    ],
    'CEO': [
      'Executive decision-making under pressure',
      'Strategic leadership and vision',
      'Business acumen for optimal outcomes'
    ],
    'Chef': [
      'Perfect recipe for success requires careful ingredient selection',
      'Timing and precision are everything',
      'Creates harmony from diverse elements'
    ],
    'Cowboy': [
      'Wild west instincts for unpredictable situations',
      'Quick draw decision-making',
      'Frontier spirit and independence'
    ],
    'Cyberpunk': [
      'Future-tech insights into patterns humans miss',
      'Digital native understanding of complex systems',
      'Rebellious thinking breaks conventional rules'
    ],
    'Detective': [
      'Analytical mind that spots hidden clues',
      'Deductive reasoning to solve mysteries',
      'Never misses important details'
    ],
    'DJ': [
      'Reads the room and crowd energy perfectly',
      'Mixing skills create perfect combinations',
      'Knows how to keep the party going'
    ],
    'Doctor': [
      'Diagnostic skills to assess situations quickly',
      'Life-saving instincts and precision',
      'Calm under pressure with steady hands'
    ],
    'Firefighter': [
      'Heroic bravery in dangerous situations',
      'Quick response time when it matters',
      'Saves the day when others panic'
    ],
    'Football': [
      'Team coordination and strategic plays',
      'Athletic performance under pressure',
      'Touchdown mentality - always aiming to win'
    ],
    'Gamer': [
      'Next-level strategic thinking and pattern recognition',
      'Competitive gaming experience with quick reflexes',
      'Boss-level difficulty? Bring it on!'
    ],
    'King': [
      'Royal wisdom and commanding presence',
      'Natural leadership that others follow',
      'Crown-worthy decision making'
    ],
    'Ninja': [
      'Stealth and precision in every move',
      'Ancient warrior wisdom meets modern tactics',
      'Silent but deadly effective'
    ],
    'Pharao': [
      'Ancient wisdom and pyramid-level strategic thinking',
      'Divine insight into hidden patterns',
      'Built civilizations, can handle duck races'
    ],
    'Pirate': [
      'Treasure-hunting instincts for finding value',
      'Adventurous spirit and risk-taking ability',
      'Navigates stormy waters like a pro'
    ],
    'Sailor': [
      'Ocean navigation skills and steady hands',
      'Weather any storm with maritime wisdom',
      'Compass always points to victory'
    ],
    'Samurai': [
      'Honor-bound precision and disciplined focus',
      'Sword-sharp decision making',
      'Way of the warrior leads to triumph'
    ],
    'Viking': [
      'Fearless explorer of uncharted territories',
      'Berserker-level determination to win',
      'Raid and conquer mindset'
    ],
    'Wizard': [
      'Magical insight into future outcomes',
      'Spellbinding analytical abilities',
      'Enchanted wisdom beyond mortal understanding'
    ]
  };

  const reasoning: Record<string, string> = {};
  
  selectedDucks.forEach(duck => {
    const reasons = reasoningMap[duck] || ['This duck has special qualities that caught my attention'];
    const randomReason = reasons[Math.floor(Math.random() * reasons.length)];
    reasoning[duck] = randomReason;
  });
  
  return reasoning;
}

function generateOverallStrategy(selectedDucks: string[], topic: string): string {
  const strategies = [
    `My ${selectedDucks.length}-duck formation creates the perfect balance of ${selectedDucks[0].toLowerCase()} leadership, ${selectedDucks[1].toLowerCase()} strategy, and ${selectedDucks[2].toLowerCase()} execution power.`,
    `For "${topic}", I've assembled a dream team: ${selectedDucks.join(', ')}. Each brings unique strengths that complement the others perfectly.`,
    `This combination of ${selectedDucks.join(' + ')} creates an unstoppable force. Their diverse skills cover all possible scenarios.`,
    `Strategic duck deployment: ${selectedDucks[0]} takes point, ${selectedDucks[1]} provides support, while ${selectedDucks[2]} and ${selectedDucks[3]} handle the wild cards.`
  ];
  
  return strategies[Math.floor(Math.random() * strategies.length)];
}