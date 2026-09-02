import type { Tool } from "../tools.type";
import { feeCalculator } from "./fee-calculator";
import { campaignUrlBuilder } from "./campaign-url-builder";

// Add one import + array entry per tool.
export const tools: readonly Tool[] = [feeCalculator, campaignUrlBuilder];
