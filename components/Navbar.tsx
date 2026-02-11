"use client";

import { motion } from "framer-motion";

const links = [
  { href: "#offer", label: "Offer" },
  { href: "#results", label: "Results" },
  { href: "#gallery", label: "Gallery" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-50 px-4 py-4 md:px-8"
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-white/15 bg-white/8 px-4 py-3 backdrop-blur-xl md:px-6">
        <a href="#top" className="font-display text-sm tracking-[0.22em] text-[#f5efe1] uppercase">
          Nocturne
        </a>
        <ul className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <motion.a
                whileHover={{ y: -2, opacity: 1 }}
                transition={{ duration: 0.2 }}
                href={link.href}
                className="text-xs tracking-[0.18em] text-white/75 uppercase transition-colors hover:text-white"
              >
                {link.label}
              </motion.a>
            </li>
          ))}
        </ul>
        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          href="#contact"
          className="rounded-full border border-[#f6c76e]/50 bg-[#f6c76e]/10 px-4 py-2 text-xs tracking-[0.14em] text-[#f6c76e] uppercase"
        >
          Start Project
        </motion.a>
      </nav>
    </motion.header>
  );
}
