// frontend/src/services/authService.ts
import axios, { AxiosError } from 'axios';
import { SignupData, LoginData, User, AuthSuccessResponse, ErrorResponse } from '../types/user';

// Get backend URL from window config or use default
const getApiUrl = () => {
  // Server-side rendering fallback
  if (typeof window === 'undefined') return 'http://localhost:8000';

  // Check for runtime config (set by Vercel or custom script)
  if ((window as any).BACKEND_API_URL) {
    return (window as any).BACKEND_API_URL;
  }

  // Fallback to localhost for development
  return 'http://localhost:8000';
};

const API_URL = getApiUrl();
const AUTH_API_ENDPOINT = `${API_URL}/api/auth`;

// Create an Axios instance for the auth API with timeout and retry configuration
const authApi = axios.create({
  baseURL: AUTH_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30 second timeout (increased from default)
  validateStatus: (status) => status < 500, // Don't throw on 4xx errors
});

// Retry configuration
const MAX_RETRIES = 2;
const RETRY_DELAY = 1000; // 1 second

// Helper function for retrying failed requests
const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  retries: number = MAX_RETRIES
): Promise<T> => {
  try {
    return await requestFn();
  } catch (error) {
    const axiosError = error as AxiosError;

    // Only retry on network errors or 5xx server errors
    const shouldRetry =
      retries > 0 &&
      (!axiosError.response || axiosError.response.status >= 500);

    if (shouldRetry) {
      console.log(`Request failed, retrying... (${MAX_RETRIES - retries + 1}/${MAX_RETRIES})`);
      await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
      return retryRequest(requestFn, retries - 1);
    }

    throw error;
  }
};

// Add a response interceptor for global error handling
authApi.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // This is where global error handling can occur
    console.error("API call failed:", error.response || error);

    // Categorize errors for better user feedback
    let errorMessage = 'An unexpected error occurred.';

    if (error.code === 'ECONNABORTED') {
      errorMessage = 'Request timed out. The server is taking too long to respond. Please try again.';
    } else if (error.code === 'ERR_NETWORK' || error.message === 'Network Error') {
      errorMessage = 'Unable to connect to the server. Please check your internet connection or try again later.';
    } else if (error.response) {
      // Server responded with error
      const responseData = error.response.data as { detail?: string };
      errorMessage = responseData?.detail || error.message || 'Server error occurred.';
    }

    // Re-throw the error with a custom message
    return Promise.reject(new Error(errorMessage));
  }
);

const saveUserData = (token: string, user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
  }
};

const clearUserData = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

const getToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  try {
    const user = localStorage.getItem('user');
    if (user === 'undefined' || user === 'null') return null;
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error("Error parsing user from localStorage:", error);
    return null;
  }
};

const signup = async (data: SignupData): Promise<AuthSuccessResponse> => {
  const response = await retryRequest(() =>
    authApi.post<AuthSuccessResponse>('/signup', data)
  );

  if (response.status !== 200) {
    throw new Error(response.data?.message || 'Signup failed');
  }

  const { token, user } = response.data;
  saveUserData(token, user);
  return response.data;
};

const login = async (data: LoginData): Promise<AuthSuccessResponse> => {
  const response = await retryRequest(() =>
    authApi.post<AuthSuccessResponse>('/login', data)
  );

  if (response.status !== 200) {
    throw new Error(response.data?.message || 'Login failed');
  }

  const { token, user } = response.data;
  saveUserData(token, user);
  return response.data;
};

const getMe = async (): Promise<User | null> => {
  const token = getToken();
  if (!token) {
    clearUserData();
    return null;
  }

  try {
    const response = await retryRequest(() =>
      authApi.get<User>('/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        timeout: 15000, // Shorter timeout for auth check
      })
    );

    if (response.status === 200) {
      return response.data;
    } else {
      console.warn("Auth check returned non-200 status:", response.status);
      clearUserData();
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch user data (token likely invalid or server unavailable):", error);

    // Only clear token if it's actually invalid (401), not if server is down
    const axiosError = error as AxiosError;
    if (axiosError.response?.status === 401) {
      console.log("Token is invalid, clearing user data");
      clearUserData();
    } else {
      console.log("Server error, keeping token for retry");
      // Return the cached user from localStorage if available
      return getUser();
    }

    return null;
  }
};

const logout = () => {
  clearUserData();
};

export const authService = {
  signup,
  login,
  getMe,
  logout,
  getToken,
  getUser,
};