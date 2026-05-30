import axios from 'axios';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  (process.env.NODE_ENV === 'production'
    ? 'https://civictech-hackathon.onrender.com'
    : 'http://localhost:8000');

const client = axios.create({
  baseURL: BASE_URL,
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

export async function getSectors(): Promise<string[]> {
  const res = await client.get('/api/meta/sectors');
  return res.data.sectors || [];
}

export async function getDistricts(): Promise<string[]> {
  const res = await client.get('/api/meta/districts');
  return res.data.districts || [];
}

export async function matchSchemes(payload: ProfilePayload): Promise<any> {
  const res = await client.post('/api/schemes/match', payload);
  return res.data;
}

export async function calculateLoss(payload: ProfilePayload): Promise<any> {
  const res = await client.post('/api/loss/calculate', payload);
  return res.data;
}

export async function uploadRejection(file: File): Promise<any> {
  const form = new FormData();
  form.append('file', file);
  const res = await client.post('/api/rejection/explain', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: () => {},
  });
  return res.data;
}

export async function getAnalytics(): Promise<any> {
  const res = await client.get('/api/analytics/exclusion');
  return res.data;
}

export default client;
