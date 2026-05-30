export interface Scheme {
  id: string;
  name: string;
  fullName: string;
  category: string;
  ministry: string;
  potentialBenefit: number;
  benefitType: string;
  eligibilityStatus: 'eligible' | 'partial' | 'ineligible';
  description: string;
  eligibilityCriteria: string[];
  applicationUrl: string;
  deadline: string;
  beneficiaries: number;
}

export interface District {
  id: string;
  name: string;
  registeredMSMEs: number;
  applicationsSubmitted: number;
  approvedApplications: number;
  participationRate: number;
  exclusionRisk: 'low' | 'medium' | 'high';
  participationLevel: 'High Participation' | 'Medium Participation' | 'High Exclusion Risk' | 'Policy Attention Required';
  requiresAttention: boolean;
  topSector: string;
  fundUtilization: number;
}

export interface MSMEProfile {
  businessName: string;
  sector: string;
  annualTurnover: string;
  employees: string;
  gstRegistered: boolean;
  exporter: boolean;
  womenOwned: boolean;
  district: string;
}

export const SCHEMES: Scheme[] = [
  {
    id: 'cgtmse',
    name: 'CGTMSE',
    fullName: 'Credit Guarantee Fund Trust for Micro and Small Enterprises',
    category: 'Credit & Finance',
    ministry: 'Ministry of MSME',
    potentialBenefit: 500000,
    benefitType: 'Collateral-free Credit',
    eligibilityStatus: 'eligible',
    description: 'Provides collateral-free credit up to ₹2 crore for micro and small enterprises.',
    eligibilityCriteria: ['Micro/Small Enterprise', 'Valid Udyam Registration', 'Good credit history'],
    applicationUrl: '#',
    deadline: '31 March 2025',
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
    description: '35% capital subsidy for food processing micro enterprises, max ₹10 lakh.',
    eligibilityCriteria: ['Food processing sector', 'Micro enterprise', 'Annual turnover < ₹1 Cr'],
    applicationUrl: '#',
    deadline: '31 December 2024',
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
    eligibilityStatus: 'eligible',
    description: 'Subsidized ZED certification to enhance product quality and market access.',
    eligibilityCriteria: ['Manufacturing MSME', 'Udyam Registration', 'Minimum 1 year operations'],
    applicationUrl: '#',
    deadline: 'Rolling',
    beneficiaries: 50000,
  },
  {
    id: 'ts-ipass',
    name: 'TS-iPASS',
    fullName: 'Telangana State Industrial Project Approval and Self-Certification System',
    category: 'State Incentive',
    ministry: 'Govt. of Telangana',
    potentialBenefit: 250000,
    benefitType: 'Power Subsidy + Tax Benefits',
    eligibilityStatus: 'eligible',
    description: 'Single-window clearance with power subsidies and tax exemptions for Telangana industries.',
    eligibilityCriteria: ['Registered in Telangana', 'Fixed investment > ₹10 lakh', 'New/expanding unit'],
    applicationUrl: '#',
    deadline: 'Rolling',
    beneficiaries: 12000,
  },
  {
    id: 'mudra',
    name: 'MUDRA Loan',
    fullName: 'Micro Units Development & Refinance Agency',
    category: 'Credit & Finance',
    ministry: 'Ministry of Finance',
    potentialBenefit: 1000000,
    benefitType: 'Subsidized Loan',
    eligibilityStatus: 'eligible',
    description: 'Collateral-free business loans up to ₹10 lakh at subsidized interest rates.',
    eligibilityCriteria: ['Non-corporate non-farm business', 'Annual turnover < ₹50 lakh', 'Viable business plan'],
    applicationUrl: '#',
    deadline: 'Rolling',
    beneficiaries: 45000000,
  },
  {
    id: 'clcss',
    name: 'CLCSS',
    fullName: 'Credit Linked Capital Subsidy Scheme',
    category: 'Technology Upgrade',
    ministry: 'Ministry of MSME',
    potentialBenefit: 1500000,
    benefitType: '15% Capital Subsidy',
    eligibilityStatus: 'partial',
    description: '15% upfront capital subsidy for technology upgradation in small enterprises.',
    eligibilityCriteria: ['Small enterprise', 'Well-established subsector', 'Valid Udyam cert'],
    applicationUrl: '#',
    deadline: '31 March 2025',
    beneficiaries: 180000,
  },
  {
    id: 'nsic',
    name: 'NSIC Raw Material',
    fullName: 'National Small Industries Corporation Raw Material Assistance',
    category: 'Raw Material',
    ministry: 'Ministry of MSME',
    potentialBenefit: 300000,
    benefitType: 'Credit Facilitation',
    eligibilityStatus: 'eligible',
    description: 'Assistance for procurement of raw materials on credit basis through NSIC.',
    eligibilityCriteria: ['SSI registration', 'Satisfactory track record', 'No overdue to NSIC'],
    applicationUrl: '#',
    deadline: 'Rolling',
    beneficiaries: 90000,
  },
  {
    id: 'market-dev',
    name: 'Market Development',
    fullName: 'Market Development Assistance for MSMEs',
    category: 'Export & Marketing',
    ministry: 'Ministry of MSME',
    potentialBenefit: 200000,
    benefitType: 'Reimbursement Grant',
    eligibilityStatus: 'partial',
    description: 'Financial assistance for participation in international trade fairs and exhibitions.',
    eligibilityCriteria: ['MSME registration', 'Export orientation', 'Valid Udyam certificate'],
    applicationUrl: '#',
    deadline: '28 February 2025',
    beneficiaries: 15000,
  },
  {
    id: 'weavers',
    name: 'Handloom Scheme',
    fullName: 'National Handloom Development Programme',
    category: 'Textile & Handloom',
    ministry: 'Ministry of Textiles',
    potentialBenefit: 450000,
    benefitType: 'Development Subsidy',
    eligibilityStatus: 'ineligible',
    description: 'Support for modernization and development of handloom sector.',
    eligibilityCriteria: ['Handloom weaver', 'Weaver registration', 'Handloom product focus'],
    applicationUrl: '#',
    deadline: 'Rolling',
    beneficiaries: 2300000,
  },
  {
    id: 'gem-portal',
    name: 'GeM Registration',
    fullName: 'Government e-Marketplace Vendor Registration Support',
    category: 'Digital & Commerce',
    ministry: 'Ministry of Commerce',
    potentialBenefit: 150000,
    benefitType: 'Market Access',
    eligibilityStatus: 'eligible',
    description: 'Support for MSME registration and onboarding to GeM portal for government procurement.',
    eligibilityCriteria: ['Valid GST registration', 'MSME registration', 'Digital literacy'],
    applicationUrl: '#',
    deadline: 'Rolling',
    beneficiaries: 620000,
  },
];

