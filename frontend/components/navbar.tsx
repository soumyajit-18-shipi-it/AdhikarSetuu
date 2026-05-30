'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Building2, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const NAV_LINKS = [
  { href: '/dashboard', label: 'Incentives' },
  { href: '/calculator', label: 'Calculator' },
  { href: '/rejection', label: 'AI Explainer' },
  { href: '/policymaker', label: 'Policymaker' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isLanding = pathname === '/';

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        isLanding
          ? 'bg-transparent border-b border-white/10'
          : 'bg-white/95 backdrop-blur-sm border-b border-slate-200 shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-[hsl(215,80%,28%)] flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
              <Building2 className="w-4.5 h-4.5 text-white" size={18} />
            </div>
            <div className="flex flex-col leading-none">
              <span className={cn('font-bold text-base tracking-tight', isLanding ? 'text-white' : 'text-[hsl(215,80%,28%)]')}>
                Adhikar Setu
              </span>
              <span className={cn('text-[10px] font-medium tracking-wider uppercase', isLanding ? 'text-white/60' : 'text-slate-400')}>
                MSME Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-1.5 rounded-md text-sm font-medium transition-colors',
                  pathname === link.href
                    ? isLanding
                      ? 'bg-white/20 text-white'
                      : 'bg-[hsl(215,80%,28%)]/10 text-[hsl(215,80%,28%)]'
                    : isLanding
                    ? 'text-white/75 hover:text-white hover:bg-white/10'
                    : 'text-slate-600 hover:text-[hsl(215,80%,28%)] hover:bg-slate-50'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/profile">
              <Button
                size="sm"
                className={cn(
                  'gap-1.5 font-semibold',
                  isLanding
                    ? 'bg-[hsl(43,90%,48%)] hover:bg-[hsl(43,90%,42%)] text-[hsl(215,80%,15%)]'
                    : 'bg-[hsl(215,80%,28%)] hover:bg-[hsl(215,80%,22%)] text-white'
                )}
              >
                Check Eligibility
                <ChevronRight size={14} />
              </Button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={cn('md:hidden p-2 rounded-md', isLanding ? 'text-white' : 'text-slate-600')}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-200 shadow-lg">
          <div className="px-4 py-3 space-y-1">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'block px-3 py-2 rounded-md text-sm font-medium transition-colors',
                  pathname === link.href
                    ? 'bg-[hsl(215,80%,28%)]/10 text-[hsl(215,80%,28%)]'
                    : 'text-slate-600 hover:bg-slate-50'
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2 border-t border-slate-100">
              <Link href="/profile" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full bg-[hsl(215,80%,28%)] hover:bg-[hsl(215,80%,22%)] text-white">
                  Check Eligibility
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
