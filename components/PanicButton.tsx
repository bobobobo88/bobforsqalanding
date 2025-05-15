"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';

export const PanicButton: React.FC = () => {
  const [isPanicMode, setIsPanicMode] = useState(false);

  const handlePanic = () => {
    setIsPanicMode(true);
    
    // Add corporate styling
    document.body.classList.add('panic-mode');
    
    // Reset after 5 seconds
    setTimeout(() => {
      setIsPanicMode(false);
      document.body.classList.remove('panic-mode');
    }, 5000);
  };

  return (
    <>
      {/* Corporate overlay that appears in panic mode */}
      {isPanicMode && (
        <motion.div 
          className="fixed inset-0 bg-white z-[100] p-8 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="max-w-4xl mx-auto">
            <header className="py-4 border-b border-gray-200">
              <h1 className="text-xl font-serif text-gray-800">Forsqa Enterprise Tax Advisory Services, LLC</h1>
            </header>
            
            <main className="py-8">
              <h2 className="text-2xl font-serif text-gray-800 mb-4">Welcome to Our Professional Services</h2>
              <p className="text-gray-600 mb-4">
                Forsqa Enterprise offers comprehensive tax advisory services to businesses of all sizes.
                Our team of experienced professionals is dedicated to providing you with the highest quality service.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
                <div className="border border-gray-200 rounded p-4">
                  <h3 className="font-serif text-gray-800 mb-2">Tax Planning</h3>
                  <p className="text-sm text-gray-600">Strategic tax planning for businesses and individuals.</p>
                </div>
                <div className="border border-gray-200 rounded p-4">
                  <h3 className="font-serif text-gray-800 mb-2">Financial Advisory</h3>
                  <p className="text-sm text-gray-600">Expert financial guidance for your business needs.</p>
                </div>
                <div className="border border-gray-200 rounded p-4">
                  <h3 className="font-serif text-gray-800 mb-2">Compliance</h3>
                  <p className="text-sm text-gray-600">Ensuring your business meets all regulatory requirements.</p>
                </div>
              </div>
              
              <p className="text-sm text-gray-500 italic">
                Returning to your regularly scheduled content in a few seconds...
              </p>
            </main>
          </div>
        </motion.div>
      )}
      
      {/* The actual panic button */}
      <motion.button
        className="fixed bottom-4 right-4 bg-red-600 text-white rounded-full p-2 z-50 shadow-lg"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={handlePanic}
        title="Panic Button"
      >
        <AlertCircle className="w-6 h-6" />
      </motion.button>
    </>
  );
};