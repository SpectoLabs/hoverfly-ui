
export interface Usage {
  counters: ModeCounter;
}

export interface ModeCounter {
  simulate: number;
  capture: number;
  modify: number;
  synthesize: number;
}
