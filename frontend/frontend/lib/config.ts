export const config = {
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || '',
  isDevelopment: process.env.NODE_ENV === 'development',
};