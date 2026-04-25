/**
 * Centralized Design System Colors for Mexeriqueiro App
 */

export const COLORS = {
  // Brand Colors
  primary: '#eb5b27',      // Bright Orange
  primaryLight: '#e3884d', // Soft Orange
  primaryDark: '#df6445',  // Deep Orange / Border
  primarySupport: '#eabba2', // Muted Orange
  
  // UI Colors
  background: '#FAF6F0',   // Paper / Clean background
  cardBg: '#FFFFFF',       // Pure white for cards
  textDark: '#3A2015',     // Deep brown for contrast
  textMuted: '#666666',    // Soft gray for hints
  textUnselected: '#999999',
  
  // Decorative / Functional
  border: '#E0D8D0',       // Standard border color
  shadow: '#000000',
  
  // Semantic Colors
  success: '#4CAF50',      // Green (Timer 0-50%)
  warning: '#FF9800',      // Yellow/Orange (Timer 51-85%)
  danger: '#F44336',       // Red (Timer 86-100%)
  info: '#2196F3',         // Blue
  
  // Specialized palette for timer (Legacy references)
  timerGreen: '#2ecc71',
  timerYellow: '#f1c40f',
  timerRed: '#e74c3c',

  // Darker shades for button borders (Physical feel)
  buttonBorderDark: '#b94b30',
  buttonBorderSuccess: '#388E3C',
  buttonBorderWarning: '#E65100',
  buttonBorderDanger: '#D32F2F',
  buttonBorderInfo: '#1976D2',
  buttonBorderMuted: '#444444',

  // Aliases for easier migration
  dark: '#df6445',
  light: '#e3884d',
  support: '#eabba2',
};

export const PALETTE = COLORS; 

