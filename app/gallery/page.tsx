import Link from "next/link";
import { Suspense } from "react";
import { Metadata } from "next";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Project Gallery | Wild West Construction Utah",
  description:
    "View our completed construction projects throughout Utah. See quality flooring installations, demolition work, and junk removal services. Licensed contractors with proven results.",
  openGraph: {
    title: "Project Gallery | Wild West Construction Utah",
    description:
      "View our completed construction projects throughout Utah. See quality flooring installations, demolition work, and junk removal services. Licensed contractors with proven results.",
    url: "https://wildwestslc.com/gallery",
    siteName: "Wild West Construction",
    images: [
      {
        url: "https://wildwestslc.com/images/gallery-hero.jpg",
        width: 1200,
        height: 630,
        alt: "Wild West Construction completed projects gallery",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Gallery | Wild West Construction Utah",
    description:
      "View our completed construction projects throughout Utah. See quality flooring installations, demolition work, and junk removal services. Licensed contractors with proven results.",
    images: ["https://wildwestslc.com/images/gallery-hero.jpg"],
  },
  alternates: {
    canonical: "https://wildwestslc.com/gallery",
  },
};

// Project data for the gallery
const projectCategories = [
  {
    id: "flooring",
    name: "Flooring Projects",
    description: "Professional flooring installations throughout Utah",
    icon: "flooring",
    color: "green",
  },
  {
    id: "demolition",
    name: "Demolition Projects",
    description: "Safe and efficient demolition services",
    icon: "demolition",
    color: "blue",
  },
  {
    id: "junk-removal",
    name: "Junk Removal",
    description: "Complete cleanout and debris removal services",
    icon: "junk",
    color: "red",
  },
];

const projects = [
  // Flooring Projects
  {
    id: 1,
    title: "Luxury Hardwood Installation - Salt Lake City",
    category: "flooring",
    location: "Salt Lake City, UT",
    description: "Complete hardwood floor installation in a 2,500 sq ft home. Brazilian cherry hardwood with custom stain and polyurethane finish.",
    features: ["2,500 sq ft", "Brazilian Cherry", "Custom Stain", "3-day installation"],
  },
  {
    id: 2,
    title: "Hardwood Refinishing - West Valley",
    category: "flooring",
    location: "West Valley City, UT",
    description: "Restored 60-year-old oak floors to their original beauty. Complete sanding, staining, and polyurethane application.",
    features: ["1,800 sq ft", "Oak Restoration", "Water Damage Repair", "Historic Home"],
  },
  {
    id: 3,
    title: "LVP Living Room Transformation - Murray",
    category: "flooring",
    location: "Murray, UT",
    description: "Modern luxury vinyl plank installation with waterproof underlayment. Perfect for high-traffic family areas.",
    features: ["1,200 sq ft", "Waterproof LVP", "Sound Barrier", "Pet-Friendly"],
  },
  {
    id: 4,
    title: "Engineered Hardwood - Draper",
    category: "flooring",
    location: "Draper, UT",
    description: "Premium engineered hardwood throughout main level. Wire-brushed texture with natural oil finish.",
    features: ["2,000 sq ft", "Engineered Oak", "Wire-Brushed", "Oil Finish"],
  },
  {
    id: 5,
    title: "Commercial Flooring - Sandy Office",
    category: "flooring",
    location: "Sandy, UT",
    description: "Professional office flooring installation. High-durability laminate with sound dampening for busy workspace.",
    features: ["3,500 sq ft", "Commercial Grade", "Sound Dampening", "Weekend Install"],
  },
  {
    id: 6,
    title: "Tile to Hardwood Conversion - Orem",
    category: "flooring",
    location: "Orem, UT",
    description: "Removed ceramic tile and installed beautiful oak hardwood. Subfloor repair and leveling included.",
    features: ["1,400 sq ft", "Tile Removal", "Subfloor Repair", "Oak Installation"],
  },
  
  // Demolition Projects
  {
    id: 7,
    title: "Kitchen Demolition - West Jordan",
    category: "demolition",
    location: "West Jordan, UT",
    description: "Complete kitchen demolition for major renovation. Safe removal of cabinets, flooring, and non-load bearing walls.",
    features: ["Full Kitchen Demo", "Cabinet Removal", "Flooring Removal", "Wall Removal"],
  },
  {
    id: 8,
    title: "Basement Finishing Demo - Taylorsville",
    category: "demolition",
    location: "Taylorsville, UT",
    description: "Basement demolition to prepare for complete finishing. Drywall removal and debris hauling included.",
    features: ["1,000 sq ft Basement", "Drywall Removal", "Debris Hauling", "Utility Protection"],
  },
  {
    id: 9,
    title: "Bathroom Demolition - Layton",
    category: "demolition",
    location: "Layton, UT",
    description: "Master bathroom demolition for luxury remodel. Careful tile and fixture removal with plumbing protection.",
    features: ["Master Bath", "Tile Removal", "Fixture Removal", "Plumbing Safe"],
  },
  {
    id: 10,
    title: "Deck Demolition - Bountiful",
    category: "demolition",
    location: "Bountiful, UT",
    description: "Complete deck demolition and disposal. Safe removal of old structure to prepare for new construction.",
    features: ["24x16 ft Deck", "Structure Removal", "Foundation Prep", "Complete Cleanup"],
  },
  
  // Junk Removal Projects
  {
    id: 11,
    title: "Estate Cleanout - Cottonwood Heights",
    category: "junk-removal",
    location: "Cottonwood Heights, UT",
    description: "Complete estate cleanout including furniture, appliances, and personal items. Respectful and efficient service.",
    features: ["Full House Cleanout", "Furniture Removal", "Appliance Pickup", "Donation Sorting"],
  },
  {
    id: 12,
    title: "Construction Debris Removal - Riverton",
    category: "junk-removal",
    location: "Riverton, UT",
    description: "Construction site cleanup after major renovation. Drywall, flooring, and material debris removal.",
    features: ["Construction Debris", "Drywall Cleanup", "Material Removal", "Site Cleanup"],
  },
];

// Before/After comparison data
const beforeAfterProjects = [
  {
    id: 1,
    title: "Hardwood Floor Restoration - Historic Home",
    location: "Salt Lake City, UT",
    beforeDescription: "Water-damaged oak floors with deep scratches and worn finish",
    afterDescription: "Restored to original beauty with custom stain and protective finish",
    category: "flooring",
  },
  {
    id: 2,
    title: "Kitchen Demolition and Prep",
    location: "West Valley City, UT",
    beforeDescription: "Outdated kitchen with damaged cabinets and old flooring",
    afterDescription: "Clean, prepared space ready for beautiful renovation",
    category: "demolition",
  },
  {
    id: 3,
    title: "Basement Cleanout Transformation",
    location: "Murray, UT",
    beforeDescription: "Cluttered basement filled with years of stored items",
    afterDescription: "Clean, empty space ready for finishing and family use",
    category: "junk-removal",
  },
];

export default function GalleryPage() {
  return (
    <>
      <Header />

      <main>
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-green-700 text-white py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Project
                <span className="block text-yellow-400">Gallery</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                Explore our completed construction projects throughout Utah. From stunning floor installations to complete demolitions, see the quality and craftsmanship that makes Wild West Construction Utah&apos;s trusted choice.
              </p>

              <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <Link
                  href="#project-gallery"
                  className="inline-block px-8 py-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition-colors duration-200 text-center text-lg"
                >
                  View Projects
                </Link>
                <a
                  href="tel:+1-801-691-4065"
                  data-source="gallery_hero"
                  data-service-type="general"
                  className="px-8 py-4 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-900 transition-colors duration-200 text-center text-lg"
                >
                  Call (801) 691-4065
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center items-center space-x-8 mt-8 text-blue-200">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm">Licensed & Insured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  <span className="text-sm">150+ Completed Projects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm">20+ Years Experience</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Categories */}
        <section className="py-16 bg-white" id="categories">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Our Construction Services
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Explore our completed projects by service category. Each project showcases our commitment to quality, safety, and customer satisfaction.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projectCategories.map((category) => (
                <div
                  key={category.id}
                  className="bg-white rounded-lg shadow-construction hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <div className={`h-2 bg-gradient-to-r ${
                    category.color === 'green' ? 'from-green-500 to-green-600' :
                    category.color === 'blue' ? 'from-blue-500 to-blue-600' :
                    'from-red-500 to-red-600'
                  }`}></div>
                  <div className="p-6">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      category.color === 'green' ? 'bg-green-100' :
                      category.color === 'blue' ? 'bg-blue-100' :
                      'bg-red-100'
                    }`}>
                      {category.icon === 'flooring' && (
                        <svg className={`w-6 h-6 ${category.color === 'green' ? 'text-green-600' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10" />
                        </svg>
                      )}
                      {category.icon === 'demolition' && (
                        <svg className={`w-6 h-6 ${category.color === 'blue' ? 'text-blue-600' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      )}
                      {category.icon === 'junk' && (
                        <svg className={`w-6 h-6 ${category.color === 'red' ? 'text-red-600' : 'text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {category.description}
                    </p>
                    <Link
                      href={`#${category.id}-projects`}
                      className={`inline-flex items-center space-x-1 font-medium ${
                        category.color === 'green' ? 'text-green-600 hover:text-green-700' :
                        category.color === 'blue' ? 'text-blue-600 hover:text-blue-700' :
                        'text-red-600 hover:text-red-700'
                      } transition-colors duration-200`}
                    >
                      <span>View Projects</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Gallery */}
        <section className="py-16 bg-gray-50" id="project-gallery">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Completed Projects Throughout Utah
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Each project represents our commitment to excellence. From residential renovations to commercial installations, see the quality that has made us Utah&apos;s premier construction company.
              </p>
            </div>

            {/* Flooring Projects */}
            <div className="mb-16" id="flooring-projects">
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v10" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Flooring Projects</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.filter(project => project.category === 'flooring').map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-construction overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-gray-300 h-64 flex items-center justify-center">
                      <div className="text-gray-600 text-center">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm">High-Quality Flooring Image</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-bold text-gray-900">{project.title}</h4>
                      </div>
                      <p className="text-sm text-green-600 font-medium mb-3">{project.location}</p>
                      <p className="text-gray-700 text-sm mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.features.map((feature, index) => (
                          <span key={index} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Demolition Projects */}
            <div className="mb-16" id="demolition-projects">
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Demolition Projects</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {projects.filter(project => project.category === 'demolition').map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-construction overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-gray-300 h-48 flex items-center justify-center">
                      <div className="text-gray-600 text-center">
                        <svg className="w-10 h-10 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-xs">Demolition Project</p>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="text-md font-bold text-gray-900 mb-1">{project.title}</h4>
                      <p className="text-xs text-blue-600 font-medium mb-2">{project.location}</p>
                      <p className="text-gray-700 text-xs mb-3">{project.description}</p>
                      <div className="flex flex-wrap gap-1">
                        {project.features.map((feature, index) => (
                          <span key={index} className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Junk Removal Projects */}
            <div className="mb-8" id="junk-removal-projects">
              <div className="flex items-center mb-8">
                <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center mr-3">
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-gray-900">Junk Removal Projects</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {projects.filter(project => project.category === 'junk-removal').map((project) => (
                  <div key={project.id} className="bg-white rounded-lg shadow-construction overflow-hidden hover:shadow-xl transition-shadow duration-300">
                    <div className="bg-gray-300 h-56 flex items-center justify-center">
                      <div className="text-gray-600 text-center">
                        <svg className="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        <p className="text-sm">Junk Removal Project</p>
                      </div>
                    </div>
                    <div className="p-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{project.title}</h4>
                      <p className="text-sm text-red-600 font-medium mb-3">{project.location}</p>
                      <p className="text-gray-700 mb-4">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.features.map((feature, index) => (
                          <span key={index} className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded-full">
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Before/After Section */}
        <section className="py-16 bg-white" id="before-after">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Before & After Transformations
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See the dramatic transformations our team achieves. These before and after comparisons showcase the quality and attention to detail that sets Wild West Construction apart.
              </p>
            </div>

            <div className="space-y-12">
              {beforeAfterProjects.map((project) => (
                <div key={project.id} className="bg-gray-50 rounded-lg p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{project.title}</h3>
                    <p className="text-lg text-gray-600">{project.location}</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Before */}
                    <div className="space-y-4">
                      <div className="bg-red-100 text-red-800 px-4 py-2 rounded-lg font-bold text-center">
                        BEFORE
                      </div>
                      <div className="bg-gray-300 rounded-lg h-80 flex items-center justify-center">
                        <div className="text-gray-600 text-center">
                          <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm">Before Photo</p>
                        </div>
                      </div>
                      <p className="text-gray-700 bg-white p-4 rounded-lg">{project.beforeDescription}</p>
                    </div>

                    {/* After */}
                    <div className="space-y-4">
                      <div className="bg-green-100 text-green-800 px-4 py-2 rounded-lg font-bold text-center">
                        AFTER
                      </div>
                      <div className="bg-gray-300 rounded-lg h-80 flex items-center justify-center">
                        <div className="text-gray-600 text-center">
                          <svg className="w-16 h-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <p className="text-sm">After Photo</p>
                        </div>
                      </div>
                      <p className="text-gray-700 bg-white p-4 rounded-lg">{project.afterDescription}</p>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                      project.category === 'flooring' ? 'bg-green-100 text-green-800' :
                      project.category === 'demolition' ? 'bg-blue-100 text-blue-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {project.category === 'flooring' ? 'Flooring Project' :
                       project.category === 'demolition' ? 'Demolition Project' :
                       'Junk Removal Project'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-red-600 to-red-700 text-white" id="get-quote">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* CTA Content */}
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6">
                  Ready to Start Your Project?
                </h2>
                <p className="text-xl text-white/90 mb-8 leading-relaxed max-w-2xl mx-auto">
                  Get your free, no-obligation estimate today. Our construction experts will assess your project needs and provide transparent pricing with no hidden fees.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                  {[
                    "Free In-Home Consultation",
                    "Detailed Written Estimate", 
                    "Licensed & Insured Contractors",
                    "24-Hour Response Time",
                    "Quality Workmanship Guarantee",
                    "No Pressure, No Obligation"
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <svg className="w-5 h-5 text-yellow-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                  <a
                    href="tel:+1-801-691-4065"
                    data-source="gallery_cta"
                    data-service-type="general"
                    className="px-8 py-4 bg-white text-red-600 font-bold rounded-lg hover:bg-gray-100 transition-colors duration-200 text-center text-lg"
                  >
                    Call (801) 691-4065
                  </a>
                  <a
                    href="https://wa.me/18016914065"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-source="gallery_cta"
                    data-service-type="general"
                    className="px-8 py-4 btn-whatsapp font-bold rounded-lg text-center text-lg flex items-center justify-center space-x-2"
                  >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.388" />
                    </svg>
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>

              {/* Lead Form */}
              <div className="bg-white bg-opacity-95 rounded-lg shadow-2xl p-1">
                <Suspense
                  fallback={
                    <div className="h-96 animate-pulse bg-gray-200 rounded"></div>
                  }
                >
                  <LeadForm variant="default" />
                </Suspense>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* JSON-LD Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ImageGallery",
            name: "Wild West Construction Project Gallery",
            description: "View completed construction projects throughout Utah including flooring installations, demolition work, and junk removal services by Wild West Construction.",
            url: "https://wildwestslc.com/gallery",
            publisher: {
              "@type": "LocalBusiness",
              name: "Wild West Construction",
              telephone: "+1-801-691-4065",
              email: "info@wildwestslc.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "4097 S 420 W",
                addressLocality: "Murray",
                addressRegion: "UT",
                postalCode: "84123",
                addressCountry: "US",
              },
            },
            serviceArea: {
              "@type": "State", 
              name: "Utah",
            },
            hasOfferCatalog: {
              "@type": "OfferCatalog",
              name: "Construction Services",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Flooring Installation Services",
                    description: "Professional hardwood, vinyl, and laminate flooring installation and refinishing services throughout Utah.",
                  },
                },
                {
                  "@type": "Offer", 
                  itemOffered: {
                    "@type": "Service",
                    name: "Demolition Services",
                    description: "Safe and efficient residential and commercial demolition services with proper cleanup and debris removal.",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service", 
                    name: "Junk Removal Services",
                    description: "Comprehensive junk removal and cleanout services for residential and commercial properties.",
                  },
                },
              ],
            },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "4.9",
              reviewCount: "127",
            },
          }),
        }}
      />
    </>
  );
}