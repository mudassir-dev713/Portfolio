'use client';
import { AnimatePresence, motion } from 'motion/react';
import React, { useState } from 'react';
import { CanvasRevealEffect } from './ui/canvas-reveal-effect';

const Approuch = () => {
  return (
    <section className="  w-full mt-40 mb-40">
      <div>
        <h1 className="heading">
          My
          <span className="text-purple"> Approach</span>
        </h1>
      </div>
      <div>
        <>
          <div className="py-20 flex flex-col lg:flex-row items-center justify-center  w-full gap-4 mx-auto px-8 gap-y-5">
            <Card
              title="Understand & Plan"
              desc="Every great project starts with understanding the idea. I dig deep into the problem, identify the user’s needs, and outline a clear plan — from UI structure to backend architecture."
              icon={<AceternityIcon number="1" />}
            >
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-sky-600 cursor-pointer"
                colors={[[125, 211, 252]]}
              />
            </Card>{' '}
            <Card
              title="Build & Iterate"
              desc="I bring the idea to life through clean, scalable code. Whether it’s React on the frontend or Node.js on the backend, I build in small, testable steps — improving as I go.

"
              icon={<AceternityIcon number="2" />}
            >
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-emerald-600 cursor-pointer"
                colors={[[125, 211, 252]]}
              />
            </Card>{' '}
            <Card
              title="Polish & Deploy"
              desc="Once the core is solid, I focus on performance, accessibility, and responsiveness. I test thoroughly and deploy using modern tools like Vercel or Netlify — always aiming for a smooth user experience.

"
              icon={<AceternityIcon number="3" />}
            >
              <CanvasRevealEffect
                animationSpeed={3}
                containerClassName="bg-yellow-600 cursor-pointer"
                colors={[[125, 211, 252]]}
              />
            </Card>
          </div>
        </>
      </div>
    </section>
  );
};

export default Approuch;

const Card = ({ title, icon, children, desc }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem] relative"
    >
      <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
      <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="h-full w-full absolute inset-0"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      <div className="relative z-20">
        <div className="text-center group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
          {icon}
        </div>
        <h2 className="dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {title}
        </h2>
        <p className="dark:text-white-200 font-normal opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
          {desc}
        </p>
      </div>
    </div>
  );
};

const AceternityIcon = ({ number }) => {
  return (
    <div className="text-2xl tracking-wide px-4 py-2 border-purple border-[0.1px] font-extrabold text-pretty text-purple rounded-xl">
      Phase {number}
    </div>
  );
};

export const Icon = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
