// VF5 REVO Pro - Main Application Script

// Character Database
const characters = [
  {
    id: 'akira',
    name: 'Akira Yuki',
    icon: '🥋',
    style: 'Bajiquan',
    difficulty: '★★★★★',
    speed: '★★★☆☆',
    power: '★★★★★',
    description: 'The original protagonist and a master of Bajiquan. Akira excels at powerful strikes and devastating combos but requires precise execution.',
    strengths: [
      'Highest damage potential in the game',
      'Excellent range with standing P and bodycheck',
      'Strong throw game with multiple options',
      'Devastating wall combos',
      'Good mix-up potential with stances'
    ]
  },
  {
    id: 'pai',
    name: 'Pai Chan',
    icon: '🎭',
    style: 'Mizongquan (Ensei Ken)',
    difficulty: '★★★★☆',
    speed: '★★★★★',
    power: '★★★☆☆',
    description: 'Fast and agile fighter with excellent pressure tools. Pai excels at rushdown and maintaining offensive momentum.',
    strengths: [
      'Fastest attacks in the game',
      'Excellent pressure with fast mid attacks',
      'Strong okizeme (wake-up pressure)',
      'Good sidestep attacks',
      'Multiple stance transitions'
    ]
  },
  {
    id: 'lau',
    name: 'Lau Chan',
    icon: '🐉',
    style: 'Tiger Swallow Fist (Koenken)',
    difficulty: '★★★★☆',
    speed: '★★★★☆',
    power: '★★★★☆',
    description: 'Well-rounded fighter with strong fundamentals. Master of feints and counter attacks.',
    strengths: [
      'Excellent counter hit game',
      'Strong mid attacks',
      'Good defensive options',
      'Versatile move set',
      'Strong at all ranges'
    ]
  },
  {
    id: 'wolf',
    name: 'Wolf Hawkfield',
    icon: '🤼',
    style: 'Professional Wrestling',
    difficulty: '★★★☆☆',
    speed: '★★☆☆☆',
    power: '★★★★★',
    description: 'Powerful grappler with devastating throws and strike combos. Controls the match through threat of command grabs.',
    strengths: [
      'Highest damage throws in game',
      'Multiple command grab options',
      'Strong strike game to setup throws',
      'Excellent wall carry',
      'Great ring control'
    ]
  },
  {
    id: 'jeffry',
    name: 'Jeffry McWild',
    icon: '🏋️',
    style: 'Pancratium',
    difficulty: '★★★☆☆',
    speed: '★★☆☆☆',
    power: '★★★★★',
    description: 'Australian powerhouse with incredible damage output. Mix of powerful strikes and devastating throws.',
    strengths: [
      'Massive damage per hit',
      'Strong throw game',
      'Excellent at close range',
      'Good wall damage',
      'Simple but effective gameplan'
    ]
  },
  {
    id: 'kage',
    name: 'Kage-Maru',
    icon: '🥷',
    style: 'Hagakure-ryu Jujutsu',
    difficulty: '★★★★☆',
    speed: '★★★★★',
    power: '★★★☆☆',
    description: 'Ninja with excellent mobility and evasive options. Specializes in counter attacks and juggle combos.',
    strengths: [
      'Best sidestep in the game',
      'Excellent juggle combos',
      'Strong evasive moves',
      'Good mix-up game',
      'Multiple stance options'
    ]
  },
  {
    id: 'sarah',
    name: 'Sarah Bryant',
    icon: '💃',
    style: 'Martial Arts',
    difficulty: '★★★☆☆',
    speed: '★★★★☆',
    power: '★★★★☆',
    description: 'Rush-down specialist with flamingo stance. Excellent pressure and combo potential.',
    strengths: [
      'Strong flamingo stance pressure',
      'Good combo damage',
      'Fast strikes',
      'Multiple launcher options',
      'Strong okizeme'
    ]
  },
  {
    id: 'jacky',
    name: 'Jacky Bryant',
    icon: '🏍️',
    style: 'Jeet Kune Do',
    difficulty: '★★★☆☆',
    speed: '★★★★☆',
    power: '★★★★☆',
    description: 'Well-rounded fighter with strong fundamentals. Excellent at all ranges with good frame advantage.',
    strengths: [
      'Excellent frame traps',
      'Strong mid attacks',
      'Good sidekick for keepout',
      'Solid combo damage',
      'Easy execution'
    ]
  },
  {
    id: 'shun',
    name: 'Shun Di',
    icon: '🍶',
    style: 'Zui Ba Xian Quan (Drunken Kung-Fu)',
    difficulty: '★★★★★',
    speed: '★★★☆☆',
    power: '★★★★☆',
    description: 'Unpredictable drunken master. Stance-heavy character with unique move properties.',
    strengths: [
      'Unique evasive properties',
      'Strong stance mix-ups',
      'Good throw game',
      'Confusing movement',
      'High damage potential'
    ]
  },
  {
    id: 'lion',
    name: 'Lion Rafale',
    icon: '🦁',
    style: 'Tourou-ken (Praying Mantis)',
    difficulty: '★★★★☆',
    speed: '★★★★★',
    power: '★★☆☆☆',
    description: 'Small and fast fighter with excellent evasion. Specializes in stance transitions and mix-ups.',
    strengths: [
      'Excellent evasive moves',
      'Fast strikes',
      'Strong stance game',
      'Good at creating whiffs',
      'Difficult to track'
    ]
  },
  {
    id: 'aoi',
    name: 'Aoi Umenokoji',
    icon: '🌸',
    style: 'Aiki-jujutsu',
    difficulty: '★★★★★',
    speed: '★★★☆☆',
    power: '★★★☆☆',
    description: 'Defensive specialist with parries and reversals. Punishes opponent aggression.',
    strengths: [
      'Multiple parry options',
      'Strong defensive game',
      'Good reversals',
      'Excellent at turning defense into offense',
      'Frustrating to fight against'
    ]
  },
  {
    id: 'lei',
    name: 'Lei-Fei',
    icon: '☯️',
    style: 'Shoen Xing Yi Quan',
    difficulty: '★★★★★',
    speed: '★★★★☆',
    power: '★★★★☆',
    description: 'Stance-based fighter with five elements system. Extremely versatile but complex.',
    strengths: [
      'Five unique stances',
      'Unpredictable offense',
      'Strong mix-up game',
      'Good damage',
      'Versatile toolset'
    ]
  },
  {
    id: 'vanessa',
    name: 'Vanessa Lewis',
    icon: '🥊',
    style: 'Vale Tudo & Muay Thai',
    difficulty: '★★★★☆',
    speed: '★★★★☆',
    power: '★★★★☆',
    description: 'Dual-stance fighter switching between defensive and offensive styles.',
    strengths: [
      'Two distinct fighting styles',
      'Strong pressure in offensive stance',
      'Good defensive options',
      'Versatile gameplay',
      'Good frame traps'
    ]
  },
  {
    id: 'brad',
    name: 'Brad Burns',
    icon: '🏆',
    style: 'Muay Thai',
    difficulty: '★★★☆☆',
    speed: '★★★★☆',
    power: '★★★★☆',
    description: 'Muay Thai specialist with strong strikes and clinch game. Excellent at close range.',
    strengths: [
      'Powerful strikes',
      'Strong clinch throws',
      'Good range with kicks',
      'Solid damage',
      'Straightforward gameplan'
    ]
  },
  {
    id: 'goh',
    name: 'Goh Hinogami',
    icon: '🎯',
    style: 'Judo',
    difficulty: '★★★★★',
    speed: '★★★☆☆',
    power: '★★★★☆',
    description: 'Technical grappler with sabaki parries. Difficult but rewarding to master.',
    strengths: [
      'Powerful sabaki system',
      'Strong throw game',
      'Good parries',
      'Excellent counter hit damage',
      'Unique move properties'
    ]
  },
  {
    id: 'eileen',
    name: 'Eileen',
    icon: '🌺',
    style: 'Kou Ken (Monkey Kung-Fu)',
    difficulty: '★★★★☆',
    speed: '★★★★★',
    power: '★★★☆☆',
    description: 'Agile monkey style fighter with excellent evasion and speed.',
    strengths: [
      'Extremely fast attacks',
      'Great evasive moves',
      'Strong low attacks',
      'Good stance transitions',
      'Difficult to predict'
    ]
  },
  {
    id: 'elblaze',
    name: 'El Blaze',
    icon: '🔥',
    style: 'Lucha Libre',
    difficulty: '★★★☆☆',
    speed: '★★★★☆',
    power: '★★★★☆',
    description: 'High-flying luchador with aerial attacks and command grabs.',
    strengths: [
      'Unique aerial moves',
      'Strong throw game',
      'Good mobility',
      'Flashy combos',
      'Unpredictable offense'
    ]
  },
  {
    id: 'jean',
    name: 'Jean Kujo',
    icon: '🎩',
    style: 'Karate',
    difficulty: '★★★★☆',
    speed: '★★★★☆',
    power: '★★★★☆',
    description: 'Karate practitioner with strong fundamentals. Charge system for enhanced moves.',
    strengths: [
      'Charge system for power-ups',
      'Strong basic moves',
      'Good reach',
      'Versatile toolset',
      'High skill ceiling'
    ]
  }
];

