import axios, { AxiosError, type AxiosRequestConfig, type Method } from 'axios';
import { config } from '@/lib/config';

const client = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
});

export interface ProfilePayload {
  business_name: string;
  sector: string;
  annual_turnover: number;
  employees: number;
  gst_registered: boolean;
  exporter: boolean;
  women_owned: boolean;
  district: string;
}

export interface EligibilityResult {
  summary: {
    total_schemes: number;
    eligible_count: number;
    partial_count: number;
    ineligible_count: number;
    max_benefit: number;
  };
  schemes: Array<Record<string, any>>;
  loss: {
    totalPotential: number;
    breakdown: Array<Record<string, any>>;
    cumulativeChart: Array<Record<string, any>>;
    pieData: Array<Record<string, any>>;
  };
}

export interface RejectionReason {
  id: number;
  title: string;
  original: string;
  plain: string;
  severity: 'critical' | 'moderate';
  fix: string;
}

export interface RejectionAnalysis {
  document?: {
    name: string;
    mime_type: string;
    size_bytes: number;
    uploaded_at: string;
  };
  summary?: string;
  reasons?: RejectionReason[];
  requiredFixes?: Array<{ id: number; text: string; completed: boolean }>;
  estimated_resolution_days?: number;
}

function unwrapResponse<T>(payload: unknown): T {
  if (payload && typeof payload === 'object' && 'success' in payload && 'data' in payload) {
    return (payload as { data: T }).data;
  }
  return payload as T;
}

async function request<T>(method: Method, url: string, data?: unknown, requestConfig?: AxiosRequestConfig): Promise<T> {
  const res = await client.request({ method, url, data, ...requestConfig });
  return unwrapResponse<T>(res.data);
}

async function withDevFallback<T>(loader: () => Promise<T>, fallback: () => Promise<T>): Promise<T> {
  try {
    return await loader();
  } catch (error) {
    if (!config.isDevelopment) {
      if (error instanceof AxiosError) {
        throw error;
      }
      throw error;
    }
    return fallback();
  }
}

async function loadDevMocks() {
  return import('@/dev-mocks');
}

export async function getSectors(): Promise<string[]> {
  return withDevFallback(
    async () => request<string[]>('GET', '/metadata/sectors'),
    async () => (await loadDevMocks()).SECTORS,
  );
}

export async function getDistricts(): Promise<string[]> {
  return withDevFallback(
    async () => request<string[]>('GET', '/metadata/districts'),
    async () => (await loadDevMocks()).DISTRICTS,
  );
}

export async function getDemoProfiles(): Promise<ProfilePayload[]> {
  if (!config.isDevelopment) {
    return [];
  }
  return (await loadDevMocks()).DEMO_PROFILES;
}

export async function getSchemes(): Promise<Array<Record<string, any>>> {
  return withDevFallback(
    async () => request<Array<Record<string, any>>>('GET', '/schemes'),
    async () => (await loadDevMocks()).MOCK_SCHEMES,
  );
}

export async function getSchemeById(id: string): Promise<Record<string, any> | null> {
  return withDevFallback(
    async () => request<Record<string, any>>('GET', `/schemes/${encodeURIComponent(id)}`),
    async () => (await loadDevMocks()).MOCK_SCHEMES.find((scheme: any) => scheme.id === id) ?? null,
  );
}

export async function checkEligibility(payload: ProfilePayload): Promise<EligibilityResult> {
  return withDevFallback(
    async () => request<EligibilityResult>('POST', '/eligibility/check', payload),
    async () => (await loadDevMocks()).ELIGIBILITY_RESULT,
  );
}

export async function getRejectionReasons(): Promise<RejectionReason[]> {
  return withDevFallback(
    async () => request<RejectionReason[]>('GET', '/rejection-reasons'),
    async () => (await loadDevMocks()).REJECTION_REASONS,
  );
}

export async function getUserProfile(): Promise<ProfilePayload> {
  return withDevFallback(
    async () => request<ProfilePayload>('GET', '/user/profile'),
    async () => (await loadDevMocks()).PROFILE_TEMPLATE,
  );
}

export async function uploadRejection(file: File): Promise<RejectionAnalysis> {
  return withDevFallback(
    async () => {
      const form = new FormData();
      form.append('file', file);
      const res = await client.post('/rejection/explain', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return unwrapResponse<RejectionAnalysis>(res.data);
    },
    async () => (await loadDevMocks()).REJECTION_NOTICE,
  );
}

export async function getAnalytics(): Promise<any> {
  return withDevFallback(
    async () => request<any>('GET', '/analytics/exclusion'),
    async () => (await loadDevMocks()).ANALYTICS,
  );
}

export default client;
