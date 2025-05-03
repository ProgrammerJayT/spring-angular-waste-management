export enum DisposalMethod {
  RECYCLED = 'RECYCLED',
  LANDFILL = 'LANDFILL',
  COMPOSTED = 'COMPOSTED',
  REUSED = 'REUSED',
  DONATED = 'DONATED'
}

export interface WasteRecord {
  id: number;
  user: any;
  wasteType: any;
  weightKg: number;
  disposalMethod: DisposalMethod;
  disposedAt: string;
  notes: string;
}