import { HelpCircle } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

export type FaqItem = { question: string; answer: string };

/** The "COMMON QUESTIONS" FAQ accordion, currently used by tool pages and ready for products. */
export const FaqAccordion = ({ faqs }: { faqs: readonly FaqItem[] }) => {
  if (faqs.length === 0) return null;

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <SectionHeading
          label="FAQ"
          labelClassName="bg-yellow-400 text-black"
          title={
            <>
              COMMON <span className="text-stroke text-transparent">QUESTIONS</span>
            </>
          }
        />

        <div className="space-y-4">
          {faqs.map((faq) => (
            <details
              key={faq.question}
              className="group bg-white brutalist-border p-5 open:brutalist-shadow-sm"
            >
              <summary className="flex items-center justify-between gap-4 font-bold text-lg cursor-pointer list-none">
                <span className="flex items-center gap-3">
                  <HelpCircle size={20} className="flex-shrink-0" />
                  {faq.question}
                </span>
              </summary>
              <p className="text-gray-600 mt-3 pl-8">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
};
