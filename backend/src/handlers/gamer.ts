import { Claude } from '../services/claude';

export class GamerHandler {
  private claude: Claude;

  constructor(claude: Claude) {
    this.claude = claude;
  }

  async gameStrategy(params: any) {
    const prompt = `Provide strategy guide for ${params.game}:

    Include:
    1. Basic mechanics and controls
    2. Advanced techniques
    3. Meta strategies
    4. Character/weapon recommendations
    5. Common mistakes to avoid
    6. Tips for ranking up

    Focus on the Malaysian server meta where applicable.`;
    
    return await this.claude.complete(prompt);
  }

  async tournamentInfo(params: any) {
    const prompt = `Provide information about ${params.tournament} tournaments:

    Include:
    1. Tournament format
    2. Prize pool
    3. Qualification process
    4. Important dates
    5. Past winners
    6. Tips for participation

    Focus on the Malaysian esports scene and opportunities.`;
    
    return await this.claude.complete(prompt);
  }

  async streamingSetup(params: any) {
    const prompt = `Provide streaming setup guide for ${params.platform}:

    Include:
    1. Hardware requirements
    2. Software setup
    3. Stream settings optimization
    4. Internet requirements
    5. Content planning
    6. Monetization strategies

    Consider:
    - Malaysian internet infrastructure
    - Local streaming platforms
    - Regional content preferences
    - Legal requirements`;
    
    return await this.claude.complete(prompt);
  }
}
