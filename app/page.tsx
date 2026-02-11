"use client";

import { motion } from "framer-motion";
import Lenis from "lenis";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Hero3D } from "@/components/Hero3D";
import { Navbar } from "@/components/Navbar";
import { Sections } from "@/components/Sections";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

export default function Home() {
  const [reducedMotion, setReducedMotion] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const heroTextRef = useRef<HTMLDivElement>(null);
  const nextHintRef = useRef<HTMLParagraphElement>(null);
  const offerRef = useRef<HTMLElement>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const orbRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReducedMotion(prefersReducedMotion());
    apply();
    media.addEventListener("change", apply);

    return () => media.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.2,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = window.requestAnimationFrame(raf);
    };

    frame = window.requestAnimationFrame(raf);

    return () => {
      window.cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      if (!heroRef.current || !heroTextRef.current || !offerRef.current || !resultsRef.current || !galleryRef.current) {
        return;
      }

      const timeline = gsap.timeline({
        defaults: { ease: "power2.out" },
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "+=130%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      timeline
        .to(heroTextRef.current, { yPercent: -36, opacity: 0.05 }, 0)
        .to(nextHintRef.current, { opacity: 0, y: -14 }, 0)
        .to(offerRef.current, { y: -40, opacity: 1 }, 0)
        .to(orbRef.current?.rotation ?? {}, { y: "+=1.8", x: "+=0.6" }, 0)
        .to(orbRef.current?.position ?? {}, { y: -0.25, x: 0.22 }, 0);

      gsap.fromTo(
        ".chapter-results",
        { y: 90, opacity: 0.15 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: resultsRef.current,
            start: "top 80%",
            end: "top 35%",
            scrub: 0.8,
          },
        },
      );

      gsap.utils.toArray<HTMLElement>(".gallery-item").forEach((card, index) => {
        const shift = index % 2 === 0 ? -18 : -30;
        gsap.to(card, {
          yPercent: shift,
          ease: "none",
          scrollTrigger: {
            trigger: galleryRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        });
      });
    });

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div id="top" className="relative overflow-x-clip bg-[#06070b]">
      <Navbar />

      <main>
        <section ref={heroRef} className="relative flex min-h-screen items-center justify-center px-4 pt-28 pb-20 md:px-8">
          <Hero3D orbRef={orbRef} reducedMotion={reducedMotion} />
          <div ref={heroTextRef} className="relative mx-auto flex w-full max-w-4xl flex-col items-center text-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mb-4 text-xs tracking-[0.24em] text-[#f6c76e] uppercase"
            >
              Cinematic Web Experience
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="font-display text-4xl leading-tight text-[#f9f7f2] md:text-7xl"
            >
              We direct digital stories that feel like film.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.45 }}
              className="mt-6 max-w-2xl text-sm leading-relaxed text-white/72 md:text-lg"
            >
              Premium 3D, elegant pacing, and conversion-focused narrative design for brands that want unforgettable first impressions.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.58 }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <motion.a
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                href="#offer"
                className="rounded-full border border-[#f6c76e]/50 bg-[#f6c76e]/12 px-6 py-3 text-xs tracking-[0.16em] text-[#f6c76e] uppercase"
              >
                Explore Chapters
              </motion.a>
              <motion.a
                whileHover={{ y: -2 }}
                href="#contact"
                className="rounded-full border border-white/25 bg-white/5 px-6 py-3 text-xs tracking-[0.16em] text-white/85 uppercase"
              >
                Book Discovery Call
              </motion.a>
            </motion.div>
            <p ref={nextHintRef} className="mt-16 text-[11px] tracking-[0.22em] text-white/45 uppercase">
              Scroll to enter the story
            </p>
          </div>
        </section>

        <Sections offerRef={offerRef} resultsRef={resultsRef} galleryRef={galleryRef} />
      </main>
    </div>
  );
}