// Frame Data Database (Comprehensive)
const frameData = {
  akira: [
    { move: 'P (Jab)', command: 'P', startup: 8, onBlock: 2, onHit: 5, onCH: 5, notes: 'Fastest attack, +2 on block' },
    { move: 'PP', command: 'PP', startup: 8, onBlock: -4, onHit: 2, onCH: 2, notes: 'Natural combo on normal hit' },
    { move: '6P (Double Palm)', command: '6P', startup: 14, onBlock: -9, onHit: 3, onCH: 'Stagger', notes: 'Mid attack, staggers on CH' },
    { move: 'K (High Kick)', command: 'K', startup: 12, onBlock: -2, onHit: 4, onCH: 4, notes: 'High kick with good range' },
    { move: '2P (Low Punch)', command: '2P', startup: 10, onBlock: -3, onHit: 3, onCH: 3, notes: 'Special mid, +3 on hit' },
    { move: '3P (Uppercut)', command: '3P', startup: 15, onBlock: -15, onHit: 'Launch', onCH: 'Launch', notes: 'Launcher, very unsafe' },
    { move: '46P (Bodycheck)', command: '46P', startup: 18, onBlock: -16, onHit: 'Knockdown', onCH: 'Knockdown', notes: 'Armored, crashes on NH/CH' },
    { move: '66P (Shoulder Ram)', command: '66P', startup: 17, onBlock: -9, onHit: 4, onCH: 'Launch', notes: 'Half-circular, launches on CH' },
    { move: '4P+K+G (Guard Break)', command: '4P+K+G', startup: 20, onBlock: 5, onHit: 'Guard Break', onCH: 'Guard Break', notes: 'Unblockable guard break' },
    { move: '6K (Mid Kick)', command: '6K', startup: 16, onBlock: -7, onHit: 5, onCH: 5, notes: 'Strong mid kick' },
    { move: '3K (Low Sweep)', command: '3K', startup: 14, onBlock: -14, onHit: -3, onCH: 'Knockdown', notes: 'Low attack, knocks down on CH' },
    { move: '2K (Low Kick)', command: '2K', startup: 12, onBlock: -11, onHit: -2, onCH: 0, notes: 'Fast low option' }
  ],
  pai: [
    { move: 'P (Jab)', command: 'P', startup: 8, onBlock: 2, onHit: 5, onCH: 5, notes: 'Fastest attack, +2 on block' },
    { move: 'PP', command: 'PP', startup: 8, onBlock: -4, onHit: 2, onCH: 2, notes: 'High high string' },
    { move: 'PPP', command: 'PPP', startup: 8, onBlock: -8, onHit: -2, onCH: 'Launch', notes: 'Full string, launches on CH' },
    { move: '6P (Elbow)', command: '6P', startup: 12, onBlock: -6, onHit: 5, onCH: 5, notes: 'Mid elbow, excellent range' },
    { move: '66P (Dash Elbow)', command: '66P', startup: 16, onBlock: -5, onHit: 6, onCH: 'Stagger', notes: 'Moving mid attack' },
    { move: '3P (Uppercut)', command: '3P', startup: 13, onBlock: -13, onHit: 'Launch', onCH: 'Launch', notes: 'Fast launcher' },
    { move: 'K (High Kick)', command: 'K', startup: 11, onBlock: -1, onHit: 5, onCH: 5, notes: 'Fast high kick' },
    { move: '2P (Low Punch)', command: '2P', startup: 10, onBlock: -3, onHit: 3, onCH: 3, notes: 'Special mid' },
    { move: '6K (Mid Kick)', command: '6K', startup: 14, onBlock: -6, onHit: 5, onCH: 'Stagger', notes: 'Mid kick, staggers on CH' },
    { move: '4K (Sidekick)', command: '4K', startup: 15, onBlock: -9, onHit: 'Launch', onCH: 'Launch', notes: 'Slower launcher' },
    { move: '2K (Low Kick)', command: '2K', startup: 12, onBlock: -11, onHit: -2, onCH: 0, notes: 'Low poke' },
    { move: 'P+K (Spin)', command: 'P+K', startup: 18, onBlock: -10, onHit: 'Knockdown', onCH: 'Knockdown', notes: 'Evasive mid' }
  ],
  lau: [
    { move: 'P (Jab)', command: 'P', startup: 8, onBlock: 2, onHit: 5, onCH: 5, notes: 'Standard jab' },
    { move: 'PP', command: 'PP', startup: 8, onBlock: -4, onHit: 2, onCH: 'Launch', notes: 'Second hit launches on CH' },
    { move: '6P (Elbow)', command: '6P', startup: 12, onBlock: -5, onHit: 6, onCH: 6, notes: 'Excellent mid' },
    { move: '66P (Palm)', command: '66P', startup: 16, onBlock: -8, onHit: 4, onCH: 'Launch', notes: 'Launches on CH' },
    { move: '3P (Uppercut)', command: '3P', startup: 14, onBlock: -14, onHit: 'Launch', onCH: 'Launch', notes: 'Reliable launcher' },
    { move: 'K (High Kick)', command: 'K', startup: 12, onBlock: -2, onHit: 4, onCH: 4, notes: 'Good high kick' },
    { move: '2P (Low Punch)', command: '2P', startup: 10, onBlock: -3, onHit: 3, onCH: 3, notes: 'Special mid' },
    { move: '6K (Mid Kick)', command: '6K', startup: 16, onBlock: -8, onHit: 5, onCH: 5, notes: 'Solid mid kick' },
    { move: '2K (Low Kick)', command: '2K', startup: 12, onBlock: -11, onHit: -2, onCH: 0, notes: 'Low poke' },
    { move: '4K+G (Feint)', command: '4K+G', startup: '-', onBlock: '-', onHit: '-', onCH: '-', notes: 'Feint to bait reactions' }
  ],
  wolf: [
    { move: 'P (Jab)', command: 'P', startup: 8, onBlock: 2, onHit: 5, onCH: 5, notes: 'Standard jab' },
    { move: '6P (Lariat)', command: '6P', startup: 14, onBlock: -8, onHit: 5, onCH: 'Knockdown', notes: 'High attack with good range' },
    { move: '2P (Low Punch)', command: '2P', startup: 10, onBlock: -3, onHit: 3, onCH: 3, notes: 'Special mid' },
    { move: '3P (Uppercut)', command: '3P', startup: 15, onBlock: -15, onHit: 'Launch', onCH: 'Launch', notes: 'Launcher' },
    { move: 'K (High Kick)', command: 'K', startup: 13, onBlock: -3, onHit: 4, onCH: 4, notes: 'High kick' },
    { move: '6K (Mid Kick)', command: '6K', startup: 17, onBlock: -9, onHit: 5, onCH: 5, notes: 'Mid kick' },
    { move: '46P+G (Giant Swing)', command: '46P+G', startup: 12, onBlock: '-', onHit: 'Throw', onCH: 'Throw', notes: 'Command throw, highest damage' },
    { move: '41236P+G (Burning Hammer)', command: '41236P+G', startup: 12, onBlock: '-', onHit: 'Throw', onCH: 'Throw', notes: 'Command throw, massive damage' },
    { move: '2K (Low Kick)', command: '2K', startup: 12, onBlock: -11, onHit: -2, onCH: 0, notes: 'Low poke' },
    { move: '66K (Shoulder Tackle)', command: '66K', startup: 18, onBlock: -10, onHit: 'Knockdown', onCH: 'Knockdown', notes: 'Armored attack' }
  ],
  // NOTE: Frame data is provided for key characters as examples. In a production application,
  // this would be expanded to include complete move lists for all 18 characters.
  // Frame data should be verified against official sources and updated for balance patches.
};

