const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    // Add autoprefixer for better browser support
    autoprefixer: {
      grid: 'autoplace',
      flexbox: 'no-2009',
    },
    // Enhanced CSS optimization for production - eliminate render-blocking
    ...(process.env.NODE_ENV === "production" && {
      cssnano: {
        preset: ["default", {
          // Optimize for maximum performance and minimal bundle size
          discardComments: { removeAll: true },
          discardDuplicates: true,
          discardEmpty: true,
          discardOverridden: true,
          discardUnused: { 
            fontFace: false, // Preserve font faces
            keyframes: false, // Preserve keyframes for animations
          },
          mergeLonghand: true,
          mergeRules: true,
          minifySelectors: true,
          normalizeWhitespace: true,
          normalizeCharset: true,
          normalizeUrl: {
            stripWWW: false,
          },
          orderedValues: true,
          reduceIdents: true,
          uniqueSelectors: true,
          // Color and value optimizations
          colormin: {
            legacy: true,
          },
          convertValues: {
            length: true,
            time: true,
            angle: true,
          },
          // Reduce initial values
          reduceInitial: true,
          // Safe transforms only
          safe: true,
          // Critical rendering path optimization
          normalizeUnicode: true,
        }],
      },
    }),
  },
};

export default config;
