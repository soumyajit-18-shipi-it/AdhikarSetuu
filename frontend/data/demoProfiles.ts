import type { ProfilePayload } from '@/services/api';

export const DEMO_PROFILES: ProfilePayload[] = [
  {
    business_name: 'Lakshmi Foods',
    sector: 'Food Processing',
    annual_turnover: 2500000,
    employees: 18,
    gst_registered: true,
    exporter: false,
    women_owned: true,
    district: 'Hyderabad',
  },
  {
    business_name: 'Telangana Exports',
    sector: 'Export & Marketing',
    annual_turnover: 18000000,
    employees: 45,
    gst_registered: true,
    exporter: true,
    women_owned: false,
    district: 'Warangal',
  },
  {
    business_name: 'Khammam Agro Tech',
    sector: 'Agro-processing',
    annual_turnover: 900000,
    employees: 12,
    gst_registered: false,
    exporter: false,
    women_owned: false,
    district: 'Khammam',
  },
];

export default DEMO_PROFILES;
