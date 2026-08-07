import { ArrowRight, ChevronDown } from "lucide-react";
import * as motion from "framer-motion/client";
import { getFeaturedApps, appData } from "@/lib/data";
import { HeroContainer } from "./AnimatedContainer";

export default function Hero() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-white grid-pattern">
      <HeroContainer>
        <div className="grid md:grid-cols-2 gap-12 items-center min-h-[70vh]">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-block bg-black text-white px-4 py-2 text-sm font-bold mb-6">
                {appData.info.title}
              </span>
              <h1 className="text-4xl md:text-6xl lg:text-5xl font-black leading-none mb-6">
                {appData.info.tagline}
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-md mb-8 font-medium">
                {appData.info.sub}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-wrap gap-4"
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
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative">
              {/* Featured App Cards Stack */}
              {getFeaturedApps()
                .slice(0, 3)
                .map((app, index) => (
                  <motion.div
                    key={app.id}
                    initial={{ opacity: 0, y: 50, rotate: index * 3 }}
                    animate={{ opacity: 1, y: 0, rotate: index * 3 - 3 }}
                    className={`${index === 0
                      ? "relative z-30"
                      : index === 1
                        ? "absolute top-4 left-4 z-20"
                        : "absolute top-8 left-8 z-10"
                      }`}
                    style={{
                      transform: `rotate(${index * 3 - 3}deg)`,
                    }}
                  >
                    <div
                      className="bg-white brutalist-border brutalist-shadow p-6 w-80"
                      style={{ borderColor: app.accentColor }}
                    >
                      <div className="text-5xl mb-4">{app.icon}</div>
                      <h3 className="font-black text-xl mb-2">{app.name}</h3>
                      <p className="text-gray-600 text-sm mb-4">{app.shortDescription}</p>
                      <div className="flex items-center gap-2">
                        {/* <Star */}
                        {/*   className="fill-yellow-400 text-yellow-400" */}
                        {/*   size={16} */}
                        {/* /> */}
                        {/* <span className="font-bold">{app.rating}</span> */}
                        {/* TODO: LINK TO THE page */}
                        <span
                          className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border ${app.status.color.bg} ${app.status.color.text} ${app.status.color.border}`}
                        >
                          <app.status.icon size={14} />
                          {app.status.label}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-sm font-bold mb-2">SCROLL</span>
          <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
            <ChevronDown size={24} />
          </motion.div>
        </motion.div>
      </HeroContainer>
    </section>
  );
}