// Counter System Database
const counterData = {
  high: [
    {
      situation: 'Opponent High Punch',
      counters: [
        { move: 'Crouch Dash (2_3)', frames: 'Evades highs', damage: '-', notes: 'Universal counter, allows full combo punish' },
        { move: 'Standing Block', frames: '+2 to +3', damage: '-', notes: 'Safe option, allows throw or fast attack after' },
        { move: 'Low Throw', frames: '12-15f', damage: '40-50', notes: 'Catches opponent off-guard' }
      ]
    },
    {
      situation: 'Opponent High Kick',
      counters: [
        { move: 'Crouch Guard', frames: 'Evades', damage: '-', notes: 'Make kick whiff for big punish' },
        { move: 'Sabaki (If available)', frames: 'Varies', damage: 'Combo', notes: 'Character-specific high sabaki' },
        { move: 'Low Punch (2P)', frames: '10f startup', damage: '8-10', notes: 'Interrupts slower high kicks' }
      ]
    }
  ],
  mid: [
    {
      situation: 'Opponent Mid Punch (-6 to -9 on block)',
      counters: [
        { move: 'P (Jab)', frames: '8f startup', damage: '8', notes: 'Guaranteed after -8 or worse' },
        { move: '6P (Elbow)', frames: '12-14f', damage: '12-16', notes: 'Guaranteed after -12 or worse, better damage' },
        { move: 'Throw', frames: '10-12f', damage: '50-60', notes: 'Good damage, requires close range' }
      ]
    },
    {
      situation: 'Opponent Mid Kick (-10 to -15 on block)',
      counters: [
        { move: '3P (Launcher)', frames: '13-15f', damage: '15+combo', notes: 'Full combo punish on -13 or worse' },
        { move: '6P+K (Mid attack)', frames: '12-16f', damage: '20-25', notes: 'Good damage mid punish' },
        { move: 'P+G/P+K+G Throw', frames: '12f', damage: '50-70', notes: 'High damage throw punish' }
      ]
    }
  ],
  low: [
    {
      situation: 'Opponent Low Punch',
      counters: [
        { move: 'Stand Guard', frames: '-11 to -15', damage: '-', notes: 'Block then punish with mid/high' },
        { move: '3P (Launcher)', frames: '13-15f', damage: 'Full combo', notes: 'Guaranteed on -13 or worse lows' },
        { move: 'P (Jab)', frames: '8f', damage: '8', notes: 'Guaranteed punish, less damage' }
      ]
    },
    {
      situation: 'Opponent Low Kick (-12 to -16 on block)',
      counters: [
        { move: '3P (Launcher)', frames: '13-15f', damage: 'Full combo', notes: 'Most low kicks are very unsafe' },
        { move: '6P (Elbow)', frames: '12-14f', damage: '12-16', notes: 'Guaranteed on -12 or worse' },
        { move: 'Combo Starter', frames: '14-16f', damage: '30+', notes: 'Character specific optimal punish' }
      ]
    }
  ],
  throw: [
    {
      situation: 'Opponent Throw Attempt',
      counters: [
        { move: 'Throw Escape (P+G)', frames: '10f window', damage: '-', notes: 'Generic throw escape, must match direction' },
        { move: 'Attack Before Throw', frames: '8-12f', damage: 'Varies', notes: 'Interrupt with fast attack if anticipated' },
        { move: 'Jump/Evade', frames: '-', damage: '-', notes: 'Risky but avoids all throws' }
      ]
    },
    {
      situation: 'Command Throw',
      counters: [
        { move: 'Specific Escape', frames: '12f window', damage: '-', notes: 'Each command throw has specific escape' },
        { move: 'Attack First', frames: '8-12f', damage: 'Interrupt', notes: 'Best defense is good offense' },
        { move: 'Maintain Distance', frames: '-', damage: '-', notes: 'Stay out of throw range' }
      ]
    }
  ],
  special: [
    {
      situation: 'Sabaki/Parry Attempts',
      counters: [
        { move: 'Throw', frames: '10-12f', damage: '50+', notes: 'Sabaki/parries don\'t work vs throws' },
        { move: 'Delay Attack', frames: '-', damage: 'Varies', notes: 'Wait out parry window then attack' },
        { move: 'Low Attack', frames: 'Varies', damage: 'Varies', notes: 'Many parries only work on high/mid' }
      ]
    }
  ]
};

