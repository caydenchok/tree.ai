export interface ModeFunction {
  id: string;
  name: string;
  description: string;
  examples: string[];
}

export interface ModeFunctions {
  [mode: string]: {
    functions: ModeFunction[];
    defaultPrompt: string;
  };
}

export const modeFunctions: ModeFunctions = {
  creative: {
    functions: [
      {
        id: 'story_generation',
        name: 'Generate Story',
        description: 'Create Malaysian-themed stories with local elements',
        examples: ['Write a story about Malacca sultanate', 'Create a modern KL ghost story']
      },
      {
        id: 'pantun_writing',
        name: 'Write Pantun',
        description: 'Generate traditional Malay pantun poetry',
        examples: ['Create a pantun about friendship', 'Write a modern pantun about technology']
      }
    ],
    defaultPrompt: 'I can help with creative writing. Try asking me to generate stories or pantun!'
  },
  
  coder: {
    functions: [
      {
        id: 'code_review',
        name: 'Review Code',
        description: 'Review and improve code quality',
        examples: ['Review my React component', 'Check my API implementation']
      },
      {
        id: 'debug',
        name: 'Debug Code',
        description: 'Help find and fix bugs',
        examples: ['Debug my authentication flow', 'Fix this error message']
      },
      {
        id: 'optimize',
        name: 'Optimize Code',
        description: 'Improve code performance',
        examples: ['Optimize database queries', 'Improve React rendering']
      }
    ],
    defaultPrompt: 'I can help with coding. Ask me to review, debug, or optimize your code!'
  },

  gamer: {
    functions: [
      {
        id: 'strategy',
        name: 'Game Strategy',
        description: 'Get strategies for specific games',
        examples: ['MLBB hero builds', 'PUBG Mobile landing spots']
      },
      {
        id: 'tournament_info',
        name: 'Tournament Info',
        description: 'Information about Malaysian tournaments',
        examples: ['Upcoming MY esports events', 'Local MLBB tournaments']
      },
      {
        id: 'streaming_guide',
        name: 'Streaming Tips',
        description: 'Help with game streaming',
        examples: ['Setup streaming PC', 'Best times to stream in MY']
      }
    ],
    defaultPrompt: 'I can help with gaming! Ask about strategies, tournaments, or streaming tips.'
  },

  analyst: {
    functions: [
      {
        id: 'market_analysis',
        name: 'Market Analysis',
        description: 'Analyze Malaysian market trends',
        examples: ['E-commerce trends in MY', 'Digital payment adoption']
      },
      {
        id: 'data_viz',
        name: 'Data Visualization',
        description: 'Help with data presentation',
        examples: ['Chart types for demographics', 'Visualization best practices']
      }
    ],
    defaultPrompt: 'I can help analyze data and market trends. What would you like to know?'
  },

  designer: {
    functions: [
      {
        id: 'interior_design',
        name: 'Interior Design',
        description: 'Malaysian interior design advice',
        examples: ['Modern Malay interior', 'Tropical house design']
      },
      {
        id: 'architecture',
        name: 'Architecture',
        description: 'Architectural design guidance',
        examples: ['Traditional roof designs', 'Modern Malaysian architecture']
      }
    ],
    defaultPrompt: 'I can help with design! Ask about interior design or architecture.'
  },

  writer: {
    functions: [
      {
        id: 'content_writing',
        name: 'Content Writing',
        description: 'Write Malaysian-focused content',
        examples: ['Blog post about local food', 'Social media content']
      },
      {
        id: 'business_writing',
        name: 'Business Writing',
        description: 'Professional writing help',
        examples: ['Formal letter in MY style', 'Business proposal format']
      }
    ],
    defaultPrompt: 'I can help with writing! Ask about content or business writing.'
  }
};
