'use client';
import Link from 'next/link';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';
import { useProfile } from '@/hooks/useProfile';
import { calculateLoss, type ProfilePayload } from '@/services/api';
import { CALCULATOR_DATA as MOCK_CALCULATOR } from '@/lib/mock-data';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, AreaChart, Area,
} from 'recharts';
import { IndianRupee, TrendingUp, AlertTriangle, CheckCircle2, ArrowRight, Info } from 'lucide-react';

const SCHEME_ROWS = [
  { scheme: 'CGTMSE', year1: 120000, year2: 180000, year3: 200000, total: 500000, status: 'eligible' },
  { scheme: 'PMFME', year1: 200000, year2: 150000, year3: 100000, total: 450000, status: 'eligible' },
  { scheme: 'ZED Cert', year1: 40000, year2: 40000, year3: 0, total: 80000, status: 'eligible' },
  { scheme: 'TS-iPASS', year1: 60000, year2: 80000, year3: 110000, total: 250000, status: 'eligible' },
  { scheme: 'MUDRA', year1: 50000, year2: 50000, year3: 50000, total: 150000, status: 'eligible' },
];

function formatRupees(val: number) {
  if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
  if (val >= 1000) return `₹${(val / 1000).toFixed(0)}K`;
  return `₹${val}`;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-sm">
        <p className="font-semibold text-slate-900 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="font-medium">
            {p.name}: {formatRupees(p.value)}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function CalculatorPage() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const { profile } = useProfile();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile) return;
    const currentProfile = profile as ProfilePayload;
    let mounted = true;
    async function load() {
      setLoading(true);
      try {
        const res = await calculateLoss(currentProfile);
        if (!mounted) return;
        setData(res);
        setError(null);
      } catch (e) {
        console.error(e);
        setError('Failed to calculate loss — using demo estimates');
        // fallback to demo data
        setData(MOCK_CALCULATOR as any);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => { mounted = false; };
  }, [profile]);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="gradient-hero">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Badge variant="outline" className="bg-white/10 border-white/20 text-white mb-3 px-3 py-1">
            Financial Loss Calculator
          </Badge>
          <h1 className="text-3xl font-bold text-white mb-2">Your Missed Financial Opportunity</h1>
          <p className="text-white/70">Cumulative government support available to your MSME over the next 3 years.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-16">
        {/* Hero Financial Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden mb-8">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 text-red-700">
              <div className="flex items-center justify-between">
                <div>
                  <strong>Error:</strong> {error}
                </div>
                <div>
                  <Button size="sm" variant="outline" onClick={() => window.location.reload()}>Retry</Button>
                </div>
              </div>
            </div>
          )}
          <div className="bg-gradient-to-r from-[hsl(215,80%,28%)] to-[hsl(215,75%,20%)] p-8 md:p-12">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <p className="text-white/70 text-base font-medium mb-2 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-yellow-400" />
                  You may be missing
                </p>
                <div className="flex items-end gap-3 mb-3">
                  {loading ? (
                    <div className="h-14 w-72 bg-white/20 rounded animate-pulse" />
                  ) : (
                    <span className="text-6xl md:text-7xl font-bold text-white tracking-tight">{data ? `₹${(data.totalPotential || 0).toLocaleString()}` : '—'}</span>
                  )}
                </div>
                <p className="text-white/70 text-lg">in available government support over the next 3 years</p>
                <div className="flex items-center gap-2 mt-4">
                  <CheckCircle2 size={15} className="text-emerald-400" />
                  <span className="text-white/60 text-sm">Based on {data ? (data.breakdown?.length || 0) : '—'} eligible schemes matched to your profile</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 md:min-w-64">
                {[
                  { label: 'Year 1', amount: 470000 },
                  { label: 'Year 2', amount: 500000 },
                  { label: 'Year 3', amount: 460000 },
                  { label: '3-Year Total', amount: 1250000 },
                ].map((item, i) => (
                  <div key={i} className="glass-card rounded-xl p-4 text-center">
                    <div className={`font-bold text-white ${i === 3 ? 'text-xl' : 'text-lg'}`}>
                      {formatRupees(item.amount)}
                    </div>
                    <div className="text-white/50 text-xs mt-0.5">{item.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action bar */}
          <div className="px-8 py-4 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Info size={14} />
              These are conservative estimates. Actual benefits may vary based on application quality.
            </div>
            <Link href="/dashboard">
              <Button size="sm" className="bg-[hsl(215,80%,28%)] hover:bg-[hsl(215,80%,22%)] text-white gap-2">
                View All Schemes
                <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Cumulative growth chart */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-slate-900">Cumulative Benefit Accrual</h3>
                  <p className="text-sm text-slate-400 mt-0.5">Total government support over 36 months</p>
                </div>
                <TrendingUp size={18} className="text-[hsl(215,80%,28%)]" />
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={data?.cumulativeChart || []}>
                  <defs>
                    <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(215,80%,28%)" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="hsl(215,80%,28%)" stopOpacity={0.02} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="period" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#94a3b8' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) => formatRupees(v)}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type="monotone"
                    dataKey="amount"
                    name="Cumulative Benefit"
                    stroke="hsl(215,80%,28%)"
                    strokeWidth={2.5}
                    fill="url(#areaGradient)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Year-by-year bar chart */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-slate-900">Scheme-wise Annual Benefits</h3>
                  <p className="text-sm text-slate-400 mt-0.5">Breakdown by scheme across 3 years</p>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={240}>
                {loading ? (
                  <div className="h-48 flex items-center justify-center">Loading chart…</div>
                ) : (
                  <BarChart data={data?.breakdown || []} barSize={14}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="scheme" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(v) => formatRupees(v)} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="year1" name="Year 1" fill="hsl(215,80%,28%)" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="year2" name="Year 2" fill="hsl(43,90%,48%)" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="year3" name="Year 3" fill="hsl(162,63%,41%)" radius={[3, 3, 0, 0]} />
                    <Legend wrapperStyle={{ fontSize: 11, paddingTop: 12 }} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: Pie + breakdown */}
          <div className="space-y-6">
            {/* Pie Chart */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-1">Scheme Contribution</h3>
              <p className="text-sm text-slate-400 mb-4">Share of total ₹12.5L opportunity</p>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={data?.pieData || []}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={85}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {(data?.pieData || []).map((entry: any, index: number) => (
                      <Cell key={index} fill={entry.color || '#ccc'} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: number) => formatRupees(val)} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {(data?.pieData || []).map((d: any, i: number) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: d.color }} />
                      <span className="text-slate-600">{d.name}</span>
                    </div>
                    <span className="font-semibold text-slate-900">{formatRupees(d.value)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Scheme table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-bold text-slate-900 mb-4">Benefit Breakdown</h3>
              <div className="space-y-3">
                {(data?.breakdown || []).map((row: any, i: number) => (
                  <div key={i} className="flex items-center justify-between text-sm border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                    <div>
                      <div className="font-semibold text-slate-900">{row.scheme}</div>
                      <div className="text-xs text-slate-400">3-year total</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-emerald-600">{formatRupees(row.total)}</div>
                      <div className="text-xs text-slate-400">
                        {formatRupees(row.year1)} / {formatRupees(row.year2)} / {formatRupees(row.year3)}
                      </div>
                    </div>
                  </div>
                ))}
                <div className="flex items-center justify-between pt-2 border-t-2 border-[hsl(215,80%,28%)]">
                  <div className="font-bold text-slate-900">Grand Total</div>
                  <div className="font-bold text-[hsl(215,80%,28%)] text-lg">{data ? formatRupees(data.totalPotential || 0) : '—'}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-8 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={18} className="text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-amber-900">Got a Rejection Notice?</h3>
              <p className="text-sm text-amber-700 mt-0.5">
                Upload your rejection document and get an AI-powered plain-language explanation with fix steps.
              </p>
            </div>
          </div>
          <Link href="/rejection">
            <Button className="bg-amber-500 hover:bg-amber-400 text-white font-bold gap-2 whitespace-nowrap">
              Explain My Rejection
              <ArrowRight size={16} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
