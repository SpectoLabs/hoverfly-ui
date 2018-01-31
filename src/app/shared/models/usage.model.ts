
export interface Usage {
  counters: ModeCounter;
}

export interface ModeCounter {
  simulate: number;
  spy: number;
  capture: number;
  modify: number;
  synthesize: number;
}
