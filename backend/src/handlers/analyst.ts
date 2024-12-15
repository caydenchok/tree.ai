import { Claude } from '../services/claude';

export class AnalystHandler {
  private claude: Claude;

  constructor(claude: Claude) {
    this.claude = claude;
  }

  async marketAnalysis(params: any) {
    const prompt = `Provide market analysis for the ${params.sector} sector in Malaysia:

    Include:
    1. Current market trends
    2. Key players and market share
    3. Growth opportunities
    4. Potential challenges
    5. Regulatory considerations
    6. Future outlook

    Focus on data-driven insights and practical implications.`;
    
    return await this.claude.complete(prompt);
  }

  async dataVisualization(params: any) {
    const prompt = `Provide recommendations for visualizing ${params.dataType} data:

    Consider:
    1. Most effective chart types
    2. Key metrics to highlight
    3. Color schemes and accessibility
    4. Interactive elements
    5. Best practices for the Malaysian audience
    
    Data Context: ${params.context}`;
    
    return await this.claude.complete(prompt);
  }

  async trendAnalysis(params: any) {
    const prompt = `Analyze trends in ${params.area} for the Malaysian market:

    Include:
    1. Historical data analysis
    2. Current trend identification
    3. Pattern recognition
    4. Future projections
    5. Impact assessment
    6. Actionable recommendations

    Consider both local and global factors affecting these trends.`;
    
    return await this.claude.complete(prompt);
  }
}
