import { DynamicIcon, type IconName } from "lucide-react/dynamic";
import { Reveal } from "@/components/Reveal";

/** One entry in a product's "WHAT'S INSIDE" features grid. */
export const FeatureCard = ({
  feature,
  index,
}: {
  feature: { icon: IconName; title: string; description: string };
  index: number;
}) => {
  return (
    <Reveal
      delay={index * 90}
      className="bg-white brutalist-border brutalist-shadow-sm p-6 brutalist-hover"
    >
      <div className="flex items-start gap-2">
        <DynamicIcon name={feature.icon} className="text-4xl mb-4" />
        <h3 className="font-black text-xl mb-2">{feature.title}</h3>
      </div>
      <p className="text-gray-600">{feature.description}</p>
    </Reveal>
  );
};
