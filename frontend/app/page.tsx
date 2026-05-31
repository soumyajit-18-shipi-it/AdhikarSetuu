'use client';
import Link from 'next/link';
import { ArrowRight, Search, Calculator, Brain, BarChart3, Shield, CheckCircle2, TrendingUp, Users, Building2, Star, ChevronRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/navbar';

const FEATURES = [
  {
    icon: Search,
    title: 'Incentive Discovery',
    description: 'AI matches your business profile to 500+ government schemes across central and state ministries.',
    color: 'bg-blue-50 text-blue-700',
    accent: 'border-blue-100',
    stat: '10+ schemes matched instantly',
  },
  {
    icon: Calculator,
    title: 'Financial Loss Calculator',
    description: 'See exactly how much government support you are missing over 3 years with itemized breakdowns.',
    color: 'bg-amber-50 text-amber-700',
    accent: 'border-amber-100',
    stat: '₹12.5L avg opportunity found',
  },
  {
    icon: Brain,
    title: 'AI Rejection Explainer',
    description: 'Upload rejection notices. Our AI translates bureaucratic language into plain, actionable steps.',
    color: 'bg-emerald-50 text-emerald-700',
    accent: 'border-emerald-100',
    stat: '3 min average resolution time',
  },
  {
    icon: BarChart3,
    title: 'MSME Exclusion Intelligence',
    description: 'District-level analytics to identify policy participation gaps and systemic exclusion risks.',
    color: 'bg-rose-50 text-rose-700',
    accent: 'border-rose-100',
    stat: '5 Telangana districts tracked',
  },
];

const STATS = [
  { value: '10,000+', label: 'MSMEs Analyzed', icon: Users },
  { value: '₹847 Cr', label: 'Benefits Identified', icon: TrendingUp },
  { value: '500+', label: 'Schemes Tracked', icon: Shield },
  { value: '94%', label: 'Match Accuracy', icon: Star },
];

const HOW_IT_WORKS = [
  { step: '01', title: 'Enter Your Profile', desc: 'Fill in basic business details — sector, turnover, employees, location.' },
  { step: '02', title: 'Get Matched', desc: 'Our engine cross-references 500+ schemes against your eligibility criteria.' },
  { step: '03', title: 'Calculate Impact', desc: 'See the total financial opportunity you are missing in real rupees.' },
  { step: '04', title: 'Take Action', desc: 'Follow AI-generated checklists to apply and resolve rejections fast.' },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <div className="gradient-hero relative overflow-hidden">
        <Navbar />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-yellow-500/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-white/85 text-sm font-medium mb-8 backdrop-blur-sm">
              <Zap size={13} className="text-yellow-400" />
              CivicTech Hackathon 2024 — Telangana Focus
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-white leading-tight tracking-tight mb-6">
              Discover Government{' '}
              <span className="text-yellow-400 relative">
                Benefits
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" fill="none">
                  <path d="M2 9C50 4 100 2 150 6C200 10 250 8 298 4" stroke="#FBBF24" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </span>{' '}
              Your Business Is Missing
            </h1>

            <p className="text-xl text-white/70 max-w-2xl leading-relaxed mb-10">
              AI-powered incentive discovery and compliance intelligence for MSMEs. Stop leaving government money on the table.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/profile">
                <Button
                  size="lg"
                  className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold text-base h-12 px-8 gap-2 shadow-lg transition-all duration-300"
                >
                  Check My Eligibility
                  <ArrowRight size={18} />
                </Button>
              </Link>
              <Link href="/policymaker">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white bg-white/10 hover:bg-white/20 font-semibold text-base h-12 px-8 gap-2 backdrop-blur-sm"
                >
                  Policymaker View
                  <BarChart3 size={18} />
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-white/50 text-sm">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" /> No registration required</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" /> Instant results</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={14} className="text-emerald-400" /> Free to use</span>
            </div>
          </div>
        </div>

        <div className="max-w-5xl mx-auto px-4 pb-0 relative z-10">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-t from-[hsl(215,80%,20%)] to-transparent z-10 pointer-events-none rounded-t-2xl" />
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-t-2xl p-4 shadow-2xl">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <div className="flex-1 bg-white/10 rounded h-5 ml-2" />
              </div>
              <div className="grid grid-cols-4 gap-3 mb-3">
                {['CGTMSE', 'PMFME', 'ZED Cert', 'TS-iPASS'].map((item, i) => (
                  <div key={i} className="bg-white/10 rounded-lg p-3 border border-white/10">
                    <div className="w-8 h-8 rounded-md bg-white/20 mb-2" />
                    <div className="text-white text-xs font-medium">{item}</div>
                    <div className="text-emerald-400 text-xs mt-0.5">Eligible</div>
                  </div>
                ))}
              </div>
              <div className="bg-white/10 rounded-lg h-24 border border-white/10" />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[hsl(215,80%,28%)] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-white/60 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50 mb-4 px-3 py-1">
              Platform Features
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Everything MSMEs Need to Claim Their Rights
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto">
              From discovery to application, our platform handles the entire lifecycle of government benefit access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {FEATURES.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <div key={i} className={`bg-white rounded-2xl p-8 border ${feature.accent} card-hover group cursor-pointer`}>
                  <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon size={22} />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-500 leading-relaxed">{feature.description}</p>
                  <div className="mt-5 pt-5 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-sm font-semibold text-slate-400">{feature.stat}</span>
                    <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all duration-300" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="outline" className="text-blue-700 border-blue-200 bg-blue-50 mb-4 px-3 py-1">
              How It Works
            </Badge>
            <h2 className="text-4xl font-bold text-slate-900 mb-4">From Profile to Benefits in 4 Steps</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((item, i) => (
              <div key={i} className="relative">
                <div className="w-16 h-16 rounded-2xl bg-[hsl(215,80%,28%)] flex items-center justify-center mb-5 shadow-lg">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="py-24 gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-64 h-64 rounded-full bg-yellow-500/10 blur-3xl" />
        </div>
        <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Your Business Deserves Every Rupee It Is Owed
          </h2>
          <p className="text-xl text-white/70 mb-10">
            Join thousands of MSMEs discovering hidden government benefits with Adhikar Setu.
          </p>
          <Link href="/profile">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold text-lg h-14 px-10 gap-2 shadow-2xl transition-all duration-300"
            >
              Start Free Assessment
              <ArrowRight size={20} />
            </Button>
          </Link>
          <p className="text-white/40 text-sm mt-6">No signup. No credit card. Instant results.</p>
        </div>
      </div>

      <footer className="bg-slate-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[hsl(215,80%,28%)] flex items-center justify-center">
                <Building2 size={16} className="text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-base">Adhikar Setu</div>
                <div className="text-white/40 text-xs">MSME Intelligence Platform</div>
              </div>
            </div>
            <div className="flex gap-6 text-sm text-white/40">
              <span>Built for CivicTech Hackathon 2024</span>
              <span>•</span>
              <span>Telangana-focused PoC</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
