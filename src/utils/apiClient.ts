export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

interface RequestOptions<TBody> {
  method?: HttpMethod;
  body?: TBody;
  headers?: Record<string, string>;
}

const baseUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3001";

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem("token");
};

async function request<TResponse = unknown, TBody = unknown>(
  path: string,
  options: RequestOptions<TBody> = {}
): Promise<TResponse> {
  const url = path.startsWith("http") ? path : `${baseUrl}${path}`;

  const isFormData = typeof FormData !== "undefined" && options.body instanceof FormData;

  // Add Authorization header if token exists
  const token = getAuthToken();
  const headers: Record<string, string> = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };
  
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(url, {
    method: options.method || (options.body ? "POST" : "GET"),
    credentials: "include",
    headers,
    body: isFormData ? (options.body as unknown as BodyInit) : options.body ? JSON.stringify(options.body) : undefined,
  });

  let data: any = null;
  try {
    data = await res.json();
  } catch (_) {
    // ignore body parse error
  }

  if (!res.ok) {
    const message = data?.message || res.statusText || "Request failed";
    throw new Error(message);
  }

  return data as TResponse;
}

export const apiClient = {
  get: <TResponse = unknown>(path: string) => request<TResponse>(path, { method: "GET" }),
  post: <TResponse = unknown, TBody = unknown>(path: string, body?: TBody, headers?: Record<string, string>) =>
    request<TResponse, TBody>(path, { method: "POST", body, headers }),
  put: <TResponse = unknown, TBody = unknown>(path: string, body?: TBody) =>
    request<TResponse, TBody>(path, { method: "PUT", body }),
  patch: <TResponse = unknown, TBody = unknown>(path: string, body?: TBody) =>
    request<TResponse, TBody>(path, { method: "PATCH", body }),
  delete: <TResponse = unknown>(path: string) => request<TResponse>(path, { method: "DELETE" }),
};

export default apiClient;


