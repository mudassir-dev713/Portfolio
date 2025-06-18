'use client';

import React from 'react';
import { PinContainer, PinPerspective } from './ui/3dPin';
import { projects } from '../constants/Data';

const Projects = () => {
  return (
    <section className="min-h-screen md:mt-[42rem] mt-[46rem]" id="projects">
      <div>
        <h1 className="heading capitalize">
          A small selection of
          <span className="text-purple capitalize"> recent projects</span>
        </h1>
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 gap-20 mt-20 justify-center max-w-[100rem] mx-auto mb-10">
        {projects.map((item, index) => (
          <PinContainer
            key={index}
            title={item.title}
            href={item.link}
            className="w-full"
          >
            <div className="bg-[#090C21] flex flex-col justify-center items-center px-5 py-8 rounded-2xl max-w-[800px] w-full">
              <div className="relative rounded-2xl">
                <img src="/bg.png" alt="" className="w-full h-full" />
                <img
                  src={item.img}
                  alt=""
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
              <div className="flex flex-col gap-2 px-1 md:mt-4 mt-6">
                <h2 className="md:text-3xl font-bold text-xl">{item.title}</h2>
                <p className="tracking-wide md:text-base text-sm text-white-200">
                  {item.des}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex gap-4 mt-2">
                    {item.iconLists.map((src, indeximg) => (
                      <img
                        key={indeximg}
                        src={src}
                        alt=""
                        className="md:w-6 md:h-6 h-4 w-4"
                      />
                    ))}
                  </div>
                  <div>
                    <span className="text-purple flex items-center justify-center gap-2 md:text-sm text-xs">
                      Check Live Site
                      <img
                        src="/arrow.svg"
                        alt=""
                        className="md:h-3 md:w-3 h-2 w-2"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </PinContainer>
        ))}
      </div>
    </section>
  );
};

export default Projects;
