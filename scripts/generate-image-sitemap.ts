#!/usr/bin/env ts-node

import * as fs from 'fs';
import * as path from 'path';
import { glob } from 'glob';

interface ImageEntry {
  loc: string; // Page URL where image appears
  images: Array<{
    loc: string; // Image URL
    title?: string;
    caption?: string;
    geo_location?: string;
    license?: string;
  }>;
}

class ImageSitemapGenerator {
  private baseUrl: string;
  private outputDir: string;
  private lastmod: string;

  constructor(baseUrl: string = 'https://wildwestslc.com', outputDir: string = './public') {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.outputDir = outputDir;
    this.lastmod = new Date().toISOString().split('T')[0];
  }

  /**
   * Generate image sitemap
   */
  async generateImageSitemap(): Promise<void> {
    console.log('🖼️ Starting image sitemap generation...');

    try {
      const imageEntries = await this.findAllImages();

      if (imageEntries.length === 0) {
        console.log('No images found to include in sitemap');
        return;
      }

      const xml = this.generateImageSitemapXML(imageEntries);
      const filePath = path.join(this.outputDir, 'sitemap-images.xml');

      fs.writeFileSync(filePath, xml, 'utf8');
      console.log(`✅ Generated image sitemap with ${imageEntries.length} entries`);
      console.log(`📍 Image sitemap saved to: ${filePath}`);
    } catch (error) {
      console.error('❌ Error generating image sitemap:', error);
      throw error;
    }
  }

  /**
   * Find all images in the public directory
   */
  private async findAllImages(): Promise<ImageEntry[]> {
    const imageEntries: ImageEntry[] = [];

    // Define image patterns to search for
    const imagePatterns = [
      'public/**/*.{jpg,jpeg,png,gif,webp,svg}',
      'public/images/**/*.{jpg,jpeg,png,gif,webp,svg}',
    ];

    // Service pages with potential images
    const servicePages = [
      { url: '/flooring', title: 'Flooring Services' },
      { url: '/demolition', title: 'Demolition Services' },
      { url: '/junk-removal', title: 'Junk Removal Services' },
    ];

    // Add homepage images
    const homepageEntry: ImageEntry = {
      loc: this.baseUrl,
      images: [
        {
          loc: `${this.baseUrl}/og-image.jpg`,
          title: 'Wild West Construction - Professional Building Services',
          caption: "Utah's trusted construction experts for flooring, demolition, and junk removal",
        },
        {
          loc: `${this.baseUrl}/logo.png`,
          title: 'Wild West Construction Logo',
        },
      ],
    };
    imageEntries.push(homepageEntry);

    // Add service page images
    for (const page of servicePages) {
      const entry: ImageEntry = {
        loc: `${this.baseUrl}${page.url}`,
        images: [
          {
            loc: `${this.baseUrl}/images/${page.url.substring(1)}-hero.jpg`,
            title: `${page.title} Hero Image`,
            caption: `Professional ${page.title.toLowerCase()} in Salt Lake County, Utah`,
            geo_location: 'Salt Lake City, Utah, USA',
          },
          {
            loc: `${this.baseUrl}/images/${page.url.substring(1)}-gallery-1.jpg`,
            title: `${page.title} Gallery`,
            caption: `Examples of our ${page.title.toLowerCase()} work`,
            geo_location: 'Salt Lake County, Utah, USA',
          },
        ],
      };
      imageEntries.push(entry);
    }

    return imageEntries;
  }

  /**
   * Generate image sitemap XML content
   */
  private generateImageSitemapXML(entries: ImageEntry[]): string {
    const urlsXml = entries
      .map((entry) => {
        const imagesXml = entry.images
          .map(
            (img) => `
      <image:image>
        <image:loc>${this.escapeXml(img.loc)}</image:loc>${
          img.title ? `\n        <image:title>${this.escapeXml(img.title)}</image:title>` : ''
        }${
          img.caption
            ? `\n        <image:caption>${this.escapeXml(img.caption)}</image:caption>`
            : ''
        }${
          img.geo_location
            ? `\n        <image:geo_location>${this.escapeXml(img.geo_location)}</image:geo_location>`
            : ''
        }${
          img.license
            ? `\n        <image:license>${this.escapeXml(img.license)}</image:license>`
            : ''
        }
      </image:image>`
          )
          .join('');

        return `
  <url>
    <loc>${this.escapeXml(entry.loc)}</loc>${imagesXml}
  </url>`;
      })
      .join('');

    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd
        http://www.google.com/schemas/sitemap-image/1.1
        http://www.google.com/schemas/sitemap-image/1.1/sitemap-image.xsd">${urlsXml}
</urlset>`;
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
}

/**
 * Video Sitemap Generator
 */
class VideoSitemapGenerator {
  private baseUrl: string;
  private outputDir: string;

  constructor(baseUrl: string = 'https://wildwestslc.com', outputDir: string = './public') {
    this.baseUrl = baseUrl.replace(/\/$/, '');
    this.outputDir = outputDir;
  }

  /**
   * Generate video sitemap
   */
  async generateVideoSitemap(): Promise<void> {
    console.log('🎥 Starting video sitemap generation...');

    const videoEntries = this.getVideoEntries();

    if (videoEntries.length === 0) {
      console.log('No videos configured for sitemap');
      return;
    }

    const xml = this.generateVideoSitemapXML(videoEntries);
    const filePath = path.join(this.outputDir, 'sitemap-videos.xml');

    fs.writeFileSync(filePath, xml, 'utf8');
    console.log(`✅ Generated video sitemap with ${videoEntries.length} entries`);
    console.log(`📍 Video sitemap saved to: ${filePath}`);
  }

  /**
   * Get video entries (placeholder for actual video content)
   */
  private getVideoEntries(): any[] {
    // Placeholder for video entries
    // In a real scenario, this would scan for video content
    return [];
  }

  /**
   * Generate video sitemap XML
   */
  private generateVideoSitemapXML(entries: any[]): string {
    // Video sitemap XML generation logic
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <!-- Video entries would go here -->
</urlset>`;
  }
}

/**
 * CLI execution
 */
async function main() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://wildwestslc.com';
  const outputDir = './public';

  console.log(`🌐 Base URL: ${baseUrl}`);
  console.log(`📁 Output Directory: ${outputDir}`);

  // Generate image sitemap
  const imageSitemapGenerator = new ImageSitemapGenerator(baseUrl, outputDir);
  await imageSitemapGenerator.generateImageSitemap();

  // Generate video sitemap (if videos exist)
  const videoSitemapGenerator = new VideoSitemapGenerator(baseUrl, outputDir);
  await videoSitemapGenerator.generateVideoSitemap();

  console.log('🎉 Media sitemap generation completed!');
}

// Export for programmatic use
export { ImageSitemapGenerator, VideoSitemapGenerator };

// Run if called directly
if (require.main === module) {
  main().catch(console.error);
}
