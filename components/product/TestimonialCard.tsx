import { Quote } from "lucide-react";
import type { Testimonial } from "@/lib/data.type";
import { Reveal } from "@/components/Reveal";

/** One customer quote in a product's "WHAT USERS SAY" grid. */
export const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) => {
  return (
    <Reveal delay={index * 120} className="bg-gray-100 brutalist-border p-6 relative">
      <Quote className="absolute top-4 right-4 text-gray-300" size={40} />
      <p className="text-lg mb-4 italic">{testimonial.message}</p>
      <div>
        <p className="font-bold">{testimonial.name}</p>
        <p className="text-sm text-gray-600">{testimonial.role}</p>
      </div>
    </Reveal>
  );
};
