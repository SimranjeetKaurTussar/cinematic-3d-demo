"use client";

import Image from "next/image";
import { motion } from "framer-motion";

import type { RefObject } from "react";

type SectionRefs = {
  offerRef: RefObject<HTMLElement | null>;
  resultsRef: RefObject<HTMLElement | null>;
  galleryRef: RefObject<HTMLElement | null>;
};

const offers = [
  {
    title: "Signature Films",
    description: "Brand stories crafted with premium visuals, narrative pacing, and campaign-first direction.",
  },
  {
    title: "Immersive Launches",
    description: "Interactive launch pages that combine 3D storytelling with conversion-ready structure.",
  },
  {
    title: "Motion Identity",
    description: "A coherent visual system with cinematic intros, transitions, and dynamic social cuts.",
  },
];

const achievers = [
  { value: "4.8x", label: "Avg. growth in qualified leads" },
  { value: "93%", label: "Campaign completion rate" },
  { value: "26", label: "High-ticket brands launched" },
];

export function Sections({ offerRef, resultsRef, galleryRef }: SectionRefs) {
  return (
    <>
      <section id="offer" ref={offerRef} className="chapter-offer relative mx-auto mt-24 w-full max-w-6xl px-4 pb-24 md:px-8">
        <div className="mb-12 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs tracking-[0.2em] text-[#f6c76e] uppercase">Chapter I</p>
            <h2 className="font-display text-3xl leading-tight md:text-5xl">Courses & Offer</h2>
          </div>
          <p className="max-w-sm text-sm text-white/70 md:text-base">
            A flexible production stack designed for founders, educators, and premium digital products.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {offers.map((offer, index) => (
            <motion.article
              key={offer.title}
              initial={{ y: 32, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.55, delay: index * 0.1 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur"
            >
              <h3 className="mb-3 font-display text-2xl">{offer.title}</h3>
              <p className="text-sm leading-relaxed text-white/72">{offer.description}</p>
            </motion.article>
          ))}
        </div>
      </section>

      <section id="results" ref={resultsRef} className="chapter-results relative mx-auto w-full max-w-6xl px-4 py-24 md:px-8">
        <div className="rounded-[2rem] border border-white/15 bg-gradient-to-br from-[#13192a] via-[#0f1118] to-[#0a0b0f] p-8 md:p-12">
          <p className="mb-4 text-xs tracking-[0.2em] text-[#f6c76e] uppercase">Chapter II</p>
          <h2 className="font-display text-3xl md:text-5xl">Results / Achievers</h2>
          <p className="mt-4 max-w-2xl text-sm text-white/70 md:text-base">
            We combine cinematic storytelling and conversion strategy. Every scene is engineered for momentum, retention, and trust.
          </p>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {achievers.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-black/20 p-6"
              >
                <p className="font-display text-4xl text-[#f6c76e]">{item.value}</p>
                <p className="mt-2 text-sm text-white/70">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" ref={galleryRef} className="chapter-gallery relative mx-auto w-full max-w-6xl px-4 py-24 md:px-8">
        <div className="mb-10">
          <p className="mb-3 text-xs tracking-[0.2em] text-[#f6c76e] uppercase">Chapter III</p>
          <h2 className="font-display text-3xl md:text-5xl">Visual Gallery</h2>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 12 }).map((_, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="gallery-item group relative overflow-hidden rounded-2xl border border-white/10"
            >
              <Image
                src={`/gallery/${index + 1}.svg`}
                alt={`Gallery artwork ${index + 1}`}
                width={700}
                height={700}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </motion.div>
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto w-full max-w-4xl px-4 py-24 text-center md:px-8">
        <p className="text-xs tracking-[0.2em] text-[#f6c76e] uppercase">Finale</p>
        <h2 className="mt-4 font-display text-3xl md:text-5xl">Let&apos;s craft your next cinematic launch.</h2>
        <p className="mx-auto mt-4 max-w-xl text-sm text-white/70 md:text-base">
          Ready for a premium experience from the first scroll? We can storyboard, direct, and ship your next signature page.
        </p>
        <motion.a
          whileHover={{ y: -2, boxShadow: "0px 14px 35px rgba(246, 199, 110, 0.25)" }}
          whileTap={{ scale: 0.97 }}
          href="https://wa.me/15555555555"
          className="mt-8 inline-flex rounded-full border border-[#f6c76e]/50 bg-[#f6c76e]/10 px-7 py-3 text-sm tracking-[0.14em] text-[#f6c76e] uppercase"
        >
          Chat on WhatsApp
        </motion.a>
      </section>

      <footer className="border-t border-white/10 px-4 py-8 text-center text-xs tracking-[0.14em] text-white/45 uppercase md:px-8">
        © {new Date().getFullYear()} Nocturne Studio — Directed for ambitious brands.
      </footer>
    </>
  );
}