// Combo Database
const combos = {
  akira: {
    bread_and_butter: [
      { notation: '3P → 6P+K → 46P+KP', damage: 70, notes: 'Basic launcher combo, consistent' },
      { notation: '66P (CH) → 6P+K → 46P+KP', damage: 75, notes: 'Counter hit confirm combo' },
      { notation: 'P+K (Counter) → 6P+KP → 46P+KP', damage: 65, notes: 'Counter starter' }
    ],
    advanced: [
      { notation: '3P → 6P+K → 46P+K → 2P → 46P+KP', damage: 85, notes: 'Optimal damage, tight timing' },
      { notation: '66P (CH) → 46P+K → 6P+K → 46P+KP', damage: 90, notes: 'Max damage counter hit' },
      { notation: '(Wall) 3P → 46P → 4P+K+G → P+G', damage: 95, notes: 'Wall combo with guard break' }
    ],
    wall: [
      { notation: '46P (Wall Hit) → 4P+K+G → P+G', damage: 80, notes: 'Simple wall combo' },
      { notation: '3P → Carry → 46P → 4P+K+G → P+G', damage: 100, notes: 'Max wall damage' }
    ]
  },
  pai: {
    bread_and_butter: [
      { notation: '3P → 6K+G → 4P', damage: 55, notes: 'Easy and reliable' },
      { notation: 'PPP (CH) → 6K+G → 4P', damage: 60, notes: 'Counter hit launch' },
      { notation: '4K → 46K+G → 3P+K', damage: 58, notes: 'Side launcher combo' }
    ],
    advanced: [
      { notation: '3P → 6K+G → 2K → 4P → P+K', damage: 68, notes: 'Optimal BnB' },
      { notation: 'PPP (CH) → 6K+G → 2K → 4P → 6P+K', damage: 75, notes: 'Max CH damage' },
      { notation: '(Back Turned) P+K → 3P+K', damage: 45, notes: 'Okizeme setup' }
    ],
    pressure: [
      { notation: '6P → 2P → 6P', damage: 32, notes: 'Frame trap string' },
      { notation: 'PP → 2K → 6P', damage: 28, notes: 'High to low mixup' },
      { notation: '6P → Throw', damage: 58, notes: 'Strike throw mixup' }
    ]
  },
  lau: {
    bread_and_butter: [
      { notation: '3P → 6P+K → 3PPP', damage: 65, notes: 'Standard launcher combo' },
      { notation: 'PP (CH) → 6P+K → 3PPP', damage: 70, notes: 'Counter hit combo' },
      { notation: '66P (CH) → 6P+K → 3PPP', damage: 72, notes: 'Moving attack CH' }
    ],
    advanced: [
      { notation: '3P → 6P+K → 4P+K → 3PPP', damage: 75, notes: 'Optimal damage route' },
      { notation: '(Koenkan) P+K+G → 3PPP', damage: 60, notes: 'Stance cancel combo' },
      { notation: '66P (CH) → 6P+K → 4P+K → 6P+K → 3PPP', damage: 85, notes: 'Maximum damage' }
    ]
  },
  wolf: {
    bread_and_butter: [
      { notation: '3P → 2P → 46P+K', damage: 60, notes: 'Basic launcher combo' },
      { notation: 'P+K (CH) → 66K → 46P+G', damage: 95, notes: 'Counter to throw setup' },
      { notation: '46P+G (Throw)', damage: 85, notes: 'Giant Swing command throw' }
    ],
    advanced: [
      { notation: '3P → 2P → 46P+K → 46P+G', damage: 110, notes: 'Combo into command throw' },
      { notation: '(Wall) Any launcher → 46P+G', damage: 115, notes: 'Wall throw guaranteed' },
      { notation: '41236P+G (Burning Hammer)', damage: 120, notes: 'Highest single throw damage' }
    ]
  }
};

