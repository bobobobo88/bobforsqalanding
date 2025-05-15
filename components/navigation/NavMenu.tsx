"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const navItems = [
  { name: 'OPERATIONS', path: '/dashboard/operations' },
  { name: 'MARKET', path: '/dashboard/market' },
  { name: 'COMMS', path: '/dashboard/comms' },
  { name: 'LOGS', path: '/dashboard/logs' },
];

export const NavMenu: React.FC = () => {
  const pathname = usePathname();

  return (
    <nav className="flex justify-center items-center w-full mt-8">
      <div className="flex space-x-1 md:space-x-2 lg:space-x-8 text-sm md:text-base">
        {navItems.map((item, index) => (
          <Link 
            key={item.path} 
            href={item.path}
          >
            <motion.div
              className={cn(
                "px-3 py-2 terminal-text relative tracking-widest",
                pathname === item.path ? "text-primary" : "text-muted-foreground hover:text-primary/80"
              )}
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <span className="mr-2">&#91;</span>
              {item.name}
              <span className="ml-2">&#93;</span>
              {pathname === item.path && (
                <motion.div
                  className="absolute bottom-0 left-0 h-0.5 w-full bg-primary"
                  layoutId="activeNav"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                />
              )}
            </motion.div>
          </Link>
        ))}
      </div>
    </nav>
  );
};