import type { CSSProperties } from "react";
import type { Glossary } from "@/lib/data.type";

export const KeyConcepts = ({ data }: { data: Glossary }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <div
          className="text-center mb-12 reveal-up"
          style={{ ["--delay" as never]: "0ms" } as CSSProperties}
        >
          <span className="inline-block bg-black text-white px-4 py-2 text-sm font-bold mb-4">
            {data.eyebrow.toUpperCase()}
          </span>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            {data.heading}{" "}
            <span className="text-stroke text-transparent">{data.headingAccent}</span>
          </h2>
          {data.intro && (
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              {data.intro}
            </p>
          )}
        </div>

        <dl className="grid md:grid-cols-2 gap-4">
          {data.terms.map((item, index) => (
            <div
              key={item.term}
              className="reveal-up bg-white brutalist-border p-5"
              style={{ ["--delay" as never]: `${index * 70}ms` } as CSSProperties}
            >
              <dt className="font-black text-lg mb-1.5">{item.term}</dt>
              <dd className="text-gray-600 leading-relaxed">{item.definition}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
};
