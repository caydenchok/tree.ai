import { Claude } from '../services/claude';

export class WriterHandler {
  private claude: Claude;

  constructor(claude: Claude) {
    this.claude = claude;
  }

  async contentWriting(params: any) {
    const prompt = `Create ${params.type} content with the following specifications:
    Topic: ${params.topic}
    Audience: ${params.audience || 'Malaysian general public'}
    Tone: ${params.tone || 'professional'}

    Consider:
    - Local cultural context and sensitivities
    - Malaysian English usage where appropriate
    - SEO best practices
    - Engagement factors for the target audience`;
    
    return await this.claude.complete(prompt);
  }

  async businessWriting(params: any) {
    const prompt = `Create a ${params.type} business document:
    Purpose: ${params.purpose}
    Audience: ${params.audience}

    Follow Malaysian business writing standards:
    - Formal but approachable tone
    - Clear and concise language
    - Proper business document structure
    - Professional formatting`;
    
    return await this.claude.complete(prompt);
  }

  async academicWriting(params: any) {
    const prompt = `Create academic content for:
    Subject: ${params.subject}
    Level: ${params.level}
    Topic: ${params.topic}

    Follow academic writing standards:
    - Scholarly tone
    - Proper citations (if needed)
    - Well-structured arguments
    - Clear explanations
    
    Consider Malaysian academic context and requirements.`;
    
    return await this.claude.complete(prompt);
  }
}
