'use client';

import React from 'react';
import Link from 'next/link';
import { CategoryHeroProps } from '../../lib/types/category.types';

const CategoryHero: React.FC<CategoryHeroProps> = ({ category, backgroundImage }) => {
  return (
    <section className="relative bg-gradient-to-r from-primary to-secondary py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJtMzYgMzQgMC02aC0ydjZoLTZ2Mmg2djZoMnYtNmg2di0yaC02eiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
      </div>

      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Category Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-serif">
            {category.title}
          </h1>

          {/* Category Description */}
          <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto">
            {category.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/booking"
              className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-primary font-bold py-4 px-8 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
              aria-label={`Book ${category.name.toLowerCase()} services now`}
            >
              Get Free Quote
            </Link>

            <a
              href="tel:+18016914065"
              className="w-full sm:w-auto bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 border border-white/20 hover:border-white/40"
              aria-label="Call Wild West Construction for immediate assistance"
            >
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                Call Now: (801) 691-4065
              </span>
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 opacity-20 hidden lg:block">
        <div className="w-32 h-32 border-2 border-accent rounded-full"></div>
      </div>
      <div className="absolute top-1/4 right-8 transform -translate-y-1/2 opacity-20 hidden lg:block">
        <div className="w-20 h-20 border-2 border-accent rounded-full"></div>
      </div>
      <div className="absolute bottom-1/4 left-1/4 transform opacity-20 hidden lg:block">
        <div className="w-16 h-16 border-2 border-accent rounded-full"></div>
      </div>
    </section>
  );
};

export default CategoryHero;
