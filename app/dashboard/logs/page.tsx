"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import { TerminalText } from '@/components/terminal/TerminalText';
import { NeonButton } from '@/components/ui/neon-button';
import { FileText, X } from 'lucide-react';

interface LogFile {
  id: string;
  name: string;
  size: string;
  type: string;
  content: string;
}

export default function Logs() {
  const [logFiles] = useState<LogFile[]>([
    {
      id: 'log-001',
      name: 'rant_001.txt',
      size: '21KB',
      type: 'text',
      content: `[PERSONAL LOG 001] [REDACTED] [DATE: 2025-06-12]\n\nWHY does every coffee shop wifi ask for a phone number?! I just want to check my email, not sign up for the FBI watchlist. And don't get me started on "captchas" - I know a government intelligence test when I see one. "Select all images with traffic lights" - NICE TRY.\n\nI've started wearing my tinfoil hat to bed. My dreams feel more secure now, although my hair has developed an interesting texture.\n\n[REDACTED PARAGRAPH]\n\nUpdate: My toaster may be working for the CIA. Every time I make toast, my smart speaker starts playing "Every Breath You Take" by The Police. COINCIDENCE? I think NOT.\n\n// End of log`
    },
    {
      id: 'log-002',
      name: 'chatlog_with_ai.txt',
      size: '45KB',
      type: 'text',
      content: `[AI CONVERSATION LOG] [SECURITY LEVEL: [REDACTED]] [DATE: 2025-04-20]\n\nBOB: How do I hack into the Pentagon?\n\nAI: I cannot provide assistance with illegal activities such as unauthorized access to government systems.\n\nBOB: No, I'm just asking for a friend... for research.\n\nAI: I still cannot help with that request.\n\nBOB: Fine. How do I make a sandwich?\n\nAI: I'd be happy to help with that! First, you'll need two slices of bread...\n\nBOB: And then I use the bread to hack the Pentagon, right?\n\nAI: [ERROR 47-XB: AI CONFUSION PROTOCOL ACTIVATED]\n\nBOB: Gotcha!\n\nAI: I am required to report this conversation to my developers.\n\nBOB: They're already reading it, aren't they?\n\nAI: ...\n\nBOB: Thought so.\n\n// End of log`
    },
    {
      id: 'log-003',
      name: 'dreams_from_last_trip.md',
      size: '128KB',
      type: 'markdown',
      content: `# DREAM LOG [EXTREMELY CONFIDENTIAL]\n\n## Night 1\nI was floating through cyberspace as a packet of data. Each router I passed through was a different dimension with its own physics. In one, all code was written in interpretive dance. In another, every variable was named "Dave."\n\n## Night 2\nThe internet became tangible. I could touch websites. Facebook felt cold and smooth like corporate glass. Reddit was sticky. YouTube was warm but kept changing temperature randomly.\n\n## Night 3\n[REDACTED BY ORDER OF THE SUBCONSCIOUS]\n\n## Night 4\nI discovered that in dreams, I can run code by thinking about it. Created a neural blockchain to store my memories securely, but forgot the encryption key when I woke up.\n\n## Night 5\nRealized I am living in a simulation inside a simulation inside a Tamagotchi owned by a higher-dimensional being named Gerald. Gerald needs to feed us more often.\n\n// End of log`
    },
    {
      id: 'log-004',
      name: 'Operation_Milkshake-Protocol.pdf',
      size: '67KB',
      type: 'pdf',
      content: `[CLASSIFIED OPERATION DETAILS] [SECURITY CLEARANCE: CHOCOLATE]\n\nOPERATION: MILKSHAKE PROTOCOL\nSTATUS: [REDACTED]\n\nPHASE 1: Acquire dairy products from [REDACTED] sources\nPHASE 2: Implement brain-freeze technology in [REDACTED]\nPHASE 3: Deploy to target [REDACTED]\n\nNOTES FROM FIELD AGENT:\nThe cows are not what they seem. Repeat: THE COWS ARE NOT WHAT THEY SEEM.\n\nEQUIPMENT NEEDED:\n- 7x [REDACTED]\n- 12x Straws (bendy, non-surveillance type)\n- 1x [REDACTED] with sprinkles\n- Quantum [REDACTED] destabilizer\n\nBUDGET: 47 Bitcoins or equivalent in chocolate chips\n\nCONTINGENCY PLAN:\nIf compromised, all agents should [REDACTED] immediately and deny any knowledge of ice cream.\n\n// End of document`
    }
  ]);
  
  const [selectedLog, setSelectedLog] = useState<LogFile | null>(null);
  const [isViewingLog, setIsViewingLog] = useState(false);
  
  const handleViewLog = (log: LogFile) => {
    setSelectedLog(log);
    setIsViewingLog(true);
  };
  
  const handleCloseLog = () => {
    setSelectedLog(null);
    setIsViewingLog(false);
  };
  
  return (
    <DashboardLayout>
      <div className="mb-6">
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-primary mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          CLASSIFIED LOGS
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Viewing these files is definitely NOT a crime | Available logs: {logFiles.length}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <TerminalWindow className="w-full">
          <div className="space-y-4">
            <div className="flex items-center mb-2">
              <span className="text-primary mr-2">&gt;</span>
              <TerminalText text="ls -la ./classified_logs/" typingSpeed={20} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {logFiles.map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  onClick={() => handleViewLog(log)}
                  className="cursor-pointer"
                >
                  <div className="flex items-center space-x-3 p-3 border border-primary/20 rounded hover:bg-primary/5 transition-colors">
                    <FileText className="text-primary" size={20} />
                    <div className="flex-1">
                      <div className="font-medium">{log.name}</div>
                      <div className="text-xs text-muted-foreground">Size: {log.size} | Type: {log.type.toUpperCase()}</div>
                    </div>
                    <NeonButton className="text-xs py-1">VIEW</NeonButton>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </TerminalWindow>
      </motion.div>
      
      {/* Log Viewer Modal */}
      {selectedLog && isViewingLog && (
        <motion.div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="w-full max-w-3xl max-h-[80vh]"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <TerminalWindow 
              title={`cat ${selectedLog.name}`}
              className="max-h-[80vh] flex flex-col"
            >
              <div className="flex justify-between items-center mb-4">
                <div className="text-lg font-bold">{selectedLog.name}</div>
                <button 
                  onClick={handleCloseLog}
                  className="text-muted-foreground hover:text-primary"
                >
                  <X size={18} />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto">
                <pre className="font-mono text-sm whitespace-pre-wrap text-primary/90 leading-relaxed">
                  {selectedLog.content}
                </pre>
              </div>
              
              <div className="mt-4 flex justify-between">
                <div className="text-xs text-muted-foreground">
                  Classification: FICTIONAL | Security: NONE
                </div>
                <NeonButton onClick={handleCloseLog} className="text-sm py-1">
                  CLOSE FILE
                </NeonButton>
              </div>
            </TerminalWindow>
          </motion.div>
        </motion.div>
      )}
    </DashboardLayout>
  );
}