// Match-up Data (Simplified)
const matchupData = [
  { char: 'Akira', akira: '5-5', pai: '4-6', lau: '5-5', wolf: '6-4', jeffry: '6-4', kage: '5-5', sarah: '5-5', jacky: '5-5' },
  { char: 'Pai', akira: '6-4', pai: '5-5', lau: '5-5', wolf: '5-5', jeffry: '5-5', kage: '5-5', sarah: '5-5', jacky: '6-4' },
  { char: 'Lau', akira: '5-5', pai: '5-5', lau: '5-5', wolf: '6-4', jeffry: '6-4', kage: '5-5', sarah: '5-5', jacky: '5-5' },
  { char: 'Wolf', akira: '4-6', pai: '5-5', lau: '4-6', wolf: '5-5', jeffry: '5-5', kage: '4-6', sarah: '5-5', jacky: '4-6' },
  { char: 'Jeffry', akira: '4-6', pai: '5-5', lau: '4-6', wolf: '5-5', jeffry: '5-5', kage: '4-6', sarah: '5-5', jacky: '4-6' },
  { char: 'Kage', akira: '5-5', pai: '5-5', lau: '5-5', wolf: '6-4', jeffry: '6-4', kage: '5-5', sarah: '5-5', jacky: '5-5' },
  { char: 'Sarah', akira: '5-5', pai: '5-5', lau: '5-5', wolf: '5-5', jeffry: '5-5', kage: '5-5', sarah: '5-5', jacky: '5-5' },
  { char: 'Jacky', akira: '5-5', pai: '4-6', lau: '5-5', wolf: '6-4', jeffry: '6-4', kage: '5-5', sarah: '5-5', jacky: '5-5' }
];

