"use client";

import React, { ReactNode, useState } from 'react';
import { motion } from 'framer-motion';
import { NavMenu } from '@/components/navigation/NavMenu';
import { Skull } from 'lucide-react';
import Link from 'next/link';
import { PanicButton } from '@/components/PanicButton';

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [isGlitching, setIsGlitching] = useState(false);

  // Trigger random glitch effects
  React.useEffect(() => {
    const glitchInterval = setInterval(() => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    }, Math.random() * 10000 + 5000);
    
    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="min-h-screen bg-background circuit-bg">
      <header className="p-4 border-b border-primary/20">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/dashboard">
            <motion.div 
              className="flex items-center space-x-2 text-primary"
              whileHover={{ scale: 1.05 }}
            >
              <Skull className="w-6 h-6 text-primary" />
              <motion.h1 
                className="text-xl md:text-2xl font-bold tracking-wider"
                animate={isGlitching ? {
                  x: [0, -2, 2, -1, 0],
                  opacity: [1, 0.8, 1, 0.9, 1]
                } : {}}
              >
                BOB FORSQA
              </motion.h1>
            </motion.div>
          </Link>
          
          <div className="flex items-center space-x-4">
            <div className="text-xs md:text-sm text-muted-foreground">
              <span className="mr-2">IP:</span>
              <motion.span 
                className="text-primary"
                animate={isGlitching ? { opacity: [1, 0.5, 1] } : {}}
              >
                192.168.1.{Math.floor(Math.random() * 255)}
              </motion.span>
            </div>
            
            <div className="hidden md:block text-xs md:text-sm text-muted-foreground">
              <span className="mr-2">STATUS:</span>
              <motion.span 
                className="text-green-400"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                SECURE
              </motion.span>
            </div>
          </div>
        </div>
      </header>
      
      <NavMenu />
      
      <main className="container mx-auto py-6 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>
      
      <PanicButton />
      
      <footer className="border-t border-primary/20 py-4 text-center text-xs text-muted-foreground">
        <p>Bob Forsqa Syndicate © 2025 | All rights exploited</p>
        <p className="mt-1">This is a fictional parody site. No actual crimes are happening here.</p>
      </footer>
    </div>
  );
};