import React from 'react';

const Button = ({ text, className, handleClick, icon }) => {
  return (
    <button
      onClick={handleClick}
      className="relative inline-flex h-12 min-[2000px]:h-16 overflow-hidden rounded-lg p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
    >
      <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-slate-950 px-5 py-2 min-[2000px]:px-8 min-[2000px]:py-4 text-sm min-[2000px]:text-2xl font-medium text-white backdrop-blur-3xl">
        {text}
      </span>
    </button>
  );
};

export default Button;
