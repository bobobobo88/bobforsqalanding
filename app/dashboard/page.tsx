"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import { TerminalText } from '@/components/terminal/TerminalText';
import { NeonButton } from '@/components/ui/neon-button';
import Link from 'next/link';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="mb-6">
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-primary mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          SYNDICATE HQ <span className="text-muted-foreground">v3.1.4</span>
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Welcome back, operative. System status: <span className="text-green-400">ONLINE</span>
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Operations Module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Link href="/dashboard/operations">
            <div className="h-full">
              <h2 className="text-xl font-semibold text-primary mb-3">OPERATIONS</h2>
              <TerminalWindow className="h-[calc(100%-2rem)]">
                <div className="space-y-3">
                  <div className="flex">
                    <span className="text-primary mr-2">&gt;</span>
                    <TerminalText text="Current missions available: 3" typingSpeed={20} />
                  </div>
                  <div className="flex justify-between items-center p-2 border border-primary/20 rounded bg-black/50 mt-2">
                    <span>Flood AI with shrimp emojis</span>
                    <span className="text-yellow-400">PENDING</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border border-primary/20 rounded bg-black/50">
                    <span>Hack your own smart fridge</span>
                    <span className="text-green-400">READY</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border border-primary/20 rounded bg-black/50">
                    <span>Train GPT on Reddit r/confessions</span>
                    <span className="text-red-400">FAILED</span>
                  </div>
                </div>
              </TerminalWindow>
            </div>
          </Link>
        </motion.div>

        {/* Market Module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Link href="/dashboard/market">
            <div className="h-full">
              <h2 className="text-xl font-semibold text-primary mb-3">MARKET</h2>
              <TerminalWindow className="h-[calc(100%-2rem)]">
                <div className="space-y-3">
                  <div className="flex">
                    <span className="text-primary mr-2">&gt;</span>
                    <TerminalText text="Featured items: 4" typingSpeed={20} />
                  </div>
                  <div className="flex justify-between items-center p-2 border border-primary/20 rounded bg-black/50 mt-2">
                    <span>Untraceable USB</span>
                    <span className="text-secondary">Ƀ0.004</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border border-primary/20 rounded bg-black/50">
                    <span>AI Xanax (v0.9)</span>
                    <span className="text-green-400">FREE</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border border-primary/20 rounded bg-black/50">
                    <span>Toaster Exploit</span>
                    <span className="text-primary">$12.00</span>
                  </div>
                </div>
              </TerminalWindow>
            </div>
          </Link>
        </motion.div>

        {/* Comms Module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link href="/dashboard/comms">
            <div className="h-full">
              <h2 className="text-xl font-semibold text-primary mb-3">COMMS</h2>
              <TerminalWindow className="h-[calc(100%-2rem)]">
                <div className="space-y-3">
                  <div className="flex">
                    <span className="text-primary mr-2">&gt;</span>
                    <TerminalText text="Contact: bob@bobforsqa.top" typingSpeed={20} />
                  </div>
                  <div className="p-2 border border-primary/20 rounded bg-black/50 mt-2">
                    <div className="text-sm text-muted-foreground mb-2">Message:</div>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">&gt;</span>
                      <span className="cursor-blink">_</span>
                    </div>
                  </div>
                  <NeonButton className="w-full mt-2" variant="secondary">
                    SEND ENCRYPTED MESSAGE
                  </NeonButton>
                </div>
              </TerminalWindow>
            </div>
          </Link>
        </motion.div>

        {/* Logs Module */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link href="/dashboard/logs">
            <div className="h-full">
              <h2 className="text-xl font-semibold text-primary mb-3">LOGS</h2>
              <TerminalWindow className="h-[calc(100%-2rem)]">
                <div className="space-y-3">
                  <div className="flex">
                    <span className="text-primary mr-2">&gt;</span>
                    <TerminalText text="Available files: 3" typingSpeed={20} />
                  </div>
                  <div className="flex justify-between items-center p-2 border border-primary/20 rounded bg-black/50 mt-2">
                    <span>rant_001.txt</span>
                    <span className="text-xs text-muted-foreground">21KB</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border border-primary/20 rounded bg-black/50">
                    <span>chatlog_with_ai.txt</span>
                    <span className="text-xs text-muted-foreground">45KB</span>
                  </div>
                  <div className="flex justify-between items-center p-2 border border-primary/20 rounded bg-black/50">
                    <span>dreams_from_last_trip.md</span>
                    <span className="text-xs text-muted-foreground">128KB</span>
                  </div>
                </div>
              </TerminalWindow>
            </div>
          </Link>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}