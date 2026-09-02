import { FeeCalculatorWidget } from "@/components/tools/FeeCalculatorWidget";
import { CampaignUrlBuilderWidget } from "@/components/tools/CampaignUrlBuilderWidget";
import type { ToolWidgetMap } from "../tools.type";

export const toolWidgets: ToolWidgetMap = {
  "shopify-woocommerce-fee-calculator": FeeCalculatorWidget,
  "campaign-url-builder": CampaignUrlBuilderWidget,
};
