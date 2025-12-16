import { LucideIcon } from 'lucide-react';

export interface ApiType {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
  details: string[];
}

export interface HttpMethod {
  name: string;
  description: string;
  action: string;
  color: string;
  example: string;
  idempotent: boolean;
}

export interface StatusCodeGroup {
  range: string;
  name: string;
  description: string;
  color: string;
  examples: { code: number; meaning: string }[];
}

export interface NavItem {
  id: string;
  label: string;
}

export interface BestPractice {
  title: string;
  description: string;
  icon: LucideIcon;
}
