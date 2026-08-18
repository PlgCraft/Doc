import type { Tool } from "../tools.type";
import { feeCalculator } from "./fee-calculator";

// Add one import + array entry per tool.
export const tools: readonly Tool[] = [feeCalculator];