export const DISTRICTS: District[] = [
  {
    id: 'hyderabad',
    name: 'Hyderabad',
    registeredMSMEs: 45230,
    applicationsSubmitted: 38920,
    approvedApplications: 32150,
    participationRate: 86.1,
    exclusionRisk: 'low',
    participationLevel: 'High Participation',
    requiresAttention: false,
    topSector: 'IT Services',
    fundUtilization: 92,
  },
  {
    id: 'warangal',
    name: 'Warangal',
    registeredMSMEs: 18750,
    applicationsSubmitted: 11200,
    approvedApplications: 8400,
    participationRate: 59.7,
    exclusionRisk: 'medium',
    participationLevel: 'Medium Participation',
    requiresAttention: false,
    topSector: 'Textiles',
    fundUtilization: 64,
  },
  {
    id: 'khammam',
    name: 'Khammam',
    registeredMSMEs: 12340,
    applicationsSubmitted: 3890,
    approvedApplications: 2340,
    participationRate: 31.5,
    exclusionRisk: 'high',
    participationLevel: 'High Exclusion Risk',
    requiresAttention: true,
    topSector: 'Agro-processing',
    fundUtilization: 28,
  },
  {
    id: 'nizamabad',
    name: 'Nizamabad',
    registeredMSMEs: 14560,
    applicationsSubmitted: 9870,
    approvedApplications: 7890,
    participationRate: 67.8,
    exclusionRisk: 'low',
    participationLevel: 'High Participation',
    requiresAttention: false,
    topSector: 'Agriculture',
    fundUtilization: 74,
  },
  {
    id: 'karimnagar',
    name: 'Karimnagar',
    registeredMSMEs: 16780,
    applicationsSubmitted: 7230,
    approvedApplications: 4560,
    participationRate: 43.1,
    exclusionRisk: 'medium',
    participationLevel: 'Medium Participation',
    requiresAttention: false,
    topSector: 'Manufacturing',
    fundUtilization: 48,
  },
];

