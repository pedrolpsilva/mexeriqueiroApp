/**
 * Centralized Design System Colors for Mexeriqueiro App
 */

export const COLORS = {
  // Brand Colors
  primary: '#E7373A',       // Vibrant Red from the home icon
  primaryLight: '#EE676A',  // Soft Red
  primaryDark: '#B91C1C',   // Deep Red / Border
  primarySupport: '#F8B4B6', // Muted/Pastel Red
  
  // UI Colors
  background: '#FFF8F8',   // Warm white with slight red tint
  cardBg: '#FFFFFF',       // Pure white for cards
  textDark: '#2A0808',     // Deep red-brown for contrast
  textMuted: '#666666',    // Soft gray for hints
  textUnselected: '#999999',
  
  // Decorative / Functional
  border: '#EDD8D8',       // Warm pinkish border
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
  buttonBorderDark: '#8B1414',
  buttonBorderSuccess: '#388E3C',
  buttonBorderWarning: '#E65100',
  buttonBorderDanger: '#D32F2F',
  buttonBorderInfo: '#1976D2',
  buttonBorderMuted: '#444444',

  // Aliases for easier migration
  dark: '#B91C1C',
  light: '#EE676A',
  support: '#F8B4B6',
};

export const PALETTE = COLORS; 

