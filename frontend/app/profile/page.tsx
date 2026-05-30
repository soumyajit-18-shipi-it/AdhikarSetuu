'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { SECTORS, TELANGANA_DISTRICTS } from '@/lib/mock-data';
import { Building2, MapPin, Users, IndianRupee, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    businessName: '',
    sector: '',
    annualTurnover: '',
    employees: '',
    gstRegistered: '',
    exporter: '',
    womenOwned: '',
    district: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2000));
    router.push('/dashboard');
  };

  const isComplete = Object.values(form).every(Boolean);

  const completedFields = Object.values(form).filter(Boolean).length;
  const progress = (completedFields / 8) * 100;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="gradient-hero">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl">
            <Badge variant="outline" className="bg-white/10 border-white/20 text-white mb-4 px-3 py-1">
              Step 1 of 4
            </Badge>
            <h1 className="text-4xl font-bold text-white mb-3">Build Your MSME Profile</h1>
            <p className="text-white/70 text-lg">
              Share your business details so we can match you with eligible government schemes.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
              {/* Progress bar */}
              <div className="h-1.5 bg-slate-100">
                <div
                  className="h-full bg-[hsl(215,80%,28%)] transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <form onSubmit={handleSubmit} className="p-8">
                <div className="space-y-6">
                  {/* Business Name */}
                  <div className="space-y-2">
                    <Label htmlFor="businessName" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <Building2 size={14} className="text-slate-400" />
                      Business Name
                    </Label>
                    <Input
                      id="businessName"
                      placeholder="e.g. Sri Lakshmi Textiles Pvt. Ltd."
                      className="h-11 border-slate-200 focus:border-[hsl(215,80%,28%)] focus:ring-[hsl(215,80%,28%)]/20"
                      value={form.businessName}
                      onChange={(e) => setForm({ ...form, businessName: e.target.value })}
                      required
                    />
                  </div>

                  {/* Sector */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700">Sector / Industry</Label>
                    <Select value={form.sector} onValueChange={(v) => setForm({ ...form, sector: v })}>
                      <SelectTrigger className="h-11 border-slate-200 focus:border-[hsl(215,80%,28%)]">
                        <SelectValue placeholder="Select your sector" />
                      </SelectTrigger>
                      <SelectContent>
                        {SECTORS.map((s) => (
                          <SelectItem key={s} value={s}>{s}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Turnover & Employees */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <IndianRupee size={14} className="text-slate-400" />
                        Annual Turnover
                      </Label>
                      <Select value={form.annualTurnover} onValueChange={(v) => setForm({ ...form, annualTurnover: v })}>
                        <SelectTrigger className="h-11 border-slate-200">
                          <SelectValue placeholder="Select range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="under-5l">Under ₹5 Lakh</SelectItem>
                          <SelectItem value="5l-25l">₹5L – ₹25 Lakh</SelectItem>
                          <SelectItem value="25l-1cr">₹25L – ₹1 Crore</SelectItem>
                          <SelectItem value="1cr-5cr">₹1 Cr – ₹5 Crore</SelectItem>
                          <SelectItem value="5cr-10cr">₹5 Cr – ₹10 Crore</SelectItem>
                          <SelectItem value="above-10cr">Above ₹10 Crore</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                        <Users size={14} className="text-slate-400" />
                        Number of Employees
                      </Label>
                      <Select value={form.employees} onValueChange={(v) => setForm({ ...form, employees: v })}>
                        <SelectTrigger className="h-11 border-slate-200">
                          <SelectValue placeholder="Select count" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-5">1 – 5</SelectItem>
                          <SelectItem value="6-20">6 – 20</SelectItem>
                          <SelectItem value="21-50">21 – 50</SelectItem>
                          <SelectItem value="51-100">51 – 100</SelectItem>
                          <SelectItem value="101-250">101 – 250</SelectItem>
                          <SelectItem value="above-250">Above 250</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Yes/No questions */}
                  <div className="space-y-4">
                    <Label className="text-sm font-semibold text-slate-700">Additional Details</Label>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {[
                        { key: 'gstRegistered', label: 'GST Registered?' },
                        { key: 'exporter', label: 'Are you an Exporter?' },
                        { key: 'womenOwned', label: 'Women-Owned Business?' },
                      ].map(({ key, label }) => (
                        <div key={key} className="space-y-2">
                          <span className="text-xs font-medium text-slate-500">{label}</span>
                          <div className="flex gap-2">
                            {['Yes', 'No'].map((opt) => (
                              <button
                                key={opt}
                                type="button"
                                onClick={() => setForm({ ...form, [key]: opt.toLowerCase() })}
                                className={cn(
                                  'flex-1 py-2 px-3 text-sm font-medium rounded-lg border transition-all duration-200',
                                  form[key as keyof typeof form] === opt.toLowerCase()
                                    ? 'bg-[hsl(215,80%,28%)] text-white border-[hsl(215,80%,28%)] shadow-sm'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-[hsl(215,80%,28%)]/40 hover:text-[hsl(215,80%,28%)]'
                                )}
                              >
                                {opt}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* District */}
                  <div className="space-y-2">
                    <Label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                      <MapPin size={14} className="text-slate-400" />
                      District (Telangana)
                    </Label>
                    <Select value={form.district} onValueChange={(v) => setForm({ ...form, district: v })}>
                      <SelectTrigger className="h-11 border-slate-200">
                        <SelectValue placeholder="Select your district" />
                      </SelectTrigger>
                      <SelectContent>
                        {TELANGANA_DISTRICTS.map((d) => (
                          <SelectItem key={d} value={d}>{d}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Submit */}
                  <div className="pt-2">
                    <Button
                      type="submit"
                      disabled={!isComplete || loading}
                      className="w-full h-12 bg-[hsl(215,80%,28%)] hover:bg-[hsl(215,80%,22%)] text-white font-bold text-base gap-2 disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 size={18} className="animate-spin" />
                          Analyzing your profile…
                        </>
                      ) : (
                        <>
                          Find My Eligible Schemes
                          <ArrowRight size={18} />
                        </>
                      )}
                    </Button>
                    {!isComplete && (
                      <p className="text-xs text-slate-400 text-center mt-2">
                        Please fill all fields to continue ({8 - completedFields} remaining)
                      </p>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Progress */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <h3 className="font-semibold text-slate-900 mb-4">Profile Completion</h3>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">{completedFields} of 8 fields</span>
                  <span className="font-semibold text-[hsl(215,80%,28%)]">{Math.round(progress)}%</span>
                </div>
                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[hsl(215,80%,28%)] rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2">
                {Object.entries({
                  businessName: 'Business Name',
                  sector: 'Sector',
                  annualTurnover: 'Annual Turnover',
                  employees: 'Employees',
                  gstRegistered: 'GST Status',
                  exporter: 'Export Status',
                  womenOwned: 'Ownership Type',
                  district: 'District',
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center gap-2 text-sm">
                    <CheckCircle2
                      size={14}
                      className={form[key as keyof typeof form] ? 'text-emerald-500' : 'text-slate-200'}
                    />
                    <span className={form[key as keyof typeof form] ? 'text-slate-700' : 'text-slate-400'}>
                      {label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why we ask */}
            <div className="bg-blue-50 rounded-2xl border border-blue-100 p-6">
              <h3 className="font-semibold text-blue-900 mb-3">Why do we ask this?</h3>
              <ul className="space-y-2 text-sm text-blue-700">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  Sector determines which ministry schemes apply.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  Turnover classifies Micro, Small, or Medium status.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  Women-owned businesses qualify for exclusive schemes.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-0.5">•</span>
                  District unlocks Telangana state-level incentives.
                </li>
              </ul>
            </div>

            <div className="bg-amber-50 rounded-2xl border border-amber-100 p-6">
              <div className="text-3xl font-bold text-amber-600 mb-1">₹12.5L</div>
              <div className="text-sm text-amber-700 font-medium">Average missed benefits per MSME per 3 years</div>
              <div className="text-xs text-amber-600 mt-2">Based on analysis of 10,000 MSMEs in Telangana</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
