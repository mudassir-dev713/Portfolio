'use client';
import React, { useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export const PinContainer = ({
  children,
  title,
  href,
  className,
  containerClassName,
}) => {
  const [hovered, setHovered] = useState(false);
  const [transform, setTransform] = useState('rotateX(0deg) scale(1)');

  const onMouseEnter = () => {
    setTransform('rotateX(40deg) scale(0.96)');
    setHovered(true);
  };
  const onMouseLeave = () => {
    setTransform('rotateX(0deg) scale(1)');
    setHovered(false);
  };

  return (
    <a
      href={href || '/'}
      target="_blank"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={cn(
        'group/pin relative w-full max-w-[800px] mx-auto cursor-pointer',
        containerClassName
      )}
    >
      {/* === Pin Perspective Layer === */}
      {hovered && (
        <div className="absolute inset-0 z-50 pointer-events-none">
          <PinPerspective title={title} href={href} />
        </div>
      )}

      {/* === Card Perspective & Transform === */}
      <div className="w-full" style={{ perspective: '1000px' }}>
        <div
          style={{ transform }}
          className="transition duration-700 transform-style-preserve-3d w-full"
        >
          <div
            className={cn(
              'w-full rounded-2xl shadow-[0_8px_16px_rgb(0_0_0/0.4)]  group-hover/pin:border-white/[0.2]',
              className
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </a>
  );
};

export const PinPerspective = ({ title, href }) => {
  return (
    <motion.div className="pointer-events-none w-96 h-80 flex items-center justify-center opacity-100 z-[60] transition duration-500">
      <div className="w-full h-full -mt-7 flex-none inset-0">
        <div className="absolute top-0 inset-x-0 flex justify-center">
          <span className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10">
            <span className="relative z-20 text-white text-xs font-bold inline-block py-0.5">
              {title}
            </span>

            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover/btn:opacity-40"></span>
          </span>
        </div>

        <div
          style={{
            perspective: '1000px',
            transform: 'rotateX(70deg) translateZ(0)',
          }}
          className="absolute left-1/2 top-1/2 ml-[0.09375rem] mt-4 -translate-x-1/2 -translate-y-1/2"
        >
          <>
            {[0, 2, 4].map((delay, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: '-50%',
                  y: '-50%',
                }}
                animate={{
                  opacity: [0, 1, 0.5, 0],
                  scale: 1,
                  z: 0,
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  delay,
                }}
                className="absolute left-1/2 top-1/2 h-[11.25rem] w-[11.25rem] rounded-full bg-sky-500/[0.08] shadow-[0_8px_16px_rgb(0_0_0/0.4)]"
              />
            ))}
          </>
        </div>

        <>
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40 blur-[2px]" />
          <motion.div className="absolute right-1/2 bottom-1/2 bg-gradient-to-b from-transparent to-cyan-500 translate-y-[14px] w-px h-20 group-hover/pin:h-40" />
          <motion.div className="absolute right-1/2 translate-x-[1.5px] bottom-1/2 bg-cyan-600 translate-y-[14px] w-[4px] h-[4px] rounded-full z-40 blur-[3px]" />
          <motion.div className="absolute right-1/2 translate-x-[0.5px] bottom-1/2 bg-cyan-300 translate-y-[14px] w-[2px] h-[2px] rounded-full z-40" />
        </>
      </div>
    </motion.div>
  );
};
