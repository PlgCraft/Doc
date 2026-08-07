import { appData } from "@/lib/data";
import * as motion from "framer-motion/client";
import { Logo } from "../Logo";

export const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="bg-black brutalist-shadow-lg p-8">
                <div className="text-white font-black leading-none">
                  <Logo />
                  <p className="pt-5">
                    Plugins, Integrations & Software Products
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-4 -right-4 bg-red-500 text-white px-6 py-3 font-bold">
                {appData.apps.length}+ PRODUCT
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-yellow-400 text-black px-4 py-2 text-sm font-bold mb-6">
              THE STUDIO
            </span>
            <h2 className="text-4xl md:text-5xl font-black mb-6">
              CRAFTED,
              <br />
              NOT <span className="text-stroke text-transparent">ASSEMBLED</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              PlgCraft is built around one idea: software should solve a real problem, then get
              out of the way. Every product starts the same way — studying how data actually
              moves between platforms, where existing tools tend to break, and what a business
              needs to see when something goes wrong.
              <br />
              <br />
              As an independent studio, every product is designed, built, and supported by the
              same person from day one — no handoffs, no lost context between teams, no
              "let me check and get back to you." That means faster fixes, tighter integrations,
              and software shaped by real production use rather than internal roadmaps.
            </p>
            {/* Skills */}
            {/* <div className="space-y-4"> */}
            {/*   {["Backend Systems", "Plugin & Integration Development", "API Architecture", "Infrastructure & DevOps"].map((skill, index) => ( */}
            {/*     <div key={skill} className="flex items-center gap-4"> */}
            {/*       <div className="w-full bg-gray-200 h-4 brutalist-border"> */}
            {/*         <motion.div */}
            {/*           initial={{ width: 0 }} */}
            {/*           whileInView={{ width: `${90 - index * 5}%` }} */}
            {/*           viewport={{ once: true }} */}
            {/*           transition={{ duration: 1, delay: index * 0.2 }} */}
            {/*           className="h-full bg-black" */}
            {/*         /> */}
            {/*       </div> */}
            {/*       <span className="font-bold whitespace-nowrap w-48">{skill}</span> */}
            {/*     </div> */}
            {/*   ))} */}
            {/* </div> */}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
