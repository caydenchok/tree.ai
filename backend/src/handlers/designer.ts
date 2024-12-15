import { Claude } from '../services/claude';

export class DesignerHandler {
  private claude: Claude;

  constructor(claude: Claude) {
    this.claude = claude;
  }

  async designReview(params: any) {
    const prompt = `Review the ${params.type} design:

    Design Context: ${params.context}

    Provide feedback on:
    1. Visual hierarchy
    2. Color harmony
    3. Layout balance
    4. Typography
    5. Cultural appropriateness
    6. Usability considerations

    Consider Malaysian design preferences and cultural elements.`;
    
    return await this.claude.complete(prompt);
  }

  async layoutSuggestion(params: any) {
    const prompt = `Suggest layout for ${params.type}:

    Project Requirements:
    ${params.requirements}

    Consider:
    1. Space utilization
    2. Flow and navigation
    3. Responsive design principles
    4. Local design trends
    5. Cultural considerations
    6. Accessibility standards`;
    
    return await this.claude.complete(prompt);
  }

  async colorScheme(params: any) {
    const prompt = `Suggest color scheme for ${params.project}:

    Project Type: ${params.type}
    Brand Identity: ${params.brand || 'Not specified'}

    Consider:
    1. Color psychology
    2. Cultural significance in Malaysia
    3. Industry standards
    4. Accessibility requirements
    5. Brand alignment
    6. Application across different mediums`;
    
    return await this.claude.complete(prompt);
  }
}
