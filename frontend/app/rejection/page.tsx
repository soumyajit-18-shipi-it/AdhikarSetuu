'use client';
import { useState } from 'react';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { REJECTION_NOTICE } from '@/lib/mock-data';
import {
  Upload, FileText, Brain, AlertTriangle, CheckCircle2,
  Circle, ChevronDown, ChevronUp, Sparkles, FileWarning, RefreshCw, Info
} from 'lucide-react';
import { cn } from '@/lib/utils';

const SEVERITY_CONFIG = {
  critical: { label: 'Critical', bg: 'bg-red-50', border: 'border-red-200', text: 'text-red-700', dot: 'bg-red-500', badge: 'bg-red-100 text-red-700' },
  moderate: { label: 'Moderate', bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', dot: 'bg-amber-500', badge: 'bg-amber-100 text-amber-700' },
};

export default function RejectionPage() {
  const [uploaded, setUploaded] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(true);
  const [expanded, setExpanded] = useState<number[]>([1, 2, 3]);
  const [checklist, setChecklist] = useState<number[]>([]);

  const toggleExpand = (id: number) => {
    setExpanded((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const toggleCheck = (id: number) => {
    setChecklist((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  const completedCount = checklist.length;
  const totalCount = REJECTION_NOTICE.aiExplanation.requiredFixes.length;

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="gradient-hero">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <Badge variant="outline" className="bg-white/10 border-white/20 text-white mb-3 px-3 py-1">
            AI Rejection Explainer
          </Badge>
          <h1 className="text-3xl font-bold text-white mb-2">Understand Your Rejection Notice</h1>
          <p className="text-white/70">Upload any government rejection letter. Our AI explains it in plain language.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 pb-16">
        {/* Upload zone */}
        {!uploaded && (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 shadow-sm p-16 text-center mb-8 hover:border-[hsl(215,80%,28%)] transition-colors group cursor-pointer">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-5 group-hover:bg-blue-50 transition-colors">
              <Upload size={24} className="text-slate-400 group-hover:text-[hsl(215,80%,28%)]" />
            </div>
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Upload Rejection Document</h3>
            <p className="text-slate-500 text-sm mb-6 max-w-sm mx-auto">
              Drag and drop your PDF rejection notice, or click to browse. Supported: PDF, DOCX, JPG
            </p>
            <Button
              className="bg-[hsl(215,80%,28%)] hover:bg-[hsl(215,80%,22%)] text-white gap-2"
              onClick={() => setUploaded(true)}
            >
              <Upload size={16} />
              Choose File
            </Button>
          </div>
        )}

        {/* Uploaded state */}
        {uploaded && (
          <>
            {/* Document info bar */}
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 mb-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center">
                  <FileText size={18} className="text-red-500" />
                </div>
                <div>
                  <div className="font-semibold text-slate-900 text-sm">{REJECTION_NOTICE.documentName}</div>
                  <div className="text-xs text-slate-400">24 KB • PDF • Uploaded just now</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {analyzed && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full">
                    <Sparkles size={12} />
                    AI Analysis Complete
                  </span>
                )}
                <Button
                  variant="outline"
                  size="sm"
                  className="text-slate-500 border-slate-200 gap-1.5"
                  onClick={() => { setUploaded(false); setAnalyzed(false); }}
                >
                  <RefreshCw size={12} />
                  New Upload
                </Button>
              </div>
            </div>

            {/* Summary banner */}
            {analyzed && (
              <div className="bg-[hsl(215,80%,28%)] rounded-2xl p-6 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
                    <Brain size={22} className="text-white" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-lg">{REJECTION_NOTICE.aiExplanation.summary}</div>
                    <div className="text-white/60 text-sm mt-0.5">
                      2 critical issues • 1 moderate issue • Fixable in ~3 days
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-white">{completedCount}/{totalCount}</div>
                    <div className="text-white/60 text-xs">Fixes Done</div>
                  </div>
                </div>
              </div>
            )}

            {/* Split screen */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* LEFT: Original Notice */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
                  <FileWarning size={18} className="text-red-500" />
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">Original Government Notice</h3>
                    <p className="text-xs text-slate-400">DIC/HYD/CGTMSE/2024/8821</p>
                  </div>
                  <Badge variant="outline" className="ml-auto text-red-600 border-red-200 bg-red-50 text-xs">
                    Official Document
                  </Badge>
                </div>
                <div className="p-6">
                  <pre className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap font-mono bg-slate-50 rounded-xl p-4 border border-slate-200 max-h-[520px] overflow-y-auto">
                    {REJECTION_NOTICE.originalText}
                  </pre>
                </div>
              </div>

              {/* RIGHT: AI Explanation */}
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200 flex items-center gap-3 bg-gradient-to-r from-blue-50 to-slate-50">
                  <div className="w-7 h-7 rounded-lg bg-[hsl(215,80%,28%)] flex items-center justify-center">
                    <Sparkles size={14} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">AI Plain-Language Explanation</h3>
                    <p className="text-xs text-slate-400">Powered by Adhikar Setu Intelligence</p>
                  </div>
                </div>

                <div className="p-6 space-y-4 max-h-[580px] overflow-y-auto">
                  {REJECTION_NOTICE.aiExplanation.reasons.map((reason) => {
                    const config = SEVERITY_CONFIG[reason.severity];
                    const isOpen = expanded.includes(reason.id);
                    return (
                      <div key={reason.id} className={`rounded-xl border ${config.border} overflow-hidden`}>
                        <button
                          className={`w-full ${config.bg} px-4 py-3 flex items-center gap-3 text-left`}
                          onClick={() => toggleExpand(reason.id)}
                        >
                          <span className={`w-2 h-2 rounded-full ${config.dot} flex-shrink-0`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`font-bold text-sm ${config.text}`}>{reason.title}</span>
                              <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${config.badge}`}>
                                {config.label}
                              </span>
                            </div>
                            <p className="text-xs text-slate-500 mt-0.5 truncate">{reason.original}</p>
                          </div>
                          {isOpen ? <ChevronUp size={16} className="text-slate-400 flex-shrink-0" /> : <ChevronDown size={16} className="text-slate-400 flex-shrink-0" />}
                        </button>
                        {isOpen && (
                          <div className="px-4 py-4 bg-white space-y-3">
                            <div className="flex items-start gap-2 text-sm text-slate-600">
                              <Info size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
                              <p className="leading-relaxed">{reason.plain}</p>
                            </div>
                            <div className={`${config.bg} rounded-lg px-4 py-3 border ${config.border}`}>
                              <p className="text-xs font-semibold text-slate-500 mb-1.5 uppercase tracking-wide">How to Fix</p>
                              <p className={`text-sm font-medium ${config.text}`}>{reason.fix}</p>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Checklist */}
            <div className="mt-6 bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Required Action Checklist</h3>
                  <p className="text-sm text-slate-400 mt-0.5">Complete these steps to successfully reapply</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-[hsl(215,80%,28%)]">{completedCount}/{totalCount}</div>
                  <div className="text-xs text-slate-400">Completed</div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${(completedCount / totalCount) * 100}%` }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {REJECTION_NOTICE.aiExplanation.requiredFixes.map((fix) => {
                  const done = checklist.includes(fix.id);
                  return (
                    <button
                      key={fix.id}
                      onClick={() => toggleCheck(fix.id)}
                      className={cn(
                        'flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-200',
                        done
                          ? 'bg-emerald-50 border-emerald-200'
                          : 'bg-slate-50 border-slate-200 hover:border-[hsl(215,80%,28%)]/40 hover:bg-blue-50/30'
                      )}
                    >
                      {done ? (
                        <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0" />
                      ) : (
                        <Circle size={18} className="text-slate-300 flex-shrink-0" />
                      )}
                      <span className={cn('text-sm font-medium leading-snug', done ? 'text-emerald-700 line-through decoration-emerald-300' : 'text-slate-700')}>
                        {fix.text}
                      </span>
                    </button>
                  );
                })}
              </div>

              {completedCount === totalCount && (
                <div className="mt-5 bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-emerald-500 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-emerald-800">All steps complete! You are ready to reapply.</p>
                    <p className="text-sm text-emerald-600 mt-0.5">Submit your revised application to DIC Hyderabad before 18 January 2025.</p>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
