

import { Usage } from './usage.model';
import { Middleware } from './middlware.model';
export interface Hoverfly {

  version: string;
  mode: string;
  destination: string;
  middleware: Middleware;
  usage: Usage;
}
