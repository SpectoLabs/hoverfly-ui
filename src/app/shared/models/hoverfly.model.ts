

import { Usage } from './usage.model';
export interface Hoverfly {

  version: string;
  mode: string;
  destination: string;
  remote: string;
  binary: string;
  script: string;
  usage: Usage;
}

export class NullHoverfly implements Hoverfly {
  version = '';
  mode = '';
  destination = '';
  remote = '';
  binary = '';
  script = '';
  usage = {} as Usage;

}
