import { OpenAIEmbeddingFunction } from 'chromadb';

export class EmbeddingService {
  private embeddingFunction: OpenAIEmbeddingFunction;

  constructor() {
    this.embeddingFunction = new OpenAIEmbeddingFunction({
      openai_api_key: process.env.OPENAI_API_KEY
    });
  }

  async generateEmbeddings(texts: string[]) {
    return await this.embeddingFunction.generate(texts);
  }

  async generateEmbedding(text: string) {
    const embeddings = await this.generateEmbeddings([text]);
    return embeddings[0];
  }
}

export const embeddingService = new EmbeddingService();
