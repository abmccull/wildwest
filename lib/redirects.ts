export interface RedirectRule {
  from: string;
  to: string;
  permanent?: boolean; // 308 if true, else 307
}

// Central place to define manual redirects for legacy or misspelled URLs.
// Use lowercase, no trailing slash for `from` and `to`.
export const redirectRules: RedirectRule[] = [
  // Example:
  // { from: "/salt-lake-city/flooring-installation", to: "/salt-lake-city-flooring-installation", permanent: true },
];

export function findRedirect(pathname: string): RedirectRule | undefined {
  const normalized = normalizePath(pathname);
  return redirectRules.find((r) => r.from === normalized);
}

export function normalizePath(pathname: string): string {
  // Lowercase, collapse slashes, strip trailing slash (except root)
  let p = pathname.toLowerCase();
  p = p.replace(/\/+/g, "/");
  if (p.length > 1 && p.endsWith("/")) p = p.slice(0, -1);
  return p;
}


