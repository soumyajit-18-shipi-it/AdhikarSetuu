'use client';
import { useState } from 'react';
import Navbar from '@/components/navbar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { DISTRICTS } from '@/lib/mock-data';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell
} from 'recharts';
import {
  AlertTriangle, TrendingUp, TrendingDown, Users, FileCheck,
  CheckCircle2, Building2, Map, Activity, Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

const RISK_CONFIG = {
  low: { label: 'Low Risk', bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', dot: 'bg-emerald-500', bar: 'hsl(162,63%,41%)' },
  medium: { label: 'Medium Risk', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', bar: 'hsl(43,90%,48%)' },
  high: { label: 'High Exclusion Risk', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500', bar: 'hsl(0,72%,51%)' },
};

const CHART_COLORS: Record<string, string> = {
  Hyderabad: 'hsl(215,80%,28%)',
  Warangal: 'hsl(43,90%,48%)',
  Khammam: 'hsl(0,72%,51%)',
  Nizamabad: 'hsl(162,63%,41%)',
  Karimnagar: 'hsl(200,70%,45%)',
};

function formatNum(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(1)}K`;
  return n.toString();
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-xl shadow-lg p-3 text-sm">
        <p className="font-semibold text-slate-900 mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ background: p.fill || p.color }} />
            <span className="text-slate-600">{p.name}:</span>
            <span className="font-semibold text-slate-900">{p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

const PARTICIPATION_CHART_DATA = DISTRICTS.map((d) => ({
  name: d.name,
  registered: d.registeredMSMEs,
  submitted: d.applicationsSubmitted,
  approved: d.approvedApplications,
  rate: d.participationRate,
}));

const EXCLUSION_CHART_DATA = DISTRICTS.map((d) => ({
  name: d.name,
  excluded: d.registeredMSMEs - d.applicationsSubmitted,
  rate: 100 - d.participationRate,
}));

export default function PolicymakerPage() {
  const [activeDistrict, setActiveDistrict] = useState<string | null>('khammam');

  const totalRegistered = DISTRICTS.reduce((sum, d) => sum + d.registeredMSMEs, 0);
  const totalSubmitted = DISTRICTS.reduce((sum, d) => sum + d.applicationsSubmitted, 0);
  const totalApproved = DISTRICTS.reduce((sum, d) => sum + d.approvedApplications, 0);
  const avgParticipation = DISTRICTS.reduce((sum, d) => sum + d.participationRate, 0) / DISTRICTS.length;

  const attentionDistrict = DISTRICTS.find((d) => d.requiresAttention);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="gradient-hero">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Badge variant="outline" className="bg-white/10 border-white/20 text-white mb-3 px-3 py-1">
            Policymaker Dashboard
          </Badge>
          <h1 className="text-3xl font-bold text-white mb-2">MSME Exclusion Detector</h1>
          <p className="text-white/70">District-level analytics to identify policy participation gaps across Telangana.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-16">
        {/* Policy Attention Alert */}
        {attentionDistrict && (
          <div className="bg-red-600 rounded-2xl p-5 mb-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={20} className="text-white" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-bold text-white text-base">{attentionDistrict.name} District</span>
                <Badge className="bg-white/20 text-white border-none text-xs font-bold">Policy Attention Required</Badge>
              </div>
              <p className="text-red-100 text-sm">
                Only <strong className="text-white">{attentionDistrict.participationRate}% participation rate</strong> — {formatNum(attentionDistrict.registeredMSMEs - attentionDistrict.applicationsSubmitted)} registered MSMEs have not submitted applications. Immediate outreach recommended.
              </p>
            </div>
            <Button size="sm" className="bg-white text-red-700 hover:bg-red-50 font-bold whitespace-nowrap">
              View Action Plan
            </Button>
          </div>
        )}

        {/* Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Registered MSMEs', value: formatNum(totalRegistered), sub: 'Across 5 districts', icon: Building2, color: 'text-[hsl(215,80%,28%)]', bg: 'bg-blue-50' },
            { label: 'Applications Submitted', value: formatNum(totalSubmitted), sub: `${((totalSubmitted / totalRegistered) * 100).toFixed(1)}% of registered`, icon: FileCheck, color: 'text-amber-600', bg: 'bg-amber-50' },
            { label: 'Approved Applications', value: formatNum(totalApproved), sub: `${((totalApproved / totalSubmitted) * 100).toFixed(1)}% approval rate`, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50' },
            { label: 'Avg Participation Rate', value: `${avgParticipation.toFixed(1)}%`, sub: 'Telangana average', icon: Activity, color: 'text-[hsl(215,80%,28%)]', bg: 'bg-blue-50' },
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-9 h-9 rounded-lg ${card.bg} flex items-center justify-center`}>
                    <Icon size={18} className={card.color} />
                  </div>
                </div>
                <div className={`text-2xl font-bold ${card.color} mb-0.5`}>{card.value}</div>
                <div className="text-xs text-slate-500 font-medium">{card.label}</div>
                <div className="text-xs text-slate-400 mt-0.5">{card.sub}</div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left: Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Participation bar chart */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-slate-900">MSME Participation by District</h3>
                  <p className="text-sm text-slate-400 mt-0.5">Registered vs. Submitted vs. Approved</p>
                </div>
                <Map size={18} className="text-[hsl(215,80%,28%)]" />
              </div>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={PARTICIPATION_CHART_DATA} barSize={12}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={formatNum} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="registered" name="Registered" fill="hsl(215,15%,85%)" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="submitted" name="Submitted" fill="hsl(215,80%,28%)" radius={[3, 3, 0, 0]} />
                  <Bar dataKey="approved" name="Approved" fill="hsl(162,63%,41%)" radius={[3, 3, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Exclusion risk chart */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="font-bold text-slate-900">Exclusion Burden by District</h3>
                  <p className="text-sm text-slate-400 mt-0.5">MSMEs not yet reached by any scheme</p>
                </div>
                <TrendingDown size={18} className="text-red-500" />
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={EXCLUSION_CHART_DATA} barSize={28} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={formatNum} />
                  <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} width={80} />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="excluded" name="Excluded MSMEs" radius={[0, 4, 4, 0]}>
                    {EXCLUSION_CHART_DATA.map((entry, index) => (
                      <Cell
                        key={index}
                        fill={DISTRICTS[index].exclusionRisk === 'high' ? 'hsl(0,72%,51%)' : DISTRICTS[index].exclusionRisk === 'medium' ? 'hsl(43,90%,48%)' : 'hsl(162,63%,41%)'}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Right: District heatmap cards */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="font-bold text-slate-900">District Risk Heatmap</h3>
              <Info size={14} className="text-slate-400" />
            </div>

            {DISTRICTS.map((district) => {
              const config = RISK_CONFIG[district.exclusionRisk];
              const isActive = activeDistrict === district.id;

              return (
                <div
                  key={district.id}
                  className={cn(
                    'rounded-xl border p-4 cursor-pointer transition-all duration-200',
                    isActive ? `${config.bg} ${config.border} shadow-md` : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm',
                    district.requiresAttention && 'ring-2 ring-red-500 ring-offset-1'
                  )}
                  onClick={() => setActiveDistrict(isActive ? null : district.id)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className={`w-2.5 h-2.5 rounded-full ${config.dot} flex-shrink-0`} />
                      <span className="font-bold text-slate-900">{district.name}</span>
                      {district.requiresAttention && (
                        <AlertTriangle size={13} className="text-red-500" />
                      )}
                    </div>
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${config.bg} ${config.text} border ${config.border}`}>
                      {district.participationLevel}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-slate-400">Registered</span>
                      <div className="font-bold text-slate-900">{formatNum(district.registeredMSMEs)}</div>
                    </div>
                    <div>
                      <span className="text-slate-400">Participation</span>
                      <div className={`font-bold ${config.text}`}>{district.participationRate}%</div>
                    </div>
                  </div>

                  {/* Participation bar */}
                  <div className="mt-3">
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${config.dot}`}
                        style={{ width: `${district.participationRate}%` }}
                      />
                    </div>
                  </div>

                  {isActive && (
                    <div className="mt-3 pt-3 border-t border-slate-200 space-y-1.5 text-xs">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Top Sector</span>
                        <span className="font-semibold text-slate-700">{district.topSector}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Applications Submitted</span>
                        <span className="font-semibold text-slate-700">{formatNum(district.applicationsSubmitted)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Approved</span>
                        <span className="font-semibold text-emerald-600">{formatNum(district.approvedApplications)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Fund Utilization</span>
                        <span className="font-semibold text-slate-700">{district.fundUtilization}%</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

            {/* Legend */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mt-2">
              <p className="text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">Risk Legend</p>
              <div className="space-y-2">
                {Object.entries(RISK_CONFIG).map(([key, val]) => (
                  <div key={key} className="flex items-center gap-2 text-xs">
                    <span className={`w-2 h-2 rounded-full ${val.dot}`} />
                    <span className="text-slate-600">{val.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recommendations */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              icon: AlertTriangle,
              title: 'Urgent: Khammam Outreach',
              desc: 'Only 31.5% participation. Launch targeted MSME camps in Khammam district with DIC support.',
              color: 'border-red-200 bg-red-50',
              iconBg: 'bg-red-100',
              iconColor: 'text-red-600',
            },
            {
              icon: TrendingUp,
              title: 'Karimnagar: Mid-term Focus',
              desc: '43.1% participation with 16,780 registered MSMEs. Simplified application drives can push rate to 65%.',
              color: 'border-amber-200 bg-amber-50',
              iconBg: 'bg-amber-100',
              iconColor: 'text-amber-600',
            },
            {
              icon: Users,
              title: 'Hyderabad: Sustain Momentum',
              desc: '86.1% participation rate. Focus on improving approval rates and expanding to micro enterprises.',
              color: 'border-emerald-200 bg-emerald-50',
              iconBg: 'bg-emerald-100',
              iconColor: 'text-emerald-600',
            },
          ].map((rec, i) => {
            const Icon = rec.icon;
            return (
              <div key={i} className={`rounded-xl border ${rec.color} p-5`}>
                <div className={`w-9 h-9 rounded-lg ${rec.iconBg} flex items-center justify-center mb-3`}>
                  <Icon size={18} className={rec.iconColor} />
                </div>
                <h4 className="font-bold text-slate-900 text-sm mb-2">{rec.title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{rec.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
