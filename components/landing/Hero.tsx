import { ArrowRight, ChevronDown } from "lucide-react";
import { getFeaturedApps, appData } from "@/lib/data";
import { HeroContainer } from "./AnimatedContainer";
import { ProductIcon } from "@/components/ProductIcon";
import { StatusBadge } from "@/components/StatusBadge";
import { Reveal } from "@/components/Reveal";

export default function Hero() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-white grid-pattern">
      <HeroContainer>
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[70vh]">
          <div>
            <Reveal>
              <span className="inline-block bg-black text-white px-4 py-2 text-sm font-bold mb-6">
                {appData.info.title}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-5xl font-black leading-none mb-6">
                {appData.info.tagline}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-md mb-8 font-medium">
                {appData.info.sub}
              </p>
            </Reveal>

            <Reveal delay={180} className="flex flex-wrap gap-4">
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
            </Reveal>
          </div>

          <Reveal delay={120} className="relative">
            <div className="relative">
              {getFeaturedApps()
                .slice(0, 3)
                .map((app, index) => (
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
                    <Reveal
                      delay={220 + index * 120}
                      className="bg-white brutalist-border brutalist-shadow p-6 w-80"
                      style={{ borderColor: app.accentColor }}
                    >
                      <ProductIcon icon={app.icon} name={app.name} textSizeClass="text-5xl" pixelSize={80} className="mb-4" />
                      <h3 className="font-black text-xl mb-2">{app.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{app.shortDescription}</p>
                      <div className="flex items-center gap-2">
                        <StatusBadge statusId={app.statusId} size="xs" />
                      </div>
                    </Reveal>
                  </div>
                ))}
            </div>
          </Reveal>
        </div>

        <Reveal
          delay={900}
          variant="fade"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-sm font-bold mb-2">SCROLL</span>
          <div className="float-y">
            <ChevronDown size={24} />
          </div>
        </Reveal>
      </HeroContainer>
    </section>
  );
}
