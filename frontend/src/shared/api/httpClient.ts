const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const getAuthToken = (): string => {
  return localStorage.getItem('access_token') || '95hvjrni';
};

export class HttpError extends Error {
  statusCode: number;
  data: unknown;

  constructor(message: string, statusCode: number, data?: unknown) {
    super(message);
    this.name = 'HttpError';
    this.statusCode = statusCode;
    this.data = data;
  }
}

export async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getAuthToken();
  const headers = new Headers(options.headers || {});

  if (!headers.has('Content-Type') && !(options.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('api-token', token);
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      console.warn('Session expired or unauthorized. Logging out.');
      localStorage.removeItem('access_token');
      localStorage.removeItem('user_profile');
    }

    let errorData: unknown;
    try {
      errorData = await response.json();
    } catch {
      errorData = await response.text();
    }

    throw new HttpError(
      `API Error ${response.status}: ${response.statusText}`,
      response.status,
      errorData
    );
  }

  return response.json() as Promise<T>;
}

export const httpClient = {
  get: <T>(url: string, options?: RequestInit) =>
    request<T>(url, { ...options, method: 'GET' }),
  post: <T>(url: string, body?: unknown, options?: RequestInit) =>
    request<T>(url, {
      ...options,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),
  put: <T>(url: string, body?: unknown, options?: RequestInit) =>
    request<T>(url, {
      ...options,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),
  delete: <T>(url: string, options?: RequestInit) =>
    request<T>(url, { ...options, method: 'DELETE' }),
};
