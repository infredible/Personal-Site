'use client';

import { useEffect } from 'react';
import { useTheme } from 'next-themes';

export function SafariThemeHelper() {
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    // Update Safari's theme color when theme changes
    if (resolvedTheme === 'dark') {
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#222');
    } else {
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#F9F9F9');
    }
  }, [resolvedTheme]);

  return null;
} 