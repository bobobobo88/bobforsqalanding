"use client";

import React from 'react';
import { motion } from 'framer-motion';

export const ScanlineEffect: React.FC = () => {
  return (
    <>
      <div className="scanline"></div>
      <motion.div
        className="fixed top-0 left-0 w-full h-screen pointer-events-none z-[45] opacity-10"
        style={{
          backgroundImage: 'linear-gradient(transparent 50%, rgba(57, 255, 20, 0.02) 50%)',
          backgroundSize: '100% 4px',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '0px 100px'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'linear',
        }}
      />
    </>
  );
};