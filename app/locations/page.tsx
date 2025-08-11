import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CITY_DISPLAY_NAMES } from "@/lib/seo";

export const revalidate = 3600;

export default function LocationsIndex() {
  const cities = Object.entries(CITY_DISPLAY_NAMES);
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900 mb-3">Our Utah Service Areas</h1>
            <p className="text-lg text-gray-600">Choose your city to view available services.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cities.map(([slug, name]) => (
              <Link
                key={slug}
                href={`/locations/${slug}`}
                className="block p-6 rounded-lg border border-gray-200 hover:border-red-300 hover:shadow-md transition"
              >
                <div className="text-lg font-semibold text-gray-900 mb-1">{name}</div>
                <div className="text-sm text-gray-600">Flooring • Demolition • Junk Removal</div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}


