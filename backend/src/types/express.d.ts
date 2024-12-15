/// <reference types="express-serve-static-core" />

import { Claude } from '../services/claude';
import { HandlerFactory } from '../handlers';

declare global {
  namespace Express {
    interface Locals {
      claude: Claude;
      handlerFactory: HandlerFactory;
    }
  }
}
