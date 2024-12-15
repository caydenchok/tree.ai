import { ChromaClient, Collection, OpenAIEmbeddingFunction } from 'chromadb';

export class VectorStore {
  private client: ChromaClient;
  private collections: Map<string, Collection>;
  private embeddingFunction: OpenAIEmbeddingFunction;

  constructor() {
    this.client = new ChromaClient();
    this.collections = new Map();
    this.embeddingFunction = new OpenAIEmbeddingFunction({
      openai_api_key: process.env.OPENAI_API_KEY
    });
  }

  async initialize() {
    // Create collections for each mode
    const modes = [
      'general', 'creative', 'tutor', 'coder', 
      'writer', 'analyst', 'gamer', 'designer', 'education'
    ];

    for (const mode of modes) {
      const collection = await this.client.createCollection({
        name: `${mode}_content`,
        embeddingFunction: this.embeddingFunction
      });
      this.collections.set(mode, collection);
    }
  }

  async addDocuments(documents: Array<{ id: string; content: string; metadata?: any }>, mode: string = 'general') {
    const collection = this.collections.get(mode);
    if (!collection) {
      throw new Error(`Collection for mode ${mode} not found`);
    }

    const ids = documents.map(doc => doc.id);
    const contents = documents.map(doc => doc.content);
    const metadatas = documents.map(doc => ({
      ...doc.metadata,
      mode: mode
    }));

    await collection.add({
      ids,
      documents: contents,
      metadatas
    });
  }

  async queryDocuments(query: string, mode: string = 'general', numResults: number = 3) {
    const collection = this.collections.get(mode);
    if (!collection) {
      throw new Error(`Collection for mode ${mode} not found`);
    }

    const results = await collection.query({
      queryTexts: [query],
      nResults: numResults
    });

    return results;
  }

  // Get relevant documents from multiple modes
  async queryAcrossModes(query: string, modes: string[] = ['general'], numResults: number = 2) {
    const allResults = await Promise.all(
      modes.map(async mode => {
        try {
          const results = await this.queryDocuments(query, mode, numResults);
          return {
            mode,
            results
          };
        } catch (error) {
          console.error(`Error querying ${mode} collection:`, error);
          return {
            mode,
            results: null
          };
        }
      })
    );

    return allResults.filter(result => result.results !== null);
  }
}

export const vectorStore = new VectorStore();
