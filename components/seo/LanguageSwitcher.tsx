/**
 * Language Switcher Component
 * Provides language selection between English and Spanish with proper hreflang implementation
 */

'use client';

import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';

interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

const SUPPORTED_LANGUAGES: Language[] = [
  {
    code: 'en',
    name: 'English',
    flag: '🇺🇸',
    nativeName: 'English'
  },
  {
    code: 'es',
    name: 'Spanish',
    flag: '🇪🇸',
    nativeName: 'Español'
  }
];

interface LanguageSwitcherProps {
  currentLang?: string;
  className?: string;
  variant?: 'dropdown' | 'inline';
  showFlags?: boolean;
}

export function LanguageSwitcher({ 
  currentLang = 'en',
  className = '',
  variant = 'dropdown',
  showFlags = true 
}: LanguageSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  // Extract the current path without language prefix
  const getPathWithoutLang = (path: string) => {
    const langPrefixes = SUPPORTED_LANGUAGES.map(lang => `/${lang.code}`);
    for (const prefix of langPrefixes) {
      if (path.startsWith(prefix)) {
        return path.substring(prefix.length) || '/';
      }
    }
    return path;
  };

  // Generate URL for different language
  const getLocalizedUrl = (langCode: string) => {
    const pathWithoutLang = getPathWithoutLang(pathname);
    return langCode === 'en' ? pathWithoutLang : `/${langCode}${pathWithoutLang}`;
  };

  const currentLanguage = SUPPORTED_LANGUAGES.find(lang => lang.code === currentLang) || SUPPORTED_LANGUAGES[0];
  const otherLanguages = SUPPORTED_LANGUAGES.filter(lang => lang.code !== currentLang);

  if (variant === 'inline') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        {SUPPORTED_LANGUAGES.map((language) => (
          <Link
            key={language.code}
            href={getLocalizedUrl(language.code)}
            className={`px-3 py-1 rounded text-sm transition-colors ${
              language.code === currentLang
                ? 'bg-primary text-white'
                : 'text-gray-600 hover:text-primary hover:bg-gray-100'
            }`}
            hrefLang={language.code}
          >
            {showFlags && <span className="mr-1">{language.flag}</span>}
            {language.nativeName}
          </Link>
        ))}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Current Language Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
        aria-expanded={isOpen}
        aria-haspopup={true}
      >
        {showFlags && <span>{currentLanguage.flag}</span>}
        <span>{currentLanguage.nativeName}</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-50">
          <div className="py-1">
            {otherLanguages.map((language) => (
              <Link
                key={language.code}
                href={getLocalizedUrl(language.code)}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
                hrefLang={language.code}
              >
                {showFlags && <span>{language.flag}</span>}
                <div>
                  <div className="font-medium">{language.nativeName}</div>
                  <div className="text-xs text-gray-500">{language.name}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

/**
 * Hook for managing language-specific functionality
 */
export function useLanguage() {
  const pathname = usePathname();
  
  const getCurrentLanguage = (): string => {
    const langPrefixes = SUPPORTED_LANGUAGES.map(lang => `/${lang.code}`);
    for (const prefix of langPrefixes) {
      if (pathname.startsWith(prefix)) {
        return prefix.substring(1);
      }
    }
    return 'en'; // Default language
  };

  const getTranslatedPath = (langCode: string, path?: string): string => {
    const targetPath = path || pathname;
    const currentLang = getCurrentLanguage();
    
    // Remove current language prefix
    let cleanPath = targetPath;
    if (currentLang !== 'en') {
      cleanPath = targetPath.replace(`/${currentLang}`, '') || '/';
    }
    
    // Add new language prefix (except for English)
    return langCode === 'en' ? cleanPath : `/${langCode}${cleanPath}`;
  };

  const isRTL = (): boolean => {
    const rtlLanguages = ['ar', 'he', 'fa', 'ur'];
    return rtlLanguages.includes(getCurrentLanguage());
  };

  return {
    currentLanguage: getCurrentLanguage(),
    getTranslatedPath,
    isRTL,
    supportedLanguages: SUPPORTED_LANGUAGES
  };
}

export default LanguageSwitcher;