import { ArrowRight, ChevronDown } from "lucide-react";
import type { CSSProperties } from "react";
import { getFeaturedApps, appData } from "@/lib/data";
import { productStatuses } from "@/lib/data.type";
import { HeroContainer } from "./AnimatedContainer";
import { ProductIcon } from "@/components/ProductIcon";

export default function Hero() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-white grid-pattern">
      <HeroContainer>
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[70vh]">
          <div>
            <div className="reveal-up" style={{ ["--delay" as never]: "0ms" } as CSSProperties}>
              <span className="inline-block bg-black text-white px-4 py-2 text-sm font-bold mb-6">
                {appData.info.title}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-5xl font-black leading-none mb-6">
                {appData.info.tagline}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-md mb-8 font-medium">
                {appData.info.sub}
              </p>
            </div>

            <div
              className="reveal-up flex flex-wrap gap-4"
              style={{ ["--delay" as never]: "180ms" } as CSSProperties}
            >
              <a
                href="#projects"
                className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 font-bold text-lg brutalist-shadow brutalist-hover"
              >
                VIEW PROJECTS <ArrowRight size={20} />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 bg-white text-black px-8 py-4 font-bold text-lg brutalist-border brutalist-hover"
              >
                CONTACT ME
              </a>
            </div>
          </div>

          <div
            className="reveal-up relative"
            style={{ ["--delay" as never]: "120ms" } as CSSProperties}
          >
            <div className="relative">
              {getFeaturedApps()
                .slice(0, 3)
                .map((app, index) => {
                  const status = productStatuses[app.statusId];
                  return (
                    <div
                      key={app.id}
                      className={`${index === 0
                        ? "relative z-30"
                        : index === 1
                          ? "absolute top-4 left-4 z-20"
                          : "absolute top-8 left-8 z-10"
                        }`}
                      style={{
                        transform: `rotate(${index * 3 - 3}deg)`,
                        animationDelay: `${220 + index * 120}ms`,
                      }}
                    >
                      <div
                        className="reveal-up bg-white brutalist-border brutalist-shadow p-6 w-80"
                        style={{
                          borderColor: app.accentColor,
                          ["--delay" as never]: `${220 + index * 120}ms`,
                        } as CSSProperties}
                      >
                        <ProductIcon icon={app.icon} name={app.name} textSizeClass="text-5xl" pixelSize={80} className="mb-4" />
                        <h3 className="font-black text-xl mb-2">{app.name}</h3>
                        <p className="text-gray-600 text-sm mb-4">{app.shortDescription}</p>
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${status.color.bg} ${status.color.text} ${status.color.border}`}
                          >
                            <status.icon size={14} />
                            {status.label}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>

        <div className="reveal-fade absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center" style={{ ["--delay" as never]: "900ms" } as CSSProperties}>
          <span className="text-sm font-bold mb-2">SCROLL</span>
          <div className="float-y">
            <ChevronDown size={24} />
          </div>
        </div>
      </HeroContainer>
    </section>
  );
}
