'use client';
import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { SCHEMES } from '@/lib/mock-data';
import {
  CheckCircle2, XCircle, AlertCircle, Filter, Search,
  IndianRupee, ExternalLink, ChevronRight, TrendingUp, Award, Calculator
} from 'lucide-react';
import { cn } from '@/lib/utils';

const STATUS_CONFIG = {
  eligible: {
    label: 'Eligible',
    icon: CheckCircle2,
    badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dotClass: 'bg-emerald-500',
    cardBorder: 'border-emerald-100',
    headerBg: 'bg-emerald-50',
  },
  partial: {
    label: 'Partially Eligible',
    icon: AlertCircle,
    badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
    dotClass: 'bg-amber-500',
    cardBorder: 'border-amber-100',
    headerBg: 'bg-amber-50',
  },
  ineligible: {
    label: 'Not Eligible',
    icon: XCircle,
    badgeClass: 'bg-red-50 text-red-600 border-red-200',
    dotClass: 'bg-red-400',
    cardBorder: 'border-red-100',
    headerBg: 'bg-red-50',
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  'Credit & Finance': 'bg-blue-100 text-blue-700',
  'Food Processing': 'bg-orange-100 text-orange-700',
  'Quality & Certification': 'bg-teal-100 text-teal-700',
  'State Incentive': 'bg-[hsl(215,80%,28%)]/10 text-[hsl(215,80%,28%)]',
  'Technology Upgrade': 'bg-sky-100 text-sky-700',
  'Raw Material': 'bg-lime-100 text-lime-700',
  'Export & Marketing': 'bg-rose-100 text-rose-700',
  'Textile & Handloom': 'bg-purple-100 text-purple-700',
  'Digital & Commerce': 'bg-cyan-100 text-cyan-700',
};

export default function DashboardPage() {
  const [filter, setFilter] = useState<'all' | 'eligible' | 'partial' | 'ineligible'>('all');
  const [search, setSearch] = useState('');

  const filtered = SCHEMES.filter((s) => {
    const matchStatus = filter === 'all' || s.eligibilityStatus === filter;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.fullName.toLowerCase().includes(search.toLowerCase()) ||
      s.category.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const eligible = SCHEMES.filter((s) => s.eligibilityStatus === 'eligible').length;
  const partial = SCHEMES.filter((s) => s.eligibilityStatus === 'partial').length;
  const totalBenefit = SCHEMES
    .filter((s) => s.eligibilityStatus === 'eligible')
    .reduce((sum, s) => sum + s.potentialBenefit, 0);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="gradient-hero">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <Badge variant="outline" className="bg-white/10 border-white/20 text-white mb-3 px-3 py-1">
                Incentive Discovery
              </Badge>
              <h1 className="text-3xl font-bold text-white">Your Eligible Schemes</h1>
              <p className="text-white/70 mt-1">Based on profile: Manufacturing • Hyderabad • GST Registered</p>
            </div>
            <div className="flex gap-3">
              <Link href="/calculator">
                <Button className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-semibold gap-2">
                  <Calculator size={16} />
                  Calculate Savings
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-16">
        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Total Schemes', value: SCHEMES.length, icon: Award, color: 'text-[hsl(215,80%,28%)]', bg: 'bg-blue-50' },
            { label: 'Eligible', value: eligible, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Partial Match', value: partial, icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Max Benefit', value: `₹${(totalBenefit / 100000).toFixed(1)}L`, icon: TrendingUp, color: 'text-[hsl(215,80%,28%)]', bg: 'bg-blue-50' },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center`}>
                    <Icon size={18} className={card.color} />
                  </div>
                </div>
                <div className={`text-2xl font-bold ${card.color} mb-1`}>{card.value}</div>
                <div className="text-xs text-slate-500 font-medium">{card.label}</div>
              </div>
            );
          })}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <Input
              placeholder="Search schemes by name or category…"
              className="pl-9 h-9 border-slate-200 bg-slate-50 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter size={14} className="text-slate-400" />
            {(['all', 'eligible', 'partial', 'ineligible'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 capitalize',
                  filter === f
                    ? 'bg-[hsl(215,80%,28%)] text-white'
                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                )}
              >
                {f === 'all' ? 'All' : f === 'partial' ? 'Partial' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Scheme Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((scheme) => {
            const config = STATUS_CONFIG[scheme.eligibilityStatus];
            const StatusIcon = config.icon;
            return (
              <div
                key={scheme.id}
                className={`bg-white rounded-xl border ${config.cardBorder} shadow-sm overflow-hidden card-hover group`}
              >
                {/* Card header */}
                <div className={`${config.headerBg} px-5 py-4 border-b ${config.cardBorder}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold text-slate-900">{scheme.name}</span>
                        <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border ${config.badgeClass}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${config.dotClass}`} />
                          {config.label}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 truncate">{scheme.fullName}</p>
                    </div>
                    <StatusIcon size={20} className={scheme.eligibilityStatus === 'eligible' ? 'text-emerald-500' : scheme.eligibilityStatus === 'partial' ? 'text-amber-500' : 'text-red-400'} />
                  </div>
                </div>

                {/* Card body */}
                <div className="px-5 py-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-md ${CATEGORY_COLORS[scheme.category] || 'bg-slate-100 text-slate-600'}`}>
                      {scheme.category}
                    </span>
                    <span className="text-xs text-slate-400">{scheme.ministry}</span>
                  </div>

                  <p className="text-sm text-slate-600 leading-relaxed">{scheme.description}</p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                    <div>
                      <div className="text-xs text-slate-400 mb-0.5">Potential Benefit</div>
                      <div className="flex items-center gap-1">
                        <IndianRupee size={13} className="text-emerald-600" />
                        <span className="text-base font-bold text-emerald-600">
                          {scheme.potentialBenefit >= 100000
                            ? `${(scheme.potentialBenefit / 100000).toFixed(1)}L`
                            : `${(scheme.potentialBenefit / 1000).toFixed(0)}K`}
                        </span>
                        <span className="text-xs text-slate-400">({scheme.benefitType})</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant={scheme.eligibilityStatus === 'ineligible' ? 'outline' : 'default'}
                      disabled={scheme.eligibilityStatus === 'ineligible'}
                      className={cn(
                        'gap-1.5 text-xs h-8',
                        scheme.eligibilityStatus !== 'ineligible'
                          ? 'bg-[hsl(215,80%,28%)] hover:bg-[hsl(215,80%,22%)] text-white'
                          : 'text-slate-400'
                      )}
                    >
                      {scheme.eligibilityStatus === 'ineligible' ? 'Not Eligible' : 'Apply Now'}
                      {scheme.eligibilityStatus !== 'ineligible' && <ExternalLink size={12} />}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Search size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium">No schemes match your filter</p>
            <p className="text-sm mt-1">Try adjusting the search or filter criteria</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 bg-[hsl(215,80%,28%)] rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-white font-bold text-lg">See Your Total Financial Opportunity</h3>
            <p className="text-white/70 text-sm mt-1">Calculate the exact rupee value of benefits you may be missing over 3 years.</p>
          </div>
          <Link href="/calculator">
            <Button className="bg-yellow-500 hover:bg-yellow-400 text-blue-900 font-bold gap-2 whitespace-nowrap">
              Open Calculator
              <ChevronRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
