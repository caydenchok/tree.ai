import { Claude } from '../services/claude';

export class CoderHandler {
  private claude: Claude;

  constructor(claude: Claude) {
    this.claude = claude;
  }

  async reviewCode(params: any) {
    const prompt = `Review the following ${params.language} code:

    ${params.code}

    Provide:
    1. Code quality assessment
    2. Potential bugs or issues
    3. Performance considerations
    4. Security concerns
    5. Suggestions for improvement
    
    Consider Malaysian development practices and standards where applicable.`;
    
    return await this.claude.complete(prompt);
  }

  async explainCode(params: any) {
    const prompt = `Explain this ${params.language} code in detail:

    ${params.code}

    Include:
    1. Overall purpose
    2. How it works
    3. Key functions and their roles
    4. Important variables and data structures
    5. Any special patterns or techniques used`;
    
    return await this.claude.complete(prompt);
  }

  async suggestImprovements(params: any) {
    const prompt = `Suggest improvements for this ${params.language} code:

    ${params.code}

    Focus on:
    1. Code organization
    2. Best practices
    3. Performance optimization
    4. Error handling
    5. Documentation
    6. Testing strategies`;
    
    return await this.claude.complete(prompt);
  }
}
