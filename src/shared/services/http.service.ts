import { API_BASE_URL, API_KEY } from "@/shared/constants";

const nativeFetch = async <T = any>(
  url: string,
  options: any = {}
): Promise<T> => {
  const headers: any = {
    "Content-Type": "application/json",
    "X-Aixtor-API-Key": API_KEY,
    ...(options.headers || {}),
  };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8000);

  try {
    const res = await fetch(`${API_BASE_URL}${url}`, {
      ...options,
      headers,
      signal: controller.signal,
      next: { revalidate: 5 },
    });
    return res.json();
  } finally {
    clearTimeout(timer);
  }
};

const HttpService = {
  nativeFetch,
};

export default HttpService;
