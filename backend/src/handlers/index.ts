import { Claude } from '../services/claude';
import { Mode } from '../types/mode-functions';
import { CreativeHandler } from './creative';
import { CoderHandler } from './coder';
import { WriterHandler } from './writer';
import { AnalystHandler } from './analyst';
import { GamerHandler } from './gamer';
import { DesignerHandler } from './designer';

export class HandlerFactory {
  private claude: Claude;
  private handlers: Map<Mode, any>;

  constructor(claude: Claude) {
    this.claude = claude;
    this.handlers = new Map();
    this.initializeHandlers();
  }

  private initializeHandlers() {
    this.handlers.set('creative', new CreativeHandler(this.claude));
    this.handlers.set('coder', new CoderHandler(this.claude));
    this.handlers.set('writer', new WriterHandler(this.claude));
    this.handlers.set('analyst', new AnalystHandler(this.claude));
    this.handlers.set('gamer', new GamerHandler(this.claude));
    this.handlers.set('designer', new DesignerHandler(this.claude));
    this.handlers.set('default', new CreativeHandler(this.claude)); // Default to creative mode
  }

  async handleRequest(mode: Mode, functionId: string, parameters: any): Promise<string> {
    const handler = this.handlers.get(mode);
    if (!handler) {
      throw new Error(`No handler found for mode: ${mode}`);
    }

    const functionName = this.getFunctionName(functionId);
    if (!functionName || typeof handler[functionName] !== 'function') {
      throw new Error(`Invalid function: ${functionId} for mode: ${mode}`);
    }

    return await handler[functionName](parameters);
  }

  private getFunctionName(functionId: string): string {
    // Convert function IDs to camelCase function names
    return functionId.split('_')
      .map((word, index) => index === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1))
      .join('');
  }
}
