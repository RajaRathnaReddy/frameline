'use client';

import { tools } from '@/lib/data';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';
import Link from 'next/link';

export default function ToolDirectoryTeaser() {
  const verifiedTools = tools.filter(
    (t) => (t as any).status !== 'unverified' && !(t as any).hidden
  );

  return (
    <section className="bg-bg-elevated py-16 md:py-24 border-y border-border-subtle" id="tool-directory">
      <div className="max-w-[1440px] mx-auto px-4 md:px-8">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-3">
            <span className="text-meta text-accent-lime">SCENE 08 / TAKE 01</span>
            <span className="text-meta text-text-secondary/30">—</span>
            <h2 className="text-meta text-text-secondary">TOOL DIRECTORY</h2>
          </div>
          <div className="flex items-center justify-between mb-10">
            <div>
              <h3 className="text-fluid-h2 font-display text-text-primary mb-2">
                Industry Tools
              </h3>
              <p className="text-text-secondary text-base max-w-xl font-serif">
                The definitive directory of VFX, AI, and filmmaking software — tracked and reviewed.
              </p>
            </div>
            <Link
              href="/tools"
              className="hidden sm:flex text-meta text-accent-primary hover:text-accent-primary/80 transition-colors items-center gap-1"
            >
              FULL DIRECTORY →
            </Link>
          </div>
        </ScrollReveal>

        {/* Tool Grid */}
        <StaggerContainer className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {verifiedTools.map(tool => (
            <StaggerItem key={tool.name}>
              <div className="group relative glass-card rounded-lg p-5 text-center hover:border-text-secondary/20 transition-all cursor-pointer card-hover">
                <div className="text-4xl mb-3">{tool.logo}</div>
                <h4 className="font-display font-semibold text-text-primary text-sm mb-1 group-hover:text-accent-primary transition-colors">
                  {tool.name}
                </h4>
                <span className="text-meta text-text-secondary/50 text-[10px]">
                  {tool.category}
                </span>

                {/* Hover card */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 glass-card rounded-lg p-4 text-left opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-20 pointer-events-none">
                  <p className="text-text-secondary text-xs leading-relaxed mb-2">
                    {tool.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-meta text-text-secondary/50 text-[10px]">
                      V{tool.version}
                    </span>
                    <span className={`text-meta text-[10px] ${
                      tool.pricing === 'Free' ? 'text-accent-lime' :
                      tool.pricing === 'Open Source' ? 'text-accent-cyan' : 'text-text-secondary'
                    }`}>
                      {tool.pricing.toUpperCase()}
                    </span>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <Link
          href="/tools"
          className="sm:hidden flex justify-center mt-8 text-meta text-accent-primary hover:text-accent-primary/80 transition-colors items-center gap-1"
        >
          FULL DIRECTORY →
        </Link>
      </div>
    </section>
  );
}