// Application State
let currentScreen = 'main-menu';
let selectedCharacter = null;

// Initialize Application
function init() {
  populateCharacterSelects();
  populateCharacterGrid();
  populateMatchupChart();
  showScreen('main-menu');
}

// Screen Navigation
function showScreen(screenId) {
  // Hide all screens
  document.querySelectorAll('.screen').forEach(screen => {
    screen.classList.remove('active');
  });
  
  // Show selected screen
  const screen = document.getElementById(screenId);
  if (screen) {
    screen.classList.add('active');
    currentScreen = screenId;
  }
}

// Populate character selects
function populateCharacterSelects() {
  const selects = [
    document.getElementById('frame-character-select'),
    document.getElementById('combo-character-select'),
    document.getElementById('counter-your-char')
  ];
  
  selects.forEach(select => {
    if (select) {
      characters.forEach(char => {
        const option = document.createElement('option');
        option.value = char.id;
        option.textContent = `${char.icon} ${char.name}`;
        select.appendChild(option);
      });
    }
  });
}

// Populate character grid
function populateCharacterGrid() {
  const grid = document.getElementById('character-grid');
  if (!grid) return;
  
  characters.forEach(char => {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.onclick = (e) => showCharacterDetails(char, e);
    
    card.innerHTML = `
      <div class="character-icon">${char.icon}</div>
      <div class="character-name">${char.name}</div>
    `;
    
    grid.appendChild(card);
  });
}

