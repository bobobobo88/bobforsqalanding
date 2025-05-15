"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { TerminalText } from '@/components/terminal/TerminalText';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import { NeonButton } from '@/components/ui/neon-button';
import { Skull } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const [isDecrypting, setIsDecrypting] = useState(true);
  const [showButton, setShowButton] = useState(false);
  const [ipAddress, setIpAddress] = useState('');
  const [showTerminalLines, setShowTerminalLines] = useState([false, false, false]);
  
  useEffect(() => {
    // Generate random IP address
    const ip = `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`;
    setIpAddress(ip);
    
    // Show decryption message
    const timer1 = setTimeout(() => {
      setIsDecrypting(false);
      setShowTerminalLines([true, false, false]);
    }, 2000);
    
    // Show IP trace message
    const timer2 = setTimeout(() => {
      setShowTerminalLines([true, true, false]);
    }, 3000);
    
    // Show connection message and button
    const timer3 = setTimeout(() => {
      setShowTerminalLines([true, true, true]);
      setShowButton(true);
    }, 4500);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);
  
  const handleInfiltrate = () => {
    router.push('/dashboard');
  };
  
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <motion.div
        className="text-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col items-center">
          <motion.div
            animate={{ 
              textShadow: ['0 0 5px #39ff14', '0 0 15px #39ff14', '0 0 5px #39ff14'],
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            className="text-5xl md:text-7xl text-primary font-mono tracking-widest mb-4"
          >
            <div className="flex items-center justify-center mb-4">
              <Skull className="w-16 h-16 md:w-24 md:h-24 text-primary mr-4" />
            </div>
            BOB<br />FORSQA
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <TerminalWindow title="terminal@syndicate:~">
          <div className="space-y-4">
            {isDecrypting ? (
              <div className="flex items-center">
                <span className="text-primary mr-2">&gt;</span>
                <TerminalText text="DECRYPTING ACCESS..." typingSpeed={30} />
              </div>
            ) : (
              <>
                <div className="flex items-center">
                  <span className="text-primary mr-2">&gt;</span>
                  <span className="text-primary">DECRYPTION COMPLETE</span>
                </div>
                
                {showTerminalLines[0] && (
                  <div className="flex items-center">
                    <span className="text-primary mr-2">&gt;</span>
                    <TerminalText 
                      text={`TRACING IP: ${ipAddress} [FLAGGED]`} 
                      typingSpeed={20} 
                      startDelay={200}
                    />
                  </div>
                )}
                
                {showTerminalLines[1] && (
                  <div className="flex items-center">
                    <span className="text-primary mr-2">&gt;</span>
                    <TerminalText 
                      text="ESTABLISHING ENCRYPTED CONNECTION..." 
                      typingSpeed={20}
                      startDelay={500}
                    />
                  </div>
                )}
                
                {showTerminalLines[2] && (
                  <div className="flex items-center">
                    <span className="text-primary mr-2">&gt;</span>
                    <TerminalText 
                      text="CONNECTION ESTABLISHED. SYNDICATE HQ READY." 
                      typingSpeed={20}
                      startDelay={200}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </TerminalWindow>
      </motion.div>

      {showButton && (
        <motion.div
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <NeonButton
            onClick={handleInfiltrate}
            className="text-xl tracking-widest px-10 py-4"
            glitch
          >
            INITIATE INFILTRATION
          </NeonButton>
        </motion.div>
      )}
      
      <motion.div 
        className="mt-12 text-primary/60 text-sm opacity-60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 5 }}
      >
        <div className="flex space-x-4 md:space-x-8">
          <span>[ OPERATIONS ]</span>
          <span>[ MARKET ]</span>
          <span>[ COMMS ]</span>
          <span>[ LOGS ]</span>
        </div>
      </motion.div>
    </div>
  );
}