export const CALCULATOR_DATA = {
  totalPotential: 1250000,
  breakdown: [
    { scheme: 'CGTMSE', year1: 120000, year2: 180000, year3: 200000 },
    { scheme: 'PMFME', year1: 200000, year2: 150000, year3: 100000 },
    { scheme: 'ZED', year1: 40000, year2: 40000, year3: 0 },
    { scheme: 'TS-iPASS', year1: 60000, year2: 80000, year3: 110000 },
    { scheme: 'MUDRA', year1: 50000, year2: 50000, year3: 50000 },
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
    { name: 'PMFME', value: 350000, color: '#d4a017' },
    { name: 'TS-iPASS', value: 200000, color: '#2a7d4f' },
    { name: 'ZED', value: 80000, color: '#c0392b' },
    { name: 'MUDRA', value: 120000, color: '#6c3483' },
  ],
};

export const REJECTION_NOTICE = {
  documentName: 'Application_Rejection.pdf',
  originalText: `OFFICE OF THE DISTRICT INDUSTRIES CENTRE
Hyderabad — 500003

Ref: DIC/HYD/CGTMSE/2024/8821
Date: 18 November 2024

Sub: Rejection of Application for Credit Guarantee Scheme — Reg.

With reference to your application dated 05 October 2024 for availing benefits under Credit Guarantee Fund Trust for Micro and Small Enterprises (CGTMSE), the undersigned, after due scrutiny, regrets to inform that your application has been rejected on the following grounds:

1. NON-SUBMISSION OF MANDATORY DOCUMENTS: Applicant has failed to submit valid GST Registration Certificate as required under Annexure-III of the application guidelines.

2. UDYAM REGISTRATION DISCREPANCY: The Udyam Registration Number furnished (UDYAM-TS-08-0012345) does not correspond to the NIC code declared under the enterprise category.

3. BANK STATEMENT DEFICIT: Financial statements for the preceding two assessment years were not furnished in the prescribed format.

The applicant may reapply after addressing the above discrepancies within 60 days from the date of this communication.

For further queries, contact: dic.hyd@telangana.gov.in

(Signature)
General Manager
District Industries Centre, Hyderabad`,
  aiExplanation: {
    summary: 'Your application was rejected due to 3 missing or incorrect documents.',
    reasons: [
      {
        id: 1,
        title: 'GST Certificate Missing',
        original: 'NON-SUBMISSION OF MANDATORY DOCUMENTS',
        plain: 'You did not attach your GST Registration Certificate. This is a required document that proves your business is registered for Goods & Services Tax.',
        severity: 'critical' as const,
        fix: 'Download your GST certificate from gstin.gov.in and attach it as PDF.',
      },
      {
        id: 2,
        title: 'Udyam Registration Mismatch',
        original: 'UDYAM REGISTRATION DISCREPANCY',
        plain: 'The business activity code (NIC code) on your Udyam Registration does not match what you declared in the application form. Both must show the same business category.',
        severity: 'critical' as const,
        fix: 'Log in to udyamregistration.gov.in, verify your NIC code, and update the application form to match.',
      },
      {
        id: 3,
        title: 'Bank Statements Incomplete',
        original: 'BANK STATEMENT DEFICIT',
        plain: 'You need to provide bank statements for the last 2 financial years (2022-23 and 2023-24) in the exact format specified by the scheme.',
        severity: 'moderate' as const,
        fix: 'Request certified bank statements from your bank for FY 2022-23 and FY 2023-24.',
      },
    ],
    requiredFixes: [
      { id: 1, text: 'Download and attach GST Registration Certificate (PDF)', completed: false },
      { id: 2, text: 'Verify and correct NIC code on Udyam Registration Portal', completed: false },
      { id: 3, text: 'Obtain certified bank statements for last 2 financial years', completed: false },
      { id: 4, text: 'Resubmit application before 18 January 2025', completed: false },
      { id: 5, text: 'Keep reference number DIC/HYD/CGTMSE/2024/8821 for follow-up', completed: false },
    ],
  },
};

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
  'Healthcare Services',
  'Education & Training',
  'Transport & Logistics',
  'Tourism & Hospitality',
];

export const TELANGANA_DISTRICTS = [
  'Hyderabad', 'Warangal', 'Khammam', 'Nizamabad', 'Karimnagar',
  'Medak', 'Nalgonda', 'Mahabubnagar', 'Rangareddy', 'Adilabad',
  'Sangareddy', 'Siddipet', 'Suryapet', 'Yadadri Bhuvanagiri', 'Mancherial',
];

export const STATS_OVERVIEW = {
  totalSchemes: 10,
  eligibleSchemes: 7,
  potentialSavings: 1250000,
  applicationsPending: 3,
  msmesSampled: 10000,
  avgParticipationRate: 57.6,
};
