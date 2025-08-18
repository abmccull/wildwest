/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Legacy colors for backward compatibility
        primary: '#7C5035',      // Deep Saddle Brown - original
        secondary: '#C59D5F',    // Wheat Gold - original
        accent: '#D4AF37',       // Metallic Gold - original
        background: '#f7f1e3',   // Ivory - for existing components
        'text-dark': '#333333',
        'text-light': '#FFFFFF',
        // Brand Colors - Trust & Action
        brand: {
          primary: '#1e40af',   // Deep Blue - Trust/Reliability
          secondary: '#059669',  // Green - Success/Action
          accent: '#dc2626',     // Red - Urgency/Limited
          warning: '#f59e0b',    // Amber - Attention/Ratings
          info: '#3b82f6',       // Sky Blue - Information
          dark: '#1f2937',       // Charcoal - Text
          light: '#f9fafb',      // Off-white - Background
        },
        // Semantic Colors
        cta: {
          DEFAULT: '#059669',
          hover: '#047857',
          urgent: '#dc2626',
          'urgent-hover': '#b91c1c',
        },
        trust: {
          DEFAULT: '#1e40af',
          light: '#3b82f6',
          dark: '#1e3a8a',
        },
        rating: '#f59e0b',
        success: '#10b981',
        error: '#ef4444',
      },
      fontFamily: {
        display: ['Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        // Mobile-first responsive sizing with clamp
        'xs-responsive': 'clamp(0.75rem, 2.5vw, 0.875rem)',
        'sm-responsive': 'clamp(0.875rem, 3vw, 1rem)',
        'base-responsive': 'clamp(1rem, 3.5vw, 1.125rem)',
        'lg-responsive': 'clamp(1.125rem, 4vw, 1.25rem)',
        'xl-responsive': 'clamp(1.25rem, 4.5vw, 1.5rem)',
        '2xl-responsive': 'clamp(1.5rem, 5vw, 2rem)',
        '3xl-responsive': 'clamp(2rem, 6vw, 3rem)',
        '4xl-responsive': 'clamp(2.5rem, 7vw, 4rem)',
        '5xl-responsive': 'clamp(3rem, 8vw, 5rem)',
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        'header': '64px',
        'mobile-cta': '72px',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-top': 'env(safe-area-inset-top)',
      },
      maxWidth: {
        'container': '1280px',
        'content': '1024px',
        'narrow': '768px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
        'fade-in': 'fadeIn 0.5s ease-in',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'urgency-pulse': 'urgencyPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        urgencyPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.05)', opacity: '0.9' },
        },
      },
      boxShadow: {
        'trust': '0 4px 14px 0 rgba(30, 64, 175, 0.15)',
        'cta': '0 4px 14px 0 rgba(5, 150, 105, 0.2)',
        'urgent': '0 4px 14px 0 rgba(220, 38, 38, 0.25)',
        'float': '0 10px 40px rgba(0, 0, 0, 0.15)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
      },
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)',
        'trust-gradient': 'linear-gradient(135deg, #1e40af 0%, #059669 100%)',
        'cta-gradient': 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        'urgent-gradient': 'linear-gradient(135deg, #dc2626 0%, #f59e0b 100%)',
      },
      gridTemplateColumns: {
        'auto-fit-200': 'repeat(auto-fit, minmax(200px, 1fr))',
        'auto-fit-250': 'repeat(auto-fit, minmax(250px, 1fr))',
        'auto-fit-300': 'repeat(auto-fit, minmax(300px, 1fr))',
      },
      zIndex: {
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'notification': '1080',
      },
      screens: {
        'xs': '475px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
};
