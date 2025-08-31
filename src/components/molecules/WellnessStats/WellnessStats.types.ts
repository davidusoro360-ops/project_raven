export interface WellnessStat {
  id: string;
  icon: string;
  label: string;
  value: string;
  color: string;
}

export interface WellnessStatsProps {
  stats: WellnessStat[];
  className?: string;
}
