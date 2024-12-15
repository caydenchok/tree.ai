import { vectorStore } from './vectorStore';
import crypto from 'crypto';

export class DocumentLoader {
  async processDocument(content: string, metadata: any = {}) {
    // Generate a unique ID for the document
    const id = crypto.createHash('md5').update(content).digest('hex');

    return {
      id,
      content,
      metadata: {
        ...metadata,
        timestamp: new Date().toISOString()
      }
    };
  }

  async loadDocuments(documents: Array<{ content: string; metadata?: any }>) {
    const processedDocs = await Promise.all(
      documents.map(doc => this.processDocument(doc.content, doc.metadata))
    );

    await vectorStore.addDocuments(processedDocs);
    return processedDocs;
  }

  async loadDocument(content: string, metadata: any = {}) {
    const processedDoc = await this.processDocument(content, metadata);
    await vectorStore.addDocuments([processedDoc]);
    return processedDoc;
  }
}

export const documentLoader = new DocumentLoader();