// Show character details
function showCharacterDetails(char, event) {
  // Remove selection from all cards
  document.querySelectorAll('.character-card').forEach(card => {
    card.classList.remove('selected');
  });
  
  // Add selection to clicked card
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('selected');
  }
  
  // Populate details
  document.getElementById('char-name').textContent = `${char.icon} ${char.name}`;
  document.getElementById('char-style').textContent = char.style;
  document.getElementById('char-difficulty').textContent = char.difficulty;
  document.getElementById('char-speed').textContent = char.speed;
  document.getElementById('char-power').textContent = char.power;
  document.getElementById('char-desc').textContent = char.description;
  
  const strengthsList = document.getElementById('char-strengths-list');
  strengthsList.innerHTML = '';
  char.strengths.forEach(strength => {
    const li = document.createElement('li');
    li.textContent = strength;
    strengthsList.appendChild(li);
  });
  
  // Show details section
  document.getElementById('character-details').classList.remove('hidden');
}

// Load frame data
function loadFrameData() {
  const select = document.getElementById('frame-character-select');
  const display = document.getElementById('frame-data-display');
  const charId = select.value;
  
  if (!charId || !frameData[charId]) {
    display.innerHTML = '<p class="help-text">Select a character to view their frame data</p>';
    return;
  }
  
  const data = frameData[charId];
  let html = '<table class="frame-table"><thead><tr>';
  html += '<th>Move</th><th>Command</th><th>Startup</th><th>On Block</th><th>On Hit</th><th>On CH</th><th>Notes</th>';
  html += '</tr></thead><tbody>';
  
  data.forEach(move => {
    html += '<tr>';
    html += `<td>${move.move}</td>`;
    html += `<td><code>${move.command}</code></td>`;
    html += `<td>${move.startup}f</td>`;
    html += `<td class="${getFrameClass(move.onBlock)}">${formatFrame(move.onBlock)}</td>`;
    html += `<td class="${getFrameClass(move.onHit)}">${formatFrame(move.onHit)}</td>`;
    html += `<td>${formatFrame(move.onCH)}</td>`;
    html += `<td>${move.notes}</td>`;
    html += '</tr>';
  });
  
  html += '</tbody></table>';
  display.innerHTML = html;
}

// Format frame data
function formatFrame(value) {
  if (typeof value === 'number') {
    return value >= 0 ? `+${value}` : value;
  }
  return value;
}

// Get frame class for coloring
function getFrameClass(value) {
  if (typeof value === 'number') {
    if (value > 0) return 'frame-positive';
    if (value < 0) return 'frame-negative';
    return 'frame-neutral';
  }
  return '';
}

// Load counter data
function loadCounterData() {
  const yourChar = document.getElementById('counter-your-char').value;
  const moveType = document.getElementById('opponent-move-type').value;
  const display = document.getElementById('counter-data-display');
  
  if (!yourChar || !moveType) {
    display.innerHTML = '<p class="help-text">Select your character and opponent move type to see best counters and punishes</p>';
    return;
  }
  
  const char = characters.find(c => c.id === yourChar);
  const counters = counterData[moveType] || [];
  
  let html = '';
  counters.forEach(counter => {
    html += '<div class="counter-card">';
    html += `<h3>${counter.situation}</h3>`;
    
    counter.counters.forEach(option => {
      html += '<div class="counter-move">';
      html += `<h4>${option.move}</h4>`;
      html += '<div class="counter-info">';
      html += `<div class="counter-info-item"><span class="info-label">Frames:</span><span class="info-value">${option.frames}</span></div>`;
      html += `<div class="counter-info-item"><span class="info-label">Damage:</span><span class="info-value">${option.damage}</span></div>`;
      html += `<div class="counter-info-item"><span class="info-label">Notes:</span><span class="info-value">${option.notes}</span></div>`;
      html += '</div>';
      html += '<span class="punish-tag">PUNISH</span>';
      html += '</div>';
    });
    
    html += '</div>';
  });
  
  display.innerHTML = html;
}

