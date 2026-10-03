'use client';

import { aiModels } from '@/lib/data';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/motion';

export default function AIModelTracker() {
  return (
    <section className="max-w-[1440px] mx-auto px-4 md:px-8 py-16 md:py-24" id="ai-tracker">
      <ScrollReveal>
        <div className="flex items-center gap-3 mb-3">
          <span className="text-meta text-accent-cyan">SCENE 07 / TAKE 01</span>
          <span className="text-meta text-text-secondary/30">—</span>
          <h2 className="text-meta text-text-secondary">AI VIDEO MODEL TRACKER</h2>
        </div>
        <h3 className="text-fluid-h2 font-display text-text-primary mb-3">
          The State of AI Video
        </h3>
        <p className="text-text-secondary text-base max-w-2xl mb-10 font-serif">
          Real-time status of every major AI video generation model — resolution, duration limits, audio support, and API availability.
        </p>
      </ScrollReveal>

      {/* Desktop Table */}
      <ScrollReveal delay={0.2}>
        <div className="hidden md:block border border-border-subtle rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="bg-bg-card border-b border-border-subtle">
                <th className="text-meta text-text-secondary/60 text-left px-5 py-3.5 font-normal">MODEL</th>
                <th className="text-meta text-text-secondary/60 text-left px-5 py-3.5 font-normal">COMPANY</th>
                <th className="text-meta text-text-secondary/60 text-left px-5 py-3.5 font-normal">MAX LENGTH</th>
                <th className="text-meta text-text-secondary/60 text-left px-5 py-3.5 font-normal">RESOLUTION</th>
                <th className="text-meta text-text-secondary/60 text-center px-5 py-3.5 font-normal">AUDIO</th>
                <th className="text-meta text-text-secondary/60 text-left px-5 py-3.5 font-normal">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {aiModels.map((model, i) => (
                <tr
                  key={model.name}
                  className={`border-b border-border-subtle hover:bg-bg-card/50 transition-colors ${
                    i === aiModels.length - 1 ? 'border-b-0' : ''
                  }`}
                >
                  <td className="px-5 py-4">
                    <span className="font-display font-semibold text-text-primary text-sm">
                      {model.name}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-text-secondary text-sm">{model.company}</td>
                  <td className="px-5 py-4">
                    <span className="text-meta text-text-primary">{model.maxLength}</span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-meta text-text-primary">{model.resolution}</span>
                  </td>
                  <td className="px-5 py-4 text-center">
                    <span className={`text-sm ${model.audioNative ? 'text-accent-lime' : 'text-text-secondary/30'}`}>
                      {model.audioNative ? '✓' : '—'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className={`text-meta px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                      model.apiStatus === 'live' ? 'pill-live' :
                      model.apiStatus === 'beta' ? 'pill-beta' : 'pill-sunset'
                    }`}>
                      {model.apiStatus.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-3 flex items-center justify-between text-meta text-text-secondary/60">
          <span>Official vendor specifications verified directly against developer API documentation.</span>
          <span className="font-mono text-xs">Last verified: October 1, 2026</span>
        </div>
      </ScrollReveal>

      {/* Mobile Cards */}
      <StaggerContainer className="md:hidden grid grid-cols-1 gap-3">
        {aiModels.map((model) => (
          <StaggerItem key={model.name}>
            <div className="glass-card rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="font-display font-semibold text-text-primary">{model.name}</span>
                <span className={`text-meta px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                  model.apiStatus === 'live' ? 'pill-live' :
                  model.apiStatus === 'beta' ? 'pill-beta' : 'pill-sunset'
                }`}>
                  {model.apiStatus.toUpperCase()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-meta text-text-secondary/50 block">COMPANY</span>
                  <span className="text-text-secondary">{model.company}</span>
                </div>
                <div>
                  <span className="text-meta text-text-secondary/50 block">MAX LENGTH</span>
                  <span className="text-text-primary">{model.maxLength}</span>
                </div>
                <div>
                  <span className="text-meta text-text-secondary/50 block">RESOLUTION</span>
                  <span className="text-text-primary">{model.resolution}</span>
                </div>
                <div>
                  <span className="text-meta text-text-secondary/50 block">AUDIO</span>
                  <span className={model.audioNative ? 'text-accent-lime' : 'text-text-secondary/30'}>
                    {model.audioNative ? 'Yes' : 'No'}
                  </span>
                </div>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
      <div className="mt-4 md:hidden text-center text-meta text-text-secondary/60 font-mono text-xs">
        Last verified: October 1, 2026
      </div>
    </section>
  );
}
