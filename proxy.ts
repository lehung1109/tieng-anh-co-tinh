import { withSupabaseProxy } from "./proxy/supabaseProxy";
import { chainProxy } from "./lib/chainProxy";
import { i18nProxy } from "./proxy/i18nproxy";

export default chainProxy([withSupabaseProxy, i18nProxy]);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|manifest.json|favicon.ico|sw.js|.*.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
