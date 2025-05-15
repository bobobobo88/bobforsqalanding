"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import { TerminalText } from '@/components/terminal/TerminalText';
import { NeonButton } from '@/components/ui/neon-button';
import { Bot, MailQuestion, Send } from 'lucide-react';

// BobGPT personalities
const personalities = [
  {
    id: 'corporate',
    name: 'Corporate Bob',
    icon: '🧠',
    style: 'text-blue-400',
    intro: "Per my last crime, I'd like to circle back on our illicit activities.",
    responses: [
      "Let's circle back on that illegal idea after we've had time to flesh out the KPIs.",
      "I'm going to have to push back on that timeline for the heist. Q4 is already jam-packed with cyber extortion.",
      "Let's take this offline and discuss how to optimize our cryptocurrency diversification strategy.",
      "I've created a Powerpoint deck outlining 17 ways to launder money through NFTs.",
      "We need to align on our core competencies before expanding into new criminal verticals."
    ]
  },
  {
    id: 'evil',
    name: 'Evil Bob',
    icon: '🧛',
    style: 'text-red-400',
    intro: 'Excellent... your arrival pleases me. Let\'s plan something SINISTER!',
    responses: [
      "Have you considered replacing all sugar with salt in the office kitchen? MWAHAHAHA!",
      "Let's create a computer virus that turns all spreadsheets into pictures of kittens!",
      "My masterplan involves making everyone's shoes slightly too tight.",
      "I suggest we hack the traffic lights to stay yellow... FOREVER!",
      "My evil plot: sending people emails with 'Thanks in advance' to guilt them into doing things."
    ]
  },
  {
    id: 'high',
    name: 'High Bob',
    icon: '🥴',
    style: 'text-green-400',
    intro: 'Whoaaa dude, you ever think about how, like, computers are just rocks we taught to think?',
    responses: [
      "What if keyboards, but for your thoughts? Wait, that's just talking. Whoa.",
      "Duuuude, I just realized the cloud is actually just someone else's computer. Mind. Blown.",
      "I tried to hack time, but then I got distracted by watching paint dry. It was FASCINATING.",
      "What if we made a blockchain, but instead of blocks, it's tacos? TacoChain, man.",
      "I forgot what I was coding, so I just typed 'hello world' 400 times and hoped for the best."
    ]
  }
];

type ChatMessage = {
  sender: 'user' | 'bob';
  text: string;
  timestamp: Date;
};

