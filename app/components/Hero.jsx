'use client';

import React from 'react';
import { Spotlight } from './ui/Spotlight';
import { GridBackgroundDemo } from './ui/GridBackgroundDemo';
import { TextGenerateEffect } from './ui/TextGenerateEffect';
import Button from './ui/Button';

const Hero = () => {
  const BtnClick = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="pb-20 md:pt-36 pt-20 max-h-screen">
      <div>
        <Spotlight
          className="-top-40 -right-10 md:-top-20 md:-left-32 h-screen"
          fill="white"
        />
        <Spotlight
          className="top-10 left-full h-[80vh] w-[50vw]"
          fill="purple"
        />
        <Spotlight className="top-28 left-80 h-[80vh] w-[50vw]" fill="blue" />
      </div>
      <GridBackgroundDemo />

      <div className="flex justify-center items-center relative my-20 z-10">
        <div className="max-w-[89vw] flex flex-col items-center justify-center">
          <TextGenerateEffect
            className="tracking-widest min-[2000px]:text-xl dark:text-blue-100 text-black uppercase text-sm text-center max-[1900px]:max-w-80 min-[2000px]:max-w-96"
            duration={1}
            filter={true}
            words="Dynamic web experiences crafted with precision and creativity."
          />

          <TextGenerateEffect
            className="lg:text-7xl leading-10 min-[2000px]:text-8xl dark:text-white text-black text-[50px] md:text-6xl text-center capitalize font-bold"
            duration={4}
            filter={false}
            words="Transforming Ideas Into Code"
          />

          <TextGenerateEffect
            className="text-center max-w-[125rem] dark:text-white-200 text-black-100 min-[2000px]:text-3xl mb-4 mt-4 capitalize text-base md:text-lg lg:text-2xl tracking-widest lg:tracking-normal"
            duration={1}
            filter={false}
            words="Hi, I'm Mudassir — a self-taught web developer focused on building fast, accessible, and visually appealing web apps using modern technologies like React, Next.js, and Tailwind CSS."
          />

          <Button text="See my Work" handleClick={BtnClick} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
