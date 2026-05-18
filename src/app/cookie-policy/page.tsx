import "@/assets/css/content.module.css";
import SafeHtml from "@/components/ui/safe-html";
import HttpService from "@/shared/services/http.service";
import { TApiResponse } from "@/shared/types";

// ─── Types ────────────────────────────────────────────────────────────────────

type PolicyData = {
  id: number;
  title: string;
  slug: string;
  content: string;
};

// ─── Fetcher ──────────────────────────────────────────────────────────────────

async function fetchCookiePolicy(): Promise<PolicyData | null> {
  try {
    const res = await HttpService.nativeFetch<TApiResponse<PolicyData>>(
      "page/cookie-policy",
      { method: "GET" }
    );
    return res?.data ?? null;
  } catch (error) {
    console.error("Failed to fetch cookie policy:", error);
    return null;
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function CookiePolicyPage() {
  const data = await fetchCookiePolicy();

  if (!data) return null;

  return (
    <section className="common-section">
      <div className="container">
        <SafeHtml
          html={data.content}
          className="policy-content m-5"
        />
      </div>
    </section>
  );
}
