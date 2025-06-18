'use client';
import React, { useEffect, useState } from 'react';
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from 'motion/react';
import { cn } from '../lib/utils';

export const FloatingNav = ({ navItems, className }) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);

  useMotionValueEvent(scrollYProgress, 'change', (current) => {
    if (typeof current === 'number') {
      let direction = current - scrollYProgress.getPrevious();

      if (scrollYProgress.get() < 0.05) {
        setVisible(false);
      }
      if (scrollYProgress < 0.5) {
        setVisible(true);
      } else {
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 1, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          'fixed top-10 inset-x-0 z-[5000] flex justify-center items-center',
          className
        )}
      >
        {/* Left-aligned "Mudassir" */}
        <div className="absolute left-4 text-xl md:px-12 px-4 sm:text-3xl font-bold dark:text-white text-black select-none">
          Mudassir
        </div>

        {/* Centered Nav */}
        <div className="flex max-[640px]:hidden border border-white/30 dark:bg-black-200 bg-white/80 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] rounded-full px-8 py-4 backdrop:blur-2xl items-center space-x-4 ">
          {navItems.map((navItem, idx) => (
            <a
              key={`link-${idx}`}
              href={navItem.link}
              className="relative tracking-wider dark:text-neutral-50 text-neutral-700 dark:hover:text-neutral-300 hover:text-neutral-500 flex items-center space-x-1"
            >
              <span className="block sm:hidden">{navItem?.icon}</span>
              <span className="hidden sm:block text-sm">{navItem.name}</span>
            </a>
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
