import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import { Database, PageContent } from "@/types/database";

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default async function TestPage() {
  // Fetch a sample page to test content structure
  const { data: pages, error } = await supabase
    .from("pages")
    .select("*")
    .eq("city", "Sandy")
    .eq("keyword", "luxury vinyl plank installation")
    .limit(1)
    .single();

  if (error) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">Error Loading Page</h1>
        <pre className="bg-gray-100 p-4 rounded">
          {JSON.stringify(error, null, 2)}
        </pre>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Test Page - Sandy LVP Installation
      </h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Page Data:</h2>
        <div className="bg-gray-50 p-4 rounded">
          <p>
            <strong>Slug:</strong> {pages?.slug}
          </p>
          <p>
            <strong>City:</strong> {pages?.city}
          </p>
          <p>
            <strong>Service:</strong> {pages?.service}
          </p>
          <p>
            <strong>Keyword:</strong> {pages?.keyword}
          </p>
          <p>
            <strong>H1:</strong> {pages?.h1}
          </p>
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Content Structure:</h2>
        <pre className="bg-gray-100 p-4 rounded overflow-auto text-xs">
          {JSON.stringify(pages?.content, null, 2)}
        </pre>
      </div>

      {pages?.content && typeof pages.content === "object" && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">
            Rendered Content Sections:
          </h2>
          <div className="space-y-4">
            {(pages.content as PageContent).sections?.map((section, index) => (
              <div key={index} className="bg-white border p-4 rounded">
                <h3 className="font-bold mb-2">{section.title}</h3>
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{
                    __html: section.content.replace(/\n/g, "<br />"),
                  }}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-8">
        <Link href="/locations/sandy" className="text-blue-600 hover:underline">
          View Sandy Hub Page →
        </Link>
      </div>
    </div>
  );
}
