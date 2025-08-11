import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const revalidate = 3600;

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Wild West Construction</h1>
        <p className="text-gray-700 mb-6">Call us at <a className="text-blue-600" href="tel:+18016914065">(801) 691-4065</a> or email <a className="text-blue-600" href="mailto:info@wildwestslc.com">info@wildwestslc.com</a>.</p>
        <p className="text-gray-600">For a fast response, please use the lead form on our service pages.</p>
      </main>
      <Footer />
    </div>
  );
}


