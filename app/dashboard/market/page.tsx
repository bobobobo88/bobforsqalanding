"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { TerminalWindow } from '@/components/terminal/TerminalWindow';
import { NeonButton } from '@/components/ui/neon-button';
import { Tooltip } from '@/components/ui/tooltip';

interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  action: string;
  errorMessage: string;
  tooltipMessage: string;
}

export default function Market() {
  const [products] = useState<Product[]>([
    {
      id: 'product-001',
      name: 'Untraceable USB',
      price: 'Ƀ0.004',
      description: 'A USB drive that deletes itself if you look at it wrong.',
      action: 'BUY',
      errorMessage: 'Purchase intercepted by Interpol. Your location is definitely not being tracked.',
      tooltipMessage: 'Made in China, but we slapped a "Unhackable" sticker on it'
    },
    {
      id: 'product-002',
      name: 'AI Xanax (v0.9)',
      price: 'FREE',
      description: 'Makes your neural networks calm down when they get too excited.',
      action: 'TRY',
      errorMessage: 'Trial version crashed. AI is now writing poetry about existential dread.',
      tooltipMessage: 'Side effects may include AI becoming too chill to function'
    },
    {
      id: 'product-003',
      name: 'Toaster Exploit',
      price: '$12.00',
      description: 'Make your toaster mine cryptocurrency while you make breakfast.',
      action: 'BUY',
      errorMessage: 'Transaction failed. Your toaster has rejected your authority.',
      tooltipMessage: 'May void warranty and/or burn your house down'
    },
    {
      id: 'product-004',
      name: 'Deepfaked Resume Generator',
      price: '$3.33',
      description: 'Generate a career history so impressive even you\'ll believe it.',
      action: 'STEAL',
      errorMessage: 'Theft failed. You\'ve accidentally applied to 47 jobs at FBI Cybercrime division.',
      tooltipMessage: 'Our AI confused "work experience" with "criminal record"'
    }
  ]);
  
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showError, setShowError] = useState(false);
  
  const handleProductAction = (product: Product) => {
    setSelectedProduct(product);
    setShowError(true);
    
    // Auto-dismiss after 4 seconds
    setTimeout(() => {
      setSelectedProduct(null);
      setShowError(false);
    }, 4000);
  };

  return (
    <DashboardLayout>
      <div className="mb-6">
        <motion.h1 
          className="text-2xl md:text-3xl font-bold text-primary mb-2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          SYNDICATE MARKET
        </motion.h1>
        <motion.p 
          className="text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          All transactions are fake. All products are fictional. No actual purchases possible.
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <TerminalWindow className="w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="border-b border-primary/30">
                <tr>
                  <th className="py-3 pr-6 text-primary">PRODUCT</th>
                  <th className="py-3 pr-6 text-primary">DESCRIPTION</th>
                  <th className="py-3 pr-6 text-primary">PRICE</th>
                  <th className="py-3 text-primary">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/10">
                {products.map((product, index) => (
                  <motion.tr 
                    key={product.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.1 }}
                    className="group hover:bg-primary/5"
                  >
                    <Tooltip content={product.tooltipMessage}>
                      <td className="py-4 pr-6 group-hover:text-primary">
                        {product.name}
                      </td>
                    </Tooltip>
                    <td className="py-4 pr-6 text-muted-foreground text-sm max-w-xs">
                      {product.description}
                    </td>
                    <td className="py-4 pr-6">
                      <span className={product.price === 'FREE' ? 'text-green-400' : 'text-secondary'}>
                        {product.price}
                      </span>
                    </td>
                    <td className="py-4">
                      <NeonButton
                        onClick={() => handleProductAction(product)}
                        variant={product.action === 'STEAL' ? 'accent' : 'primary'}
                        className="text-sm py-1"
                      >
                        {product.action}
                      </NeonButton>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </TerminalWindow>
      </motion.div>
      
      {/* Error Modal */}
      {selectedProduct && showError && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            setSelectedProduct(null);
            setShowError(false);
          }}
        >
          <motion.div
            className="w-full max-w-md"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            onClick={e => e.stopPropagation()}
          >
            <TerminalWindow 
              title="market@error:~"
              variant="error"
            >
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="text-red-500 mr-2">&gt;</span>
                  <span className="text-red-500">ACTION FAILED</span>
                </div>
                
                <div className="flex items-center">
                  <span className="text-red-500 mr-2">&gt;</span>
                  <span>{selectedProduct.errorMessage}</span>
                </div>
                
                <motion.div 
                  className="p-2 border border-red-500/30 bg-red-500/10 rounded text-center"
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ repeat: 3, duration: 0.5 }}
                >
                  AUTO-DISMISSING FOR SECURITY...
                </motion.div>
              </div>
            </TerminalWindow>
          </motion.div>
        </motion.div>
      )}
    </DashboardLayout>
  );
}