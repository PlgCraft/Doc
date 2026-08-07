import { Logo } from "@/components/Logo";
import { ScreenshotGallery } from "@/components/ScreenshotGallery";
import { VideoDemo } from "@/components/VideoDemo";
import { getAppById } from "@/lib/data";
import { Platform, Testimonial } from "@/lib/data.type";
import * as motion from "framer-motion/client";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Quote,
  Smartphone,
  Tag,
} from "lucide-react";
import Link from "next/link";

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const app = getAppById(id);

  if (!app) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-black mb-4">APP NOT FOUND</h1>
          <Link href="/" className="inline-flex items-center gap-2 font-bold hover:text-red-500">
            <ArrowLeft size={20} /> BACK TO HOME
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      <section
        className="pt-32 pb-16 relative overflow-hidden"
        style={{ backgroundColor: `${app.accentColor}15` }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {app.platform.map((p) => (
                  <span
                    key={p}
                    className="bg-black text-white px-3 py-1 text-sm font-bold uppercase"
                  >
                    {p}
                  </span>
                ))}
              </div>

              <h1 className="text-5xl md:text-7xl font-black mb-4">{app.name}</h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-6">{app.shortDescription}</p>

              {/* Rating & Stats */}
              <div className="flex flex-wrap items-center gap-6 mb-8">
                <div className="flex items-center gap-2">
                  {/* <div className="flex"> */}
                  {/*   {[...Array(5)].map((_, i) => ( */}
                  {/*     <Star */}
                  {/*       key={i} */}
                  {/*       size={24} */}
                  {/*       className={ */}
                  {/*         i < Math.floor(app.rating) */}
                  {/*           ? "fill-yellow-400 text-yellow-400" */}
                  {/*           : "text-gray-300" */}
                  {/*       } */}
                  {/*     /> */}
                  {/*   ))} */}
                  {/* </div> */}
                  {/* <span className="font-black text-2xl">{app.rating}</span> */}
                  {/* <span className="text-gray-600">({app.reviews} reviews)</span> */}
                </div>
              </div>

              {/* Store Badges */}
              <div className="flex flex-wrap gap-4">
                {app.storeLinks.woocommerce && <StoreBadge type="woocommerce" url={app.storeLinks.woocommerce} />}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ScreenshotGallery screenshots={app.screenshots} appName={app.name} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* App Info Bar */}
      <section className="bg-black text-white py-6">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-wrap justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Calendar size={20} />
              <span>Released: {app.releaseDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <Tag size={20} />
              <span>Version: {app.version}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-xl">
                {app.price}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Description Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-black mb-6">
                  ABOUT THIS <span className="text-stroke text-transparent">APP</span>
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed">{app.fullDescription}</p>
              </motion.div>
            </div>

            <div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-gray-100 brutalist-border p-6"
              >
                <h3 className="font-black text-xl mb-4">TECH STACK</h3>
                <div className="flex flex-wrap gap-2">
                  {app.techStack.map((tech) => (
                    <span key={tech} className="bg-black text-white px-3 py-2 font-mono text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-block bg-red-500 text-white px-4 py-2 text-sm font-bold mb-4">
              FEATURES
            </span>
            <h2 className="text-3xl md:text-5xl font-black">
              WHAT'S <span className="text-stroke text-transparent">INSIDE</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {app.features.map((feature, index) => (
              <FeatureCard key={feature.title} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Video Demo Section */}
      {app.videoDemo && (
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block bg-yellow-400 text-black px-4 py-2 text-sm font-bold mb-4">
                VIDEO
              </span>
              <h2 className="text-3xl md:text-5xl font-black">
                SEE IT IN <span className="text-stroke text-transparent">ACTION</span>
              </h2>
            </motion.div>

            <VideoDemo videoUrl={app.videoDemo} appName={app.name} />
          </div>
        </section>
      )}

      {/* Testimonials Section */}
      {app.testimonials && app.testimonials.length > 0 && (
        <section className="py-16 bg-black text-white">
          <div className="max-w-7xl mx-auto px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <span className="inline-block bg-white text-black px-4 py-2 text-sm font-bold mb-4">
                REVIEWS
              </span>
              <h2 className="text-3xl md:text-5xl font-black">
                WHAT USERS <span className="text-stroke-white text-transparent">SAY</span>
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {app.testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} index={index} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: app.accentColor }}>
        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="text-8xl mb-6">{app.icon}</div>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
              READY TO TRY {app.name.toUpperCase()}?
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {app.storeLinks.woocommerce && <StoreBadge type="woocommerce" url={app.storeLinks.woocommerce} />}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t-4 border-black py-8">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Logo />
            <div className="text-gray-600 font-mono text-sm">
              © {new Date().getFullYear()} All rights reserved.
            </div>
            <Link
              href="/#projects"
              className="flex items-center gap-2 font-bold hover:text-red-500 transition-colors"
            >
              VIEW ALL PROJECTS <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

const StoreBadge = ({ url }: { type: Platform; url: string }) => {

  const badges = {
    woocommerce: {
      icon: <Smartphone size={24} />,
      text: "GET IT ON",
      store: "Google Play",
      bg: "bg-black",
    },
  };
  const badge = badges["woocommerce"];

  return (
    <motion.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${badge.bg} text-white px-6 py-4 flex items-center gap-4 brutalist-hover`}
    >
      {badge.icon}
      <div className="text-left">
        <div className="text-xs uppercase">{badge.text}</div>
        <div className="font-bold text-lg">{badge.store}</div>
      </div>
    </motion.a>
  );
};

const FeatureCard = ({
  feature,
  index,
}: {
  feature: { icon: string; title: string; description: string };
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="bg-white brutalist-border brutalist-shadow-sm p-6 brutalist-hover"
    >
      <div className="text-4xl mb-4">{feature.icon}</div>
      <h3 className="font-black text-xl mb-2">{feature.title}</h3>
      <p className="text-gray-600">{feature.description}</p>
    </motion.div>
  );
};

const TestimonialCard = ({
  testimonial,
  index,
}: {
  testimonial: Testimonial;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      className="bg-gray-100 brutalist-border p-6 relative"
    >
      <Quote className="absolute top-4 right-4 text-gray-300" size={40} />
      {/* <div className="flex items-center gap-1 mb-4"> */}
      {/*   {[...Array(5)].map((_, i) => ( */}
      {/*     <Star */}
      {/*       key={i} */}
      {/*       size={16} */}
      {/*       className={i < testimonial.rate ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} */}
      {/*     /> */}
      {/*   ))} */}
      {/* </div> */}
      <p className="text-lg mb-4 italic">"{testimonial.message}"</p>
      <div>
        <p className="font-bold">{testimonial.name}</p>
        <p className="text-sm text-gray-600">{testimonial.role}</p>
      </div>
    </motion.div>
  );
};
