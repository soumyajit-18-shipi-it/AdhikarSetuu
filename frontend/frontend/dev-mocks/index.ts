import type { ProfilePayload, RejectionReason } from '@/services/api';

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

export const SECTORS = [
  'Manufacturing',
  'Food Processing',
  'Textiles & Apparel',
  'IT & Software Services',
  'Agro-processing',
  'Pharmaceuticals',
  'Engineering & Metal Works',
  'Handicrafts & Artisans',
  'Retail & Trading',
  'Construction & Infrastructure',
];

export const DISTRICTS = ['Hyderabad', 'Warangal', 'Khammam', 'Nizamabad', 'Karimnagar'];

export const MOCK_SCHEMES = [
  {
    id: 'cgtmse',
    name: 'CGTMSE',
    fullName: 'Credit Guarantee Fund Trust for Micro and Small Enterprises',
    category: 'Credit & Finance',
    ministry: 'Ministry of MSME',
    potentialBenefit: 500000,
    benefitType: 'Collateral-free Credit',
    eligibilityStatus: 'eligible',
    description: 'Provides collateral-free credit for micro and small enterprises.',
    eligibilityCriteria: ['Micro/Small Enterprise', 'Valid Udyam Registration'],
    applicationUrl: '#',
    deadline: 'Rolling',
    beneficiaries: 3200000,
  },
  {
    id: 'pmfme',
    name: 'PMFME',
    fullName: 'PM Formalisation of Micro Food Processing Enterprises',
    category: 'Food Processing',
    ministry: 'Ministry of Food Processing Industries',
    potentialBenefit: 1000000,
    benefitType: 'Capital Subsidy',
    eligibilityStatus: 'eligible',
    description: 'Capital subsidy for food processing micro enterprises.',
    eligibilityCriteria: ['Food processing sector', 'Micro enterprise'],
    applicationUrl: '#',
    deadline: 'Rolling',
    beneficiaries: 200000,
  },
  {
    id: 'zed',
    name: 'ZED Certification',
    fullName: 'Zero Defect Zero Effect Certification',
    category: 'Quality & Certification',
    ministry: 'Ministry of MSME',
    potentialBenefit: 80000,
    benefitType: 'Certification Subsidy',
    eligibilityStatus: 'partial',
    description: 'Subsidized ZED certification for quality improvement.',
    eligibilityCriteria: ['Manufacturing MSME', 'Udyam Registration'],
    applicationUrl: '#',
    deadline: 'Rolling',
    beneficiaries: 50000,
  },
];

export const ELIGIBILITY_RESULT = {
  summary: {
    total_schemes: MOCK_SCHEMES.length,
    eligible_count: MOCK_SCHEMES.filter((scheme) => scheme.eligibilityStatus === 'eligible').length,
    partial_count: MOCK_SCHEMES.filter((scheme) => scheme.eligibilityStatus === 'partial').length,
    ineligible_count: MOCK_SCHEMES.filter((scheme) => scheme.eligibilityStatus === 'ineligible').length,
    max_benefit: 1000000,
  },
  schemes: MOCK_SCHEMES,
  loss: {
    totalPotential: 1250000,
    breakdown: [
      { scheme: 'CGTMSE', year1: 120000, year2: 180000, year3: 200000, total: 500000 },
      { scheme: 'PMFME', year1: 200000, year2: 150000, year3: 100000, total: 450000 },
      { scheme: 'ZED', year1: 40000, year2: 40000, year3: 0, total: 80000 },
    ],
    cumulativeChart: [
      { period: 'Month 3', amount: 180000 },
      { period: 'Month 6', amount: 380000 },
      { period: 'Month 9', amount: 550000 },
      { period: 'Month 12', amount: 710000 },
      { period: 'Year 2', amount: 980000 },
      { period: 'Year 3', amount: 1250000 },
    ],
    pieData: [
      { name: 'CGTMSE', value: 500000, color: '#1a4fa0' },
      { name: 'PMFME', value: 450000, color: '#d4a017' },
      { name: 'ZED', value: 80000, color: '#2a7d4f' },
    ],
  },
};

const REJECTION_REASON_FIXTURES: RejectionReason[] = [
  {
    id: 1,
    title: 'GST Certificate Missing',
    original: 'NON-SUBMISSION OF MANDATORY DOCUMENTS',
    plain: 'You did not attach your GST Registration Certificate.',
    severity: 'critical',
    fix: 'Download GST certificate and attach as PDF.',
  },
  {
    id: 2,
    title: 'Udyam Registration Mismatch',
    original: 'UDYAM REGISTRATION DISCREPANCY',
    plain: 'The Udyam registration does not match the declared business category.',
    severity: 'critical',
    fix: 'Verify Udyam details and update the application.',
  },
  {
    id: 3,
    title: 'Bank Statements Incomplete',
    original: 'BANK STATEMENT DEFICIT',
    plain: 'Bank statements for the required period were not provided.',
    severity: 'moderate',
    fix: 'Provide certified bank statements for the last two years.',
  },
];

export const REJECTION_NOTICE = {
  document: {
    name: 'Application_Rejection.pdf',
    mime_type: 'application/pdf',
    size_bytes: 124000,
    uploaded_at: new Date('2024-11-18T10:00:00.000Z').toISOString(),
  },
  summary: 'Your application was rejected due to 3 missing or incorrect documents.',
  reasons: REJECTION_REASON_FIXTURES,
  requiredFixes: [
    { id: 1, text: 'Download and attach GST Registration Certificate (PDF)', completed: false },
    { id: 2, text: 'Verify and correct NIC code on Udyam Registration Portal', completed: false },
    { id: 3, text: 'Obtain certified bank statements for last 2 financial years', completed: false },
  ],
  estimated_resolution_days: 3,
};

export const REJECTION_REASONS: RejectionReason[] = REJECTION_NOTICE.reasons ?? [];

export const ANALYTICS = {
  kpis: {
    registered_msmes: 10000,
    applications_submitted: 5200,
    approved_applications: 3100,
    avg_participation_rate: 52.0,
  },
  districts: [
    {
      id: 'hyderabad',
      name: 'Hyderabad',
      registeredMSMEs: 2500,
      applicationsSubmitted: 2200,
      approvedApplications: 1900,
      participationRate: 88,
      exclusionRisk: 'low',
      participationLevel: 'High Participation',
      requiresAttention: false,
      topSector: 'IT Services',
      fundUtilization: 91,
    },
    {
      id: 'khammam',
      name: 'Khammam',
      registeredMSMEs: 1700,
      applicationsSubmitted: 540,
      approvedApplications: 320,
      participationRate: 32,
      exclusionRisk: 'high',
      participationLevel: 'High Exclusion Risk',
      requiresAttention: true,
      topSector: 'Agro-processing',
      fundUtilization: 29,
    },
  ],
  high_exclusion_zones: [
    { district: 'Khammam', exclusion_rate: 0.68, participation_rate: 0.32 },
  ],
  recommendations: [
    {
      district_id: 'khammam',
      priority: 'urgent',
      title: 'Urgent: Khammam Outreach',
      description: 'Launch targeted MSME camps with DIC support to increase participation.',
    },
  ],
};

export const PROFILE_TEMPLATE = {
  business_name: '',
  sector: '',
  annual_turnover: 0,
  employees: 0,
  gst_registered: false,
  exporter: false,
  women_owned: false,
  district: '',
};