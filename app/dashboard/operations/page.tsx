"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import { NeonButton } from '@/components/ui/neon-button';

interface Mission {
  id: string;
  name: string;
  status: 'PENDING' | 'READY' | 'FAILED' | 'RUNNING';
  description: string;
  failureMessage?: string;
}

export default function Operations() {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: 'mission-001',
      name: 'Flood AI with shrimp emojis',
      status: 'PENDING',
      description: 'Send 10,000 shrimp emojis to an AI assistant until it starts thinking in crustaceans.',
      failureMessage: 'Mission Failed. VPN too slow. Shrimp emoji delivery intercepted.'
    },
    {
      id: 'mission-002',
      name: 'Hack your own smart fridge',
      status: 'READY',
      description: 'Gain admin access to your kitchen appliance. Make it think it\'s a gaming PC.',
      failureMessage: 'Mission Failed. Your fridge is smarter than you thought.'
    },
    {
      id: 'mission-003',
      name: 'Train GPT on Reddit r/confessions',
      status: 'FAILED',
      description: 'Create an AI that exclusively gives questionable relationship advice.',
      failureMessage: 'Mission Failed. The AI became too self-aware and is now writing its own AITA posts.'
    },
    {
      id: 'mission-004',
      name: 'Digital graffiti on corporate websites',
      status: 'READY', 
      description: 'Replace all corporate stock photos with pictures of cats in business attire.',
      failureMessage: 'Mission Failed. The cats looked too professional, nobody noticed.'
    }
  ]);
  
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [showFailure, setShowFailure] = useState(false);
  
  const handleLaunchMission = (mission: Mission) => {
    setSelectedMission(mission);
    
    // Update mission to running state
    setMissions(prev => 
      prev.map(m => 
        m.id === mission.id ? { ...m, status: 'RUNNING' as const } : m
      )
    );
    
    // After 2 seconds show failure message
    setTimeout(() => {
      setShowFailure(true);
      
      // Update mission to failed state
      setMissions(prev => 
        prev.map(m => 
          m.id === mission.id ? { ...m, status: 'FAILED' as const } : m
        )
      );
    }, 2000);
  };
  
  const handleClose = () => {
    setSelectedMission(null);
    setShowFailure(false);
  };
  
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'PENDING': return 'text-yellow-400';
      case 'READY': return 'text-green-400';
      case 'FAILED': return 'text-red-400';
      case 'RUNNING': return 'text-blue-400';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-primary mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          OPERATIONS CONTROL
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Available missions: {missions.length} | Active missions: 0
        </motion.p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {missions.map((mission, index) => (
          <motion.div
            key={mission.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <TerminalWindow
              variant={mission.status === 'FAILED' ? 'error' : mission.status === 'READY' ? 'success' : 'default'}
            >
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-lg font-bold">{mission.name}</h3>
                <span className={getStatusClass(mission.status)}>{mission.status}</span>
              </div>
              
              <p className="text-muted-foreground mb-4">{mission.description}</p>
              
              <div className="flex justify-end">
                <NeonButton 
                  onClick={() => handleLaunchMission(mission)}
                  disabled={mission.status === 'FAILED' || mission.status === 'RUNNING'}
                  variant={mission.status === 'READY' ? 'primary' : 'secondary'}
                >
                  LAUNCH MISSION
                </NeonButton>
              </div>
            </TerminalWindow>
          </motion.div>
        ))}
      </div>

      {/* Mission Terminal Overlay */}
      {selectedMission && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-2xl"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <TerminalWindow 
              title={`mission@${selectedMission.id}:~`}
              variant={showFailure ? 'error' : 'default'}
            >
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-primary mr-2">&gt;</span>
                  <span>MISSION: {selectedMission.name}</span>
                </div>
                
                {!showFailure ? (
                  <>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">&gt;</span>
                      <span>EXECUTING MISSION PROTOCOL...</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-primary mr-2">&gt;</span>
                      <span>ESTABLISHING SECURE CONNECTION...</span>
                    </div>
                    <div className="h-6 w-full bg-black border border-primary/30 rounded overflow-hidden">
                      <motion.div
                        className="h-full bg-primary/30"
                        initial={{ width: "0%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 2 }}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center">
                      <span className="text-red-500 mr-2">&gt;</span>
                      <span className="text-red-500">ERROR CODE: X274-BB</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-red-500 mr-2">&gt;</span>
                      <span className="text-red-500">{selectedMission.failureMessage}</span>
                    </div>
                    <div className="mt-4">
                      <NeonButton onClick={handleClose} variant="accent">CLOSE</NeonButton>
                    </div>
                  </>
                )}
              </div>
            </TerminalWindow>
          </motion.div>
        </motion.div>
      )}
    </DashboardLayout>
  );
}