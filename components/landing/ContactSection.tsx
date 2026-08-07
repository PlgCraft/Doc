import { appData } from "@/lib/data";
import * as motion from "framer-motion/client";
import { Github, Globe, Linkedin, Mail, Twitter } from "lucide-react";

export const ContactSection = () => {
  return (
    <section id="contact" className="py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block bg-white text-black px-4 py-2 text-sm font-bold mb-6">
            GET IN TOUCH
          </span>
          <h2 className="text-4xl md:text-6xl font-black mb-4">
            LET'S{" "}
            <span className="text-stroke-white text-transparent">Talk</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have a feature you need, a bug to report, or an idea for a tool that doesn't exist
            yet? Looking for someone to build something custom, or want to talk about working
            together? Reach out — I read every message myself.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Email */}
          <motion.a
            href={`mailto:${appData.info.email}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white text-black p-8 brutalist-hover group"
          >
            <Mail size={40} className="mb-4" />
            <h3 className="font-black text-xl mb-2">EMAIL</h3>
            <p className="text-gray-600 group-hover:text-red-500 transition-colors">
              {appData.info.email}
            </p>
          </motion.a>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-red-500 p-8"
          >
            <h3 className="font-black text-xl mb-6">FOLLOW ME</h3>
            <div className="flex gap-4">
              <a
                href={appData.info.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black p-4 hover:bg-white hover:text-black transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href={appData.info.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black p-4 hover:bg-white hover:text-black transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a
                href={appData.info.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black p-4 hover:bg-white hover:text-black transition-colors"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </motion.div>

          {/* Location */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="bg-yellow-400 text-black p-8"
          >
            <Globe size={40} className="mb-4" />
            <h3 className="font-black text-xl mb-2">WHAT TO REACH OUT ABOUT</h3>
            <p className="text-gray-800">
              Feature requests, bug reports, a custom plugin or integration you need built,
              or a job opportunity — all welcome. No request is too small.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