// Load combos
function loadCombos() {
  const select = document.getElementById('combo-character-select');
  const display = document.getElementById('combo-display');
  const charId = select.value;
  
  if (!charId || !combos[charId]) {
    display.innerHTML = '<p class="help-text">Select a character to view optimal combos and strategies</p>';
    return;
  }
  
  const charCombos = combos[charId];
  let html = '';
  
  // Bread and Butter
  if (charCombos.bread_and_butter) {
    html += '<div class="combo-category">';
    html += '<h3>🍞 Bread & Butter Combos</h3>';
    charCombos.bread_and_butter.forEach(combo => {
      html += '<div class="combo-item">';
      html += `<div class="combo-notation">${combo.notation}</div>`;
      html += `<div class="combo-damage">Damage: ${combo.damage}</div>`;
      html += `<div class="combo-notes">${combo.notes}</div>`;
      html += '</div>';
    });
    html += '</div>';
  }
  
  // Advanced
  if (charCombos.advanced) {
    html += '<div class="combo-category">';
    html += '<h3>⚡ Advanced Combos</h3>';
    charCombos.advanced.forEach(combo => {
      html += '<div class="combo-item">';
      html += `<div class="combo-notation">${combo.notation}</div>`;
      html += `<div class="combo-damage">Damage: ${combo.damage}</div>`;
      html += `<div class="combo-notes">${combo.notes}</div>`;
      html += '</div>';
    });
    html += '</div>';
  }
  
  // Wall
  if (charCombos.wall) {
    html += '<div class="combo-category">';
    html += '<h3>🧱 Wall Combos</h3>';
    charCombos.wall.forEach(combo => {
      html += '<div class="combo-item">';
      html += `<div class="combo-notation">${combo.notation}</div>`;
      html += `<div class="combo-damage">Damage: ${combo.damage}</div>`;
      html += `<div class="combo-notes">${combo.notes}</div>`;
      html += '</div>';
    });
    html += '</div>';
  }
  
  // Pressure
  if (charCombos.pressure) {
    html += '<div class="combo-category">';
    html += '<h3>🔥 Pressure Sequences</h3>';
    charCombos.pressure.forEach(combo => {
      html += '<div class="combo-item">';
      html += `<div class="combo-notation">${combo.notation}</div>`;
      html += `<div class="combo-damage">Damage: ${combo.damage}</div>`;
      html += `<div class="combo-notes">${combo.notes}</div>`;
      html += '</div>';
    });
    html += '</div>';
  }
  
  display.innerHTML = html;
}

// Populate matchup chart
function populateMatchupChart() {
  const container = document.getElementById('matchup-chart');
  if (!container) return;
  
  let html = '<table class="matchup-table"><thead><tr><th>Your Character</th>';
  
  // Header row with character names
  matchupData[0] && Object.keys(matchupData[0]).slice(1).forEach(key => {
    const char = characters.find(c => c.id === key);
    html += `<th>${char ? char.icon : ''}<br>${key.charAt(0).toUpperCase() + key.slice(1)}</th>`;
  });
  
  html += '</tr></thead><tbody>';
  
  // Data rows
  matchupData.forEach(row => {
    html += '<tr>';
    const char = characters.find(c => c.name === row.char);
    html += `<td><strong>${char ? char.icon : ''} ${row.char}</strong></td>`;
    
    Object.keys(row).slice(1).forEach(key => {
      const value = row[key];
      let className = 'matchup-even';
      
      if (value.startsWith('6') || value.startsWith('7') || value.startsWith('8')) {
        className = 'matchup-advantage';
      } else if (value.startsWith('4') || value.startsWith('3') || value.startsWith('2')) {
        className = 'matchup-disadvantage';
      }
      
      html += `<td class="${className}">${value}</td>`;
    });
    
    html += '</tr>';
  });
  
  html += '</tbody></table>';
  html += '<div style="margin-top: 20px; padding: 15px; background: rgba(30, 41, 59, 0.6); border-radius: 8px;">';
  html += '<p style="color: #94a3b8; margin-bottom: 10px;"><strong>Legend:</strong></p>';
  html += '<p style="color: #4ade80;">6-4 or better = Advantage</p>';
  html += '<p style="color: #fbbf24;">5-5 = Even matchup</p>';
  html += '<p style="color: #f87171;">4-6 or worse = Disadvantage</p>';
  html += '</div>';
  
  container.innerHTML = html;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', init);
