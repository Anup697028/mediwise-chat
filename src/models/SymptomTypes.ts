
export interface Symptom {
  id: string;
  name: string;
  description?: string;
  category: SymptomCategory;
  severity: SeverityLevel;
  commonIn?: string[];
}

export type SymptomCategory = 
  | 'general'
  | 'respiratory'
  | 'digestive'
  | 'cardiovascular'
  | 'neurological'
  | 'musculoskeletal'
  | 'psychological'
  | 'dermatological'
  | 'other';

export type SeverityLevel = 'mild' | 'moderate' | 'severe' | 'critical';

export interface SymptomLog {
  id: string;
  userId: string;
  symptomId: string;
  severity: SeverityLevel;
  startTime: string; // ISO date string
  endTime?: string; // ISO date string, undefined if ongoing
  notes?: string;
  medicationTaken?: string[];
  relatedFactors?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface SymptomFrequency {
  symptomId: string;
  count: number;
  avgSeverity: number;
  avgDuration?: number; // in minutes
}

export interface SymptomAnalytics {
  mostFrequent: SymptomFrequency[];
  recentLogs: SymptomLog[];
  longestDuration: SymptomLog[];
  severityTrends: {
    [key in SeverityLevel]: number;
  };
  categoryDistribution: {
    [key in SymptomCategory]?: number;
  };
}
