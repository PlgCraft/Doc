import type { CSSProperties } from "react";
import { appData } from "@/lib/data";
import { Logo } from "../Logo";

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="reveal-up" style={{ ["--delay" as never]: "0ms" } as CSSProperties}>
            <div className="relative">
              <div className="bg-black brutalist-shadow-lg p-8">
                <div className="text-white font-black leading-none">
                  <Logo withBG={true} />
                  <p className="pt-5">
                    Plugins, Integrations & Software Products
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-red-500 text-white px-6 py-3 font-bold">
                {appData.apps.length}+ PRODUCT
              </div>
            </div>
          </div>
          <div className="reveal-up" style={{ ["--delay" as never]: "120ms" } as CSSProperties}>
            <span className="inline-block bg-yellow-400 text-black px-4 py-2 text-sm font-bold mb-6">
              THE STUDIO
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              CRAFTED,
              <br />
              NOT <span className="text-stroke text-transparent">ASSEMBLED</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              PlgCraft is built around one idea: software should solve a real problem, then get out of the way. Every product starts the same way, studying how data actually moves between platforms, where existing tools tend to break, and what a business needs to see when something goes wrong.
              <br />
              <br />
              Every product is designed, built, and supported by the same person from day one. No handoffs, no lost context between teams, no "let me check and get back to you." That means faster fixes, tighter integrations, and software shaped by real production use rather than internal roadmaps.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
