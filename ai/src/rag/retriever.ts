import { vectorStore } from './vectorStore';

interface RetrievalConfig {
  mode: string;
  relatedModes?: string[];
  numResults?: number;
  includeMetadata?: boolean;
}

export class Retriever {
  private getModeConfig(mode: string): RetrievalConfig {
    const configs: { [key: string]: RetrievalConfig } = {
      spm: {
        mode: 'spm',
        relatedModes: ['education', 'general'],
        numResults: 4
      },
      stpm: {
        mode: 'stpm',
        relatedModes: ['education', 'general'],
        numResults: 4
      },
      primary: {
        mode: 'primary',
        relatedModes: ['education'],
        numResults: 3
      },
      science: {
        mode: 'science',
        relatedModes: ['education'],
        numResults: 3
      },
      math: {
        mode: 'math',
        relatedModes: ['education'],
        numResults: 3
      },
      history: {
        mode: 'history',
        relatedModes: ['education'],
        numResults: 3
      }
    };

    return configs[mode] || configs.primary;
  }

  async getRelevantContext(query: string, mode: string = 'primary') {
    const config = this.getModeConfig(mode);
    const modesForQuery = [config.mode, ...(config.relatedModes || [])];
    
    const results = await vectorStore.queryAcrossModes(
      query,
      modesForQuery,
      config.numResults
    );
    
    // Format the context in a way that's suitable for the LLM
    const formattedContext = results.flatMap(modeResult => 
      modeResult.results?.documents?.[0]?.map((doc, index) => {
        const metadata = modeResult.results?.metadatas?.[0]?.[index];
        return {
          content: doc,
          source: metadata?.source || 'Unknown',
          topic: metadata?.topic || 'General',
          mode: modeResult.mode
        };
      }) || []
    );

    return formattedContext;
  }

  formatContextForPrompt(context: any[], mode: string = 'primary') {
    const modeSpecificFormatting: { [key: string]: (ctx: any) => string } = {
      primary: (ctx) => 
        `[Primary Education Resource - ${ctx.topic}]\n${ctx.content}\n---\n`,
      science: (ctx) => 
        `[Science Reference - ${ctx.source}]\n${ctx.content}\n---\n`,
      math: (ctx) => 
        `[Math Example - ${ctx.topic}]\n${ctx.content}\n---\n`,
      history: (ctx) => 
        `[History Reference - ${ctx.source}]\n${ctx.content}\n---\n`,
      default: (ctx) => 
        `[Source: ${ctx.source}]\n[Topic: ${ctx.topic}]\n${ctx.content}\n---\n`
    };

    const formatter = modeSpecificFormatting[mode] || modeSpecificFormatting.default;
    return context.map(ctx => formatter(ctx)).join('\n');
  }
}

export const retriever = new Retriever();
