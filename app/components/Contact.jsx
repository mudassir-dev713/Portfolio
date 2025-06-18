'use client';

import React from 'react';
import Button from './ui/Button';
import { FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { FaXTwitter } from 'react-icons/fa6';

const Contact = () => {
  const btnClick = () => {
    window.location.href = 'mailto:mudassirmughal204@gmail.com';
  };

  return (
    <footer className="h-fit mb-10 mt-40 sm:mt-0" id="contact">
      <div className="flex flex-col gap-5 items-center justify-center">
        <h1 className="heading capitalize max-w-2xl tracking-wider">
          Let’s Build Something
          <span className="text-purple"> Together </span>
        </h1>

        {/* 📧 Button opens email */}
        <Button text="Contact Me" handleClick={btnClick} />
      </div>

      {/* Footer Info */}
      <div className="flex flex-col sm:flex-row gap-y-10 justify-between items-center mt-32">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} All rights reserved. Built with Next.js
            and Tailwind CSS.
          </p>
        </div>

        {/* Social Icons (already working) */}
        <div className="flex gap-4 text-sm text-white-100">
          {/* Mail */}
          <div className="flex gap-2">
            <p className="">mudassirmughal204@gmail.com</p>
            <a
              href="mailto:mudassirmughal204@gmail.com"
              className="hover:text-purple transition-colors flex gap-2"
            >
              <MdEmail className="md:w-6 md:h-6 h-5 w-5" />
            </a>
          </div>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/mudassir.204/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple transition-colors"
          >
            <FaInstagram className="md:w-6 md:h-6 h-5 w-5" />
          </a>

          {/* Twitter 

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple transition-colors"
          >
            <FaXTwitter className="md:w-6 md:h-6 h-5 w-5" />
          </a>
          */}
        </div>
      </div>
    </footer>
  );
};

export default Contact;
