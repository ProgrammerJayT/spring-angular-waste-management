export enum PickupStatus {
  SCHEDULED = 'SCHEDULED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

export interface PickupSchedule {
  id: number;
  user: any;
  address: string;
  pickupDate: string;
  wasteTypes: string;
  status: PickupStatus;
  requestedAt: string;
  completedAt: string;
  notes: string;
}