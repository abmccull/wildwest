#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { readFileSync } from 'fs';
import { parse } from 'csv-parse/sync';
import { getAllCities, CityData } from '../lib/data-parser';

interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

interface SitemapIndex {
  sitemaps: Array<{
    loc: string;
    lastmod: string;
  }>;
}

interface ServicePageData {
  category: string;
  city: string;
  keyword: string;
  suggestedPageType: string;
  urlSlug: string;
  seoTitle: string;
  h1: string;
  metaDescription: string;
  internalLinkBlockHtml: string;
  jsonLdService: string;
}

class SitemapGenerator {
  private baseUrl: string;
  private outputDir: string;
  private maxUrlsPerSitemap: number = 50000;
  private lastmod: string;

  constructor(baseUrl: string = 'https://wildwestslc.com', outputDir: string = './public') {
    this.baseUrl = baseUrl.replace(/\/$/, ''); // Remove trailing slash
    this.outputDir = outputDir;
    this.lastmod = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
  }

  /**
   * Load and parse the CSV data
   */
  private loadCsvData(): ServicePageData[] {
    try {
      const csvPath = path.join(process.cwd(), 'wildwest_master_seo_matrix.csv');
      const csvContent = readFileSync(csvPath, 'utf8');

      const records = parse(csvContent, {
        columns: true,
        skip_empty_lines: true,
        trim: true,
        relax_quotes: true,
        quote: '"',
        escape: '"',
      });

      const transformedRecords = records.map((record: any) => ({
        category: record['Category']?.trim() || '',
        city: record['City']?.trim() || '',
        keyword: record['Keyword']?.trim() || '',
        suggestedPageType: record['Suggested Page Type']?.trim() || '',
        urlSlug: record['URL Slug']?.trim() || '',
        seoTitle: record['SEO Title']?.trim() || '',
        h1: record['H1']?.trim() || '',
        metaDescription: record['Meta Description']?.trim() || '',
        internalLinkBlockHtml: record['Internal Link Block HTML']?.trim() || '',
        jsonLdService: record['JSON-LD Service']?.trim() || '',
      }));

      console.log(`Loaded ${transformedRecords.length} service records from CSV`);
      return transformedRecords;
    } catch (error) {
      console.warn('CSV file not found or unable to load. Using empty data for sitemap generation.', error);
      // Return empty array to allow build to continue
      // In production, data will come from other sources or APIs
      return [];
    }
  }

  /**
   * Generate all sitemaps and sitemap index
   */
  async generateAll(): Promise<void> {
    console.log('🚀 Starting sitemap generation...');

    try {
      // Ensure output directory exists
      if (!fs.existsSync(this.outputDir)) {
        fs.mkdirSync(this.outputDir, { recursive: true });
      }

      // Generate all sitemap entries
      const allEntries = await this.generateAllEntries();
      console.log(`📊 Generated ${allEntries.length} total URL entries`);

      // Split into multiple sitemaps if needed
      const sitemaps = this.splitIntoSitemaps(allEntries);
      console.log(`📑 Creating ${sitemaps.length} sitemap files`);

      // Generate individual sitemap files
      const sitemapFiles: string[] = [];
      for (let i = 0; i < sitemaps.length; i++) {
        const filename = i === 0 ? 'sitemap.xml' : `sitemap-${i + 1}.xml`;
        await this.generateSitemapFile(sitemaps[i], filename);
        sitemapFiles.push(filename);
        console.log(`✅ Generated ${filename} with ${sitemaps[i].length} URLs`);
      }

      // Generate sitemap index if multiple sitemaps
      if (sitemaps.length > 1) {
        await this.generateSitemapIndex(sitemapFiles);
        console.log('✅ Generated sitemap index');
      }

      console.log('🎉 Sitemap generation completed successfully!');
      console.log(`📍 Sitemaps saved to: ${this.outputDir}`);
    } catch (error) {
      console.error('❌ Error generating sitemaps:', error);
      throw error;
    }
  }

  /**
   * Generate all sitemap entries
   */
  private async generateAllEntries(): Promise<SitemapEntry[]> {
    const entries: SitemapEntry[] = [];

    // Static pages
    entries.push(...this.getStaticPageEntries());

    // City pages
    entries.push(...(await this.getCityPageEntries()));

    // Service pages (city + service combinations)
    entries.push(...(await this.getServicePageEntries()));

    // Category pages (global service categories)
    entries.push(...this.getCategoryPageEntries());

    return entries;
  }

  /**
   * Get static page entries
   */
  private getStaticPageEntries(): SitemapEntry[] {
    const staticPages = [
      { url: '', priority: 1.0, changefreq: 'weekly' as const },
      { url: '/about', priority: 0.8, changefreq: 'monthly' as const },
      { url: '/contact', priority: 0.8, changefreq: 'monthly' as const },
      { url: '/services', priority: 0.9, changefreq: 'weekly' as const },
      { url: '/blog', priority: 0.7, changefreq: 'weekly' as const },
      { url: '/privacy', priority: 0.3, changefreq: 'yearly' as const },
      { url: '/terms', priority: 0.3, changefreq: 'yearly' as const },
    ];

    return staticPages.map((page) => ({
      url: `${this.baseUrl}${page.url}`,
      lastmod: this.lastmod,
      changefreq: page.changefreq,
      priority: page.priority,
    }));
  }

  /**
   * Get city page entries
   */
  private async getCityPageEntries(): Promise<SitemapEntry[]> {
    const cities = getAllCities();

    return cities.map((city: CityData) => ({
      url: `${this.baseUrl}/${city.slug}`,
      lastmod: this.lastmod,
      changefreq: 'weekly' as const,
      priority: 0.8,
    }));
  }

  /**
   * Get service page entries from CSV data
   */
  private async getServicePageEntries(): Promise<SitemapEntry[]> {
    const entries: SitemapEntry[] = [];
    const csvData = this.loadCsvData();

    // Process each service page from CSV
    csvData.forEach((serviceData: ServicePageData) => {
      if (serviceData.urlSlug && serviceData.urlSlug.trim() !== '') {
        // Clean the URL slug to ensure it starts with the base URL
        let cleanUrl = serviceData.urlSlug.trim();

        // Remove leading slash if present
        if (cleanUrl.startsWith('/')) {
          cleanUrl = cleanUrl.substring(1);
        }

        entries.push({
          url: `${this.baseUrl}/${cleanUrl}`,
          lastmod: this.lastmod,
          changefreq: 'monthly' as const,
          priority: 0.7, // Service pages get priority 0.7 as per requirements
        });
      }
    });

    return entries;
  }

  /**
   * Get category page entries (global service categories)
   */
  private getCategoryPageEntries(): SitemapEntry[] {
    const categories = ['flooring', 'demolition', 'junk-removal'];

    return categories.map((category) => ({
      url: `${this.baseUrl}/${category}`,
      lastmod: this.lastmod,
      changefreq: 'weekly' as const,
      priority: 0.9, // Category pages get priority 0.9 as per requirements
    }));
  }

  /**
   * Split entries into multiple sitemaps if needed
   */
  private splitIntoSitemaps(entries: SitemapEntry[]): SitemapEntry[][] {
    const sitemaps: SitemapEntry[][] = [];

    for (let i = 0; i < entries.length; i += this.maxUrlsPerSitemap) {
      sitemaps.push(entries.slice(i, i + this.maxUrlsPerSitemap));
    }

    return sitemaps;
  }

  /**
   * Generate individual sitemap XML file
   */
  private async generateSitemapFile(entries: SitemapEntry[], filename: string): Promise<void> {
    const xml = this.generateSitemapXML(entries);
    const filePath = path.join(this.outputDir, filename);

    fs.writeFileSync(filePath, xml, 'utf8');
  }

  /**
   * Generate sitemap XML content
   */
  private generateSitemapXML(entries: SitemapEntry[]): string {
    const urlsXml = entries
      .map(
        (entry) => `
  <url>
    <loc>${this.escapeXml(entry.url)}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority.toFixed(1)}</priority>
  </url>`
      )
      .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">${urlsXml}
</urlset>`;
  }

  /**
   * Generate sitemap index file
   */
  private async generateSitemapIndex(sitemapFiles: string[]): Promise<void> {
    const sitemapsXml = sitemapFiles
      .map(
        (filename) => `
  <sitemap>
    <loc>${this.baseUrl}/${filename}</loc>
    <lastmod>${this.lastmod}</lastmod>
  </sitemap>`
      )
      .join('');

    const indexXml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
              http://www.sitemaps.org/schemas/sitemap/0.9/siteindex.xsd">${sitemapsXml}
</sitemapindex>`;

    const indexPath = path.join(this.outputDir, 'sitemap-index.xml');
    fs.writeFileSync(indexPath, indexXml, 'utf8');
  }

  /**
   * Escape XML special characters
   */
  private escapeXml(str: string): string {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }

  /**
   * Validate sitemap XML
   */
  static validateSitemap(xmlContent: string): boolean {
    try {
      // Basic validation - check for required elements
      const hasUrlset = xmlContent.includes('<urlset');
      const hasUrls = xmlContent.includes('<url>');
      const hasLoc = xmlContent.includes('<loc>');

      return hasUrlset && hasUrls && hasLoc;
    } catch (error) {
      console.error('Sitemap validation error:', error);
      return false;
    }
  }
}

/**
 * CLI execution
 */
async function main() {
  const args = process.argv.slice(2);
  const baseUrl = args[0] || process.env.NEXT_PUBLIC_SITE_URL || 'https://wildwestslc.com';
  const outputDir = args[1] || './public';

  console.log(`🌐 Base URL: ${baseUrl}`);
  console.log(`📁 Output Directory: ${outputDir}`);

  const generator = new SitemapGenerator(baseUrl, outputDir);

  try {
    await generator.generateAll();

    // Validate generated sitemap
    const sitemapPath = path.join(outputDir, 'sitemap.xml');
    if (fs.existsSync(sitemapPath)) {
      const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
      const isValid = SitemapGenerator.validateSitemap(sitemapContent);
      console.log(`✅ Sitemap validation: ${isValid ? 'PASSED' : 'FAILED'}`);
    }

    process.exit(0);
  } catch (error) {
    console.error('❌ Sitemap generation failed:', error);
    process.exit(1);
  }
}

// Export for programmatic use
export { SitemapGenerator };

// Run if called directly
if (require.main === module) {
  main();
}
