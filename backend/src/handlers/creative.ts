import { Claude } from '../services/claude';
import { ModeFunction } from '../types/mode-functions';

export class CreativeHandler {
  private claude: Claude;

  constructor(claude: Claude) {
    this.claude = claude;
  }

  async writeStory(params: any) {
    const prompt = `Write a ${params.length || 'medium'}-length story in the ${params.genre} genre. 
    Make it engaging and suitable for Malaysian readers.
    Include local cultural elements where appropriate.`;
    
    return await this.claude.complete(prompt);
  }

  async createPantun(params: any) {
    const prompt = `Create a traditional Malay pantun about ${params.theme}.
    Follow the proper pantun structure:
    - Four lines per verse
    - Lines 1-2 set up imagery (pembayang)
    - Lines 3-4 convey the message (maksud)
    - Maintain proper rhyming scheme (a-b-a-b)`;
    
    return await this.claude.complete(prompt);
  }

  async brainstorm(params: any) {
    const prompt = `Generate creative ideas around the topic: ${params.topic}.
    Consider:
    - Malaysian cultural context
    - Local trends and preferences
    - Potential creative applications
    - Unique angles or perspectives`;
    
    return await this.claude.complete(prompt);
  }
}