export default function Comms() {
  const [activeTab, setActiveTab] = useState<'email' | 'bobgpt'>('bobgpt');
  const [currentPersonality, setCurrentPersonality] = useState(personalities[0]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmailSuccess, setShowEmailSuccess] = useState(false);
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom of chat when messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);
  
  // Select random personality when component loads
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * personalities.length);
    setCurrentPersonality(personalities[randomIndex]);
    
    // Add intro message
    setChatMessages([
      {
        sender: 'bob',
        text: personalities[randomIndex].intro,
        timestamp: new Date()
      }
    ]);
  }, []);
  
  const handleSendMessage = () => {
    if (!userInput.trim()) return;
    
    // Add user message
    const newUserMessage: ChatMessage = {
      sender: 'user',
      text: userInput,
      timestamp: new Date()
    };
    
    setChatMessages([...chatMessages, newUserMessage]);
    setUserInput('');
    setIsTyping(true);
    
    // Simulate Bob typing and responding
    setTimeout(() => {
      const randomResponse = currentPersonality.responses[
        Math.floor(Math.random() * currentPersonality.responses.length)
      ];
      
      const newBobMessage: ChatMessage = {
        sender: 'bob',
        text: randomResponse,
        timestamp: new Date()
      };
      
      setChatMessages(prev => [...prev, newBobMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const changePersonality = () => {
    // Get a different personality than the current one
    const availablePersonalities = personalities.filter(p => p.id !== currentPersonality.id);
    const newPersonality = availablePersonalities[Math.floor(Math.random() * availablePersonalities.length)];
    
    setCurrentPersonality(newPersonality);
    
    // Add personality change message
    setChatMessages([
      ...chatMessages,
      {
        sender: 'bob',
        text: `[SYSTEM: Personality shifted to ${newPersonality.name}]`,
        timestamp: new Date()
      },
      {
        sender: 'bob',
        text: newPersonality.intro,
        timestamp: new Date()
      }
    ]);
  };
  
  const handleSendEmail = () => {
    if (!email.trim()) return;
    
    // Animation for sending email
    setShowEmailSuccess(true);
    
    // Reset after 3 seconds
    setTimeout(() => {
      setShowEmailSuccess(false);
      setEmail('');
    }, 3000);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-primary mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          COMMUNICATIONS CENTER
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          Secure channel established | Encryption: AES-256
        </motion.p>
      </div>

      <div className="flex space-x-2 mb-4">
        <NeonButton
          onClick={() => setActiveTab('bobgpt')}
          variant={activeTab === 'bobgpt' ? 'primary' : 'secondary'}
          className="flex items-center space-x-2"
        >
          <Bot size={16} />
          <span>BOBGPT</span>
        </NeonButton>
        
        <NeonButton
          onClick={() => setActiveTab('email')}
          variant={activeTab === 'email' ? 'primary' : 'secondary'}
          className="flex items-center space-x-2"
        >
          <MailQuestion size={16} />
          <span>SECURE EMAIL</span>
        </NeonButton>
      </div>

      {activeTab === 'bobgpt' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <TerminalWindow title={`bobgpt@${currentPersonality.id}:~`} className="h-[500px] flex flex-col">
            <div className="flex justify-between items-center mb-3 pb-2 border-b border-primary/20">
              <div className="flex items-center">
                <span className={`mr-2 text-xl ${currentPersonality.style}`}>{currentPersonality.icon}</span>
                <span className={`font-bold ${currentPersonality.style}`}>{currentPersonality.name}</span>
              </div>
              
              <NeonButton onClick={changePersonality} className="text-xs py-1">
                SWITCH PERSONALITY
              </NeonButton>
            </div>
            
            <div className="flex-1 overflow-y-auto mb-4 space-y-4">
              {chatMessages.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] p-3 rounded ${
                      msg.sender === 'user' 
                        ? 'bg-secondary/20 text-secondary ml-4' 
                        : `${currentPersonality.style.replace('text', 'bg')}/10 ${currentPersonality.style} mr-4`
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className={`max-w-[80%] p-3 rounded ${currentPersonality.style.replace('text', 'bg')}/10 ${currentPersonality.style} mr-4`}>
                    <span className="animate-pulse">...</span>
                  </div>
                </div>
              )}
              
              <div ref={chatEndRef} />
            </div>
            
            <div className="mt-auto flex space-x-2">
              <textarea
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask BobGPT something..."
                className="flex-1 bg-black/80 border border-primary/20 rounded p-2 text-primary resize-none focus:outline-none focus:border-primary/50"
                rows={2}
              />
              
              <NeonButton onClick={handleSendMessage} className="self-end">
                <Send size={18} />
              </NeonButton>
            </div>
          </TerminalWindow>
        </motion.div>
      )}

      {activeTab === 'email' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <TerminalWindow title="secure-mail@bobforsqa:~" className="h-[500px]">
            {!showEmailSuccess ? (
              <div className="space-y-6">
                <div>
                  <div className="text-primary mb-2">CONTACT: bob@bobforsqa.top</div>
                  <div className="text-muted-foreground text-sm mb-6">
                    All communications are fictional and part of the parody site experience.
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="text-primary">YOUR EMAIL:</div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    className="w-full bg-black/80 border border-primary/20 rounded p-2 text-primary focus:outline-none focus:border-primary/50"
                  />
                </div>
                
                <div className="space-y-3">
                  <div className="text-primary">MESSAGE:</div>
                  <textarea
                    placeholder="Type your totally secure and definitely not intercepted message here..."
                    className="w-full h-40 bg-black/80 border border-primary/20 rounded p-2 text-primary resize-none focus:outline-none focus:border-primary/50"
                  />
                </div>
                
                <div className="flex justify-end">
                  <NeonButton 
                    onClick={handleSendEmail} 
                    variant="secondary"
                    className="flex items-center space-x-2"
                  >
                    <span>SEND ENCRYPTED MESSAGE</span>
                    <Send size={16} />
                  </NeonButton>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center space-y-6">
                <div className="p-4 border border-primary/30 rounded-full bg-primary/10">
                  <Send size={48} className="text-primary" />
                </div>
                
                <div className="space-y-2 text-center">
                  <div className="text-xl text-primary font-bold">ENCRYPTING MESSAGE</div>
                  <div className="text-muted-foreground">Applying ROT13 encryption... twice for extra security!</div>
                </div>
                
                <div className="w-1/2 h-2 bg-black border border-primary/20 rounded overflow-hidden">
                  <motion.div 
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2.5 }}
                  />
                </div>
                
                <div className="text-center">
                  <TerminalText
                    text="MESSAGE INTERCEPTED BY FICTIONAL FBI. JUST KIDDING... OR ARE WE?"
                    typingSpeed={20}
                  />
                </div>
              </div>
            )}
          </TerminalWindow>
        </motion.div>
      )}
    </DashboardLayout>
  );
}