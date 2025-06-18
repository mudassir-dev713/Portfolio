'use client';

import React from 'react';
import { BentoGrid, BentoGridItem } from './ui/BentoGrid';
import { gridItems } from '../constants/Data';

const Grid = () => {
  return (
    <section
      className="h-screen relative max-h-fit mt-40 w-full mb-40 md:mb-96 min-[2000px]:px-20 "
      id="about"
    >
      <h1 className=" md:text-2xl text-base z-50 visible  dark:text-white-200 text-black-100 tracking-widest  text-center max-w-[125rem] mt-10 mb-32 relative about-text md:mt-52">
        I'm a self-taught developer who enjoys turning ideas into reality
        through code. I'm always learning new tools, experimenting with designs,
        and building real-world projects from scratch. Whether it's designing
        sleek user interfaces or solving backend challenges, I love the process
        of creating something useful and meaningful.
      </h1>
      <div className="h-screen ">
        <BentoGrid>
          {gridItems.map((item, index) => (
            <BentoGridItem
              title={item.title}
              description={item.description}
              className={item.className}
              id={item.id}
              key={item.id}
              imgClassName={item.imgClassName}
              titleClassName={item.titleClassName}
              img={item.img}
              spareImg={item.spareImg}
            />
          ))}
        </BentoGrid>
      </div>
    </section>
  );
};

export default Grid;
