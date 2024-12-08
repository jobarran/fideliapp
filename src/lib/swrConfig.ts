// lib/swrConfig.ts
import { SWRConfiguration } from 'swr';

export const swrConfig: SWRConfiguration = {
  refreshInterval: 5000, // Auto revalidate every 5 seconds
  revalidateOnFocus: true, // Revalidate on window focus
  revalidateOnReconnect: true, // Revalidate when reconnecting
  shouldRetryOnError: true, // Retry on failure
  errorRetryInterval: 3000, // Retry after 3 seconds on error
};
