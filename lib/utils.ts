import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const ACCENTCOLOR = [
  "#FF6B35",
  "#7C3AED",
  "#10B981",
  "#3B82F6",
  "#F59E0B",
  "#EC4899",
];

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
