

import { Middleware } from "./middleware.model";
import { Usage } from "./usage.model";
export interface Hoverfly {

  version: string;
  mode: string;
  destination: string;
  middleware: Middleware;
  usage: Usage;
}

export class NullHoverfly implements Hoverfly {
  version = '';
  mode = '';
  destination = '';
  middleware = {} as Middleware;
  usage = {} as Usage;

}