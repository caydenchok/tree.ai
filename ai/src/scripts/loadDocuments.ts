import { vectorStore } from '../rag/vectorStore';
import * as fs from 'fs';
import * as path from 'path';

interface Document {
  id: string;
  content: string;
  metadata?: any;
}

interface DocumentFile {
  documents: Document[];
}

async function loadDocuments() {
  try {
    // Initialize vector store
    await vectorStore.initialize();
    console.log('Vector store initialized');

    // Path to documents directory
    const docsDir = path.join(__dirname, '../data/documents');

    // Load documents for each mode
    const modes = [
      'general', 'creative', 'tutor', 'coder', 
      'writer', 'analyst', 'gamer', 'designer', 'education'
    ];

    for (const mode of modes) {
      const modeDir = path.join(docsDir, mode);
      
      // Skip if directory doesn't exist
      if (!fs.existsSync(modeDir)) {
        console.log(`No documents directory found for mode: ${mode}`);
        continue;
      }

      // Read all JSON files in the mode directory
      const files = fs.readdirSync(modeDir)
        .filter(file => file.endsWith('.json'));

      for (const file of files) {
        const filePath = path.join(modeDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const { documents }: DocumentFile = JSON.parse(fileContent);

        // Add documents to the collection
        await vectorStore.addDocuments(documents, mode);
        console.log(`Loaded ${documents.length} documents from ${file} into ${mode} collection`);
      }
    }

    console.log('All documents loaded successfully');
  } catch (error) {
    console.error('Error loading documents:', error);
  }
}

// Run the script
loadDocuments().catch(console.error);
