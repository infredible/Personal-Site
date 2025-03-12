import React from 'react';

interface SafeAreaProps {
  children: React.ReactNode;
}

export function SafeArea({ children }: SafeAreaProps) {
  return (
    <div className="safe-area">
      {children}
    </div>
  );
} 