export type Mode = 'default' | 'creative' | 'coder' | 'writer' | 'analyst' | 'gamer' | 'designer';

export interface ModeFunction {
  id: string;
  name: string;
  description: string;
  parameters?: {
    [key: string]: {
      type: string;
      description: string;
      required: boolean;
    };
  };
}

export const ModeFunctions: Record<Mode, ModeFunction[]> = {
  creative: [
    {
      id: 'write_story',
      name: 'Write Story',
      description: 'Generate a creative story based on given parameters',
      parameters: {
        genre: {
          type: 'string',
          description: 'Genre of the story (e.g., fantasy, mystery)',
          required: true
        },
        length: {
          type: 'string',
          description: 'Length of the story (short, medium, long)',
          required: false
        }
      }
    },
    {
      id: 'create_pantun',
      name: 'Create Pantun',
      description: 'Generate a traditional Malay pantun',
      parameters: {
        theme: {
          type: 'string',
          description: 'Theme of the pantun',
          required: true
        }
      }
    }
  ],
  coder: [
    {
      id: 'review_code',
      name: 'Code Review',
      description: 'Review and provide feedback on code',
      parameters: {
        language: {
          type: 'string',
          description: 'Programming language',
          required: true
        },
        code: {
          type: 'string',
          description: 'Code to review',
          required: true
        }
      }
    }
  ],
  writer: [
    {
      id: 'content_writing',
      name: 'Content Writing',
      description: 'Generate content for various purposes',
      parameters: {
        type: {
          type: 'string',
          description: 'Type of content (blog, article, social)',
          required: true
        }
      }
    }
  ],
  analyst: [
    {
      id: 'market_analysis',
      name: 'Market Analysis',
      description: 'Analyze market trends and data',
      parameters: {
        sector: {
          type: 'string',
          description: 'Market sector to analyze',
          required: true
        }
      }
    }
  ],
  gamer: [
    {
      id: 'game_strategy',
      name: 'Game Strategy',
      description: 'Get strategies for specific games',
      parameters: {
        game: {
          type: 'string',
          description: 'Name of the game',
          required: true
        }
      }
    }
  ],
  designer: [
    {
      id: 'design_review',
      name: 'Design Review',
      description: 'Review and provide feedback on designs',
      parameters: {
        type: {
          type: 'string',
          description: 'Type of design (UI, graphic, interior)',
          required: true
        }
      }
    }
  ],
  default: [
    {
      id: 'general_help',
      name: 'General Help',
      description: 'Get general assistance',
      parameters: {
        topic: {
          type: 'string',
          description: 'Topic for help',
          required: false
        }
      }
    }
  ]
};
