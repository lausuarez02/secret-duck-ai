'use client';

interface DuckAvatarProps {
  duckType: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function DuckAvatar({ duckType, size = 'md', className = '' }: DuckAvatarProps) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const getDuckColor = (type: string) => {
    const colors: Record<string, string> = {
      'Donald Duck': '#FFE135',
      'Daffy Duck': '#2C2C2C',
      'Howard the Duck': '#8B4513',
      'Rubber Duck': '#FFD700',
      'Peking Duck': '#D2691E',
      'Duck Hunt Dog': '#DEB887',
      'Scrooge McDuck': '#1E90FF',
      'Darkwing Duck': '#4B0082',
      'Psyduck': '#FFD700',
      'Duckworth': '#696969',
      'The Leader': '#FF6B35',
      'The Shy One': '#C7CEEA',
      'The Showoff': '#FF006E',
      'The Foodie': '#FB8500',
      'The Navigator': '#219EBC',
      'The Singer': '#8ECAE6',
      'The Philosopher': '#8B5CF6',
      'The Athlete': '#10B981',
      'The Romantic': '#EC4899',
      'The Rebel': '#EF4444',
    };
    
    return colors[type] || '#FFC839';
  };

  const color = getDuckColor(duckType);

  return (
    <div className={`${sizeClasses[size]} ${className} relative`}>
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full rounded-full bg-gradient-to-br from-duck-primary/20 to-duck-yellow/20 border-2 border-duck-primary/30"
      >
        <defs>
          <radialGradient id={`duckGrad-${duckType}`} cx="0.3" cy="0.3" r="0.8">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor={color} stopOpacity={0.7} />
          </radialGradient>
        </defs>
        
        {/* Duck body */}
        <ellipse cx="50" cy="60" rx="25" ry="20" fill={`url(#duckGrad-${duckType})`} />
        
        {/* Duck head */}
        <circle cx="50" cy="35" r="18" fill={`url(#duckGrad-${duckType})`} />
        
        {/* Duck bill */}
        <ellipse cx="58" cy="38" rx="8" ry="4" fill="#FFA500" />
        
        {/* Duck eye */}
        <circle cx="46" cy="30" r="3" fill="white" />
        <circle cx="47" cy="29" r="1.5" fill="black" />
        
        {/* Wing detail */}
        <ellipse cx="40" cy="55" rx="8" ry="12" fill="rgba(255,255,255,0.1)" />
      </svg>
      
      {/* Character indicator */}
      <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-duck-primary rounded-full border-2 border-duck-ink flex items-center justify-center">
        <span className="text-[8px] font-bold text-duck-ink">
          {duckType.charAt(0)}
        </span>
      </div>
    </div>
  );
}