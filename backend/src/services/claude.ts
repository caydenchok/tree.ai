import Anthropic from '@anthropic-ai/sdk';

export class Claude {
  private client: Anthropic;
  private model = 'claude-3-opus-20240229';

  constructor(apiKey: string) {
    this.client = new Anthropic({
      apiKey: apiKey
    });
  }

  async complete(prompt: string): Promise<string> {
    try {
      const message = await this.client.messages.create({
        model: this.model,
        max_tokens: 1024,
        messages: [{
          role: 'user',
          content: prompt
        }],
      });

      return message.content[0].type === 'text' ? message.content[0].text : '';
    } catch (error) {
      console.error('Error calling Claude API:', error);
      throw new Error('Failed to generate response');
    }
  }
}
