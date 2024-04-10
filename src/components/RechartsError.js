"use client"

import React, { useEffect } from 'react';

export const TurnOffDefaultPropsWarning = () => {
  useEffect(() => {
    const originalConsoleError = console.error;

    console.error = (...args) => {
      // More robust check for defaultProps warning
      if (typeof args[0] === 'string' && args[0].includes('defaultProps')) {
        return;
      }

      originalConsoleError(...args);
    };

    return () => {
      console.error = originalConsoleError;
    };
  }, []);

  return null;
};