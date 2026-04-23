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

  const res = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
    next: { revalidate: 5 }, // App Router ISR support
  });
  return res.json();
};

const HttpService = {
  nativeFetch,
};

export default HttpService;
