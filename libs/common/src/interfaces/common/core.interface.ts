export interface Core {
  id: string;

  created_at: Date;
  updated_at?: Date;

  rand: string;
  timestamp: string;

  tags?: string[];
  description?: string;
}
