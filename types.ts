export interface RainDrop {
  x: number;
  y: number;
  length: number;
  speed: number;
  opacity: number;
}

export interface LightningState {
  active: boolean;
  opacity: number;
  x?: number; // Position of the bolt
}

export interface City {
  id: number;
  nome: string;
}
