const config = {
  plugins: {
    "@tailwindcss/postcss": {},
    // Add autoprefixer for better browser support
    autoprefixer: {},
    // Enhanced CSS optimization for production - eliminate render-blocking
    ...(process.env.NODE_ENV === "production" && {
      cssnano: {
        preset: ["default", {
          // Optimize for maximum performance and minimal bundle size
          discardComments: { removeAll: true },
          discardDuplicates: true,
          discardEmpty: true,
          discardOverridden: true,
          discardUnused: { fontFace: false }, // Preserve font faces
          mergeLonghand: true,
          mergeRules: true,
          minifySelectors: true,
          normalizeWhitespace: true,
          normalizeCharset: true,
          normalizeUrl: true,
          orderedValues: true,
          reduceIdents: true,
          uniqueSelectors: true,
          // Color and value optimizations
          colormin: true,
          convertValues: {
            length: true,
            time: true,
            angle: true,
          },
          // Reduce initial values
          reduceInitial: true,
        }],
      },
    }),
  },
};

export default config;
