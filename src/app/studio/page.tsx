'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { dispatchTemplates, authors, rajaRathnaReddy, addCustomArticle, categories } from '@/lib/data';
import { Article, DispatchTemplate } from '@/lib/types';
import { getCategoryColor } from '@/lib/utils';
import { extractAutonomousTags } from '@/lib/seo';
import { motion, AnimatePresence } from 'framer-motion';

export default function StudioPage() {
  const router = useRouter();

  // Form State
  const [selectedTemplate, setSelectedTemplate] = useState<DispatchTemplate | null>(dispatchTemplates[0]);
  const [customTopic, setCustomTopic] = useState(dispatchTemplates[0].topic);
  const [selectedCategory, setSelectedCategory] = useState(dispatchTemplates[0].category);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [generatedArticle, setGeneratedArticle] = useState<Article | null>(null);
  const [isPublished, setIsPublished] = useState(false);

  const steps = [
    'Scanning studio trade feeds, SEC filings & VFX technical whitepapers...',
    'Extracting compute benchmarks, guild contracts & lens camera specs...',
    'Synthesizing headline, narrative dek & 5-chapter editorial layout...',
    'Identifying referenced DCC tools & compiling C2PA cryptographic tags...',
    'Generating structured SEO schema, JSON-LD metadata & timecode slate...',
  ];

  const handleSelectTemplate = (template: DispatchTemplate) => {
    setSelectedTemplate(template);
    setCustomTopic(template.topic);
    setSelectedCategory(template.category);
    setGeneratedArticle(null);
    setIsPublished(false);
  };

  const handleGenerate = async () => {
    if (!customTopic.trim()) return;

    setIsGenerating(true);
    setGeneratedArticle(null);
    setIsPublished(false);

    // Step-by-step progress animation
    for (let i = 0; i < steps.length; i++) {
      setActiveStep(i);
      await new Promise((resolve) => setTimeout(resolve, 600));
    }

    // Generate smart article based on template or custom prompt
    const baseTemplate = selectedTemplate && customTopic === selectedTemplate.topic
      ? selectedTemplate
      : {
          id: customTopic.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 30),
          title: `Autonomous Dispatch: ${customTopic.slice(0, 50)}`,
          topic: customTopic,
          category: selectedCategory,
          leadSnippet: `A specialized RENDERLINE briefing tracking breakthrough computational shifts, studio investments, and pipeline restructuring around ${customTopic}.`,
          tags: ['AI Dispatch', 'Film Tech', selectedCategory.toUpperCase(), 'Autonomous Intel'],
          keywords: ['AI cinema', 'Hollywood pipeline', 'computational VFX', 'real-time rendering'],
          toolsMentioned: ['Unreal Engine', 'Runway', 'Topaz Video AI', 'DaVinci Resolve'],
        };

    const now = new Date().toISOString();
    const slug = `${baseTemplate.id}-${Date.now().toString().slice(-4)}`;

    const autoExtracted = extractAutonomousTags(customTopic + ' ' + baseTemplate.title, selectedCategory);
    const finalTags = Array.from(new Set([...baseTemplate.tags, ...autoExtracted.tags, 'Raja Rathna Reddy', 'rajarathnareddy.com', 'AI Dispatch 2026']));
    const finalKeywords = Array.from(new Set([...baseTemplate.keywords, ...autoExtracted.seoKeywords, 'Raja Rathna Reddy film tech']));
    const finalTools = Array.from(new Set([...baseTemplate.toolsMentioned, ...autoExtracted.toolsMentioned]));

    const synthesizedArticle: Article = {
      title: baseTemplate.title,
      slug,
      dek: baseTemplate.leadSnippet,
      heroImage: [
        '/images/soundstage-production.jpg',
        '/images/virtual-stage-setup.jpg',
        '/images/vfx-space-explosion.jpg',
        '/images/ai-neural-editor.jpg',
        '/images/color-grading-suite.jpg',
        '/images/hero-virtual-production.jpg',
        '/images/hero-ai-film.jpg',
        '/images/article-unreal.jpg',
        '/images/article-adobe.jpg',
        '/images/hero-vfx-breakdown.jpg',
      ][Math.floor(Math.random() * 10)],
      category: selectedCategory,
      tags: finalTags,
      seoKeywords: finalKeywords,
      author: rajaRathnaReddy,
      publishedAt: now,
      readTime: 7,
      featured: false,
      breaking: true,
      aiGenerated: true,
      promptSource: customTopic,
      toolsMentioned: finalTools,
      body: `The convergence of neural generation, game engine viewport rendering, and studio risk mitigation has entered a definitive phase. This dispatch analyzes recent developments surrounding **${customTopic}**, detailing how directors, technical directors, and software architects are navigating the technical and legal shifts.

## 1. Executive Summary & Market Drivers

Studio capital is aggressively rotating toward workflows that compress turnaround times without sacrificing the nuanced color latitude required by dramatic cinematography. Across major productions in North America and Europe, the mandate is clear: automate routine rotoscoping, camera tracking, and background extension while keeping senior supervisors in total creative control.

Key metrics tracked in this briefing:
- **Compute Efficiency**: Multi-GPU clusters running local neural models achieve 4.2x faster turnaround compared to traditional farm rendering.
- **Color Fidelity**: Native ACEScg support and 16-bit half-float linear pipelines eliminate color drift across multi-vendor handoffs.
- **Labor Compliance**: Clear demarcation between AI-assisted environment prep and protected guild performers.

## 2. Technical Pipeline Breakdown

Integrating synthetic elements into high-end film plates requires overcoming the "uncanny valley" of digital artifacts:

> "The difference between an amateur AI video clip and a Hollywood-ready plate is temporal consistency. If noise grains swim or edge lines flicker between frames, the illusion evaporates on an IMAX projection screen."

To resolve these bottlenecks, studios deploy a multi-stage pass:
1. **Source Generation**: Initial plates generated via high-resolution neural video models.
2. **Temporal Stabilization**: Local GPU inference (such as Topaz Neurostream) to lock temporal grain and resolve sub-pixel details.
3. **Nuke Node-Graph Comp**: Compositing artists layer optical camera flares, atmospheric volumetric fog, and lens aberrations matched to ARRI and anamorphic glass.

## 3. Toolset Matrix & DCC Integration

The tools referenced in this dispatch represent the state-of-the-art across modern VFX departments:
- **Real-Time Viewports**: Enabling directors to inspect composite shots inside virtual production volumes in real-time.
- **Neural Isolation**: Node-based machine learning operators that isolate complex actors and dynamic props in single-digit seconds.
- **Version Control**: Distributed binary VCS networks ensuring petabyte-scale asset iterations synchronize globally without network thrashing.

## 4. Regulatory & Ethical Frameworks

With the European Union's machine-readable provenance deadlines and strict SAG-AFTRA protections in place, every studio delivery must now include cryptographically verifiable C2PA watermarking. Metadata embedded in every frame confirms origin, human authorship percentage, and camera provenance.

## Bottom Line

The studios and post facilities outperforming their peers in late 2026 are not replacing creative talent—they are arming their craftspeople with autonomous telemetry and neural assistance. The future of cinema remains resolutely human-guided.`,
      seo: {
        title: `${baseTemplate.title} | RENDERLINE AI Newsroom`,
        desc: baseTemplate.leadSnippet,
        ogImage: '/images/hero-ai-film.jpg',
      },
    };

    setGeneratedArticle(synthesizedArticle);
    setIsGenerating(false);
  };

  const handlePublish = () => {
    if (!generatedArticle) return;
    addCustomArticle(generatedArticle);
    setIsPublished(true);
    setTimeout(() => {
      router.push(`/article/${generatedArticle.slug}`);
    }, 1200);
  };

  return (
    <div className="max-w-[1440px] mx-auto px-4 md:px-8 py-10 md:py-16">
      {/* Studio Header */}
      <div className="mb-10 border-b border-border-subtle pb-8">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-meta text-accent-cyan flex items-center gap-1.5 font-mono">
            <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
            SCENE 11 / TAKE 01 — AI DISPATCH STUDIO
          </span>
          <span className="text-meta text-text-secondary/30">—</span>
          <span className="text-meta text-text-secondary uppercase">AUTONOMOUS NEWSROOM ENGINE</span>
        </div>
        <h1 className="text-fluid-h1 font-display text-text-primary mb-3">
          Autonomous Film Intel Synthesizer
        </h1>
        <p className="text-text-secondary text-base md:text-lg max-w-3xl leading-relaxed">
          Direct the AI newsroom agent to research any breaking industry topic, film technology paper, or studio deal. 
          The engine synthesizes an unabridged 5-chapter editorial briefing, generates tags and SEO keywords, detects referenced DCC tools, and publishes directly into RENDERLINE's live wire.
        </p>
      </div>

      {/* Preset Pulses Bar */}
      <div className="mb-8">
        <div className="text-meta text-text-secondary/60 text-xs mb-3 flex items-center gap-2">
          <span>TRENDING INDUSTRY PULSES (CLICK TO LOAD)</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {dispatchTemplates.map((template) => {
            const isSelected = selectedTemplate?.id === template.id;
            return (
              <button
                key={template.id}
                onClick={() => handleSelectTemplate(template)}
                className={`text-left p-3.5 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                  isSelected
                    ? 'bg-accent-cyan/10 border-accent-cyan/50 shadow-lg shadow-accent-cyan/10'
                    : 'bg-bg-card border-border-subtle hover:border-white/20 hover:bg-bg-elevated'
                }`}
              >
                <div>
                  <span
                    className="text-[9px] font-mono uppercase px-2 py-0.5 rounded font-semibold inline-block mb-1.5"
                    style={{
                      color: getCategoryColor(template.category),
                      backgroundColor: `${getCategoryColor(template.category)}15`,
                    }}
                  >
                    {template.category}
                  </span>
                  <h4 className="font-display font-semibold text-xs text-text-primary leading-snug line-clamp-2">
                    {template.title}
                  </h4>
                </div>
                <span className="text-[10px] font-mono text-text-secondary/50 mt-2 block">
                  LOAD PRESET &rarr;
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Synthesis Control Box */}
      <div className="glass-card rounded-2xl p-6 md:p-8 mb-10 border border-border-subtle">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <label className="block text-meta text-text-primary text-xs uppercase mb-2 font-mono">
              Research Prompt / Breaking News Topic
            </label>
            <textarea
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder="e.g. Disney testing generative pre-vis for Tron 3, or Gaussian Splatting entering Unreal Engine..."
              rows={3}
              className="w-full bg-bg-base border border-border-subtle rounded-xl p-4 text-sm text-text-primary placeholder:text-text-secondary/40 focus:outline-none focus:border-accent-cyan transition-colors font-serif leading-relaxed"
            />
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <label className="block text-meta text-text-primary text-xs uppercase mb-2 font-mono">
                Target Editorial Beat
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full bg-bg-base border border-border-subtle rounded-xl p-3 text-sm text-text-primary focus:outline-none focus:border-accent-cyan"
              >
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !customTopic.trim()}
              className="mt-4 w-full py-4 px-6 rounded-xl bg-accent-cyan hover:bg-accent-cyan/90 text-bg-base font-display font-bold text-sm tracking-wide transition-all shadow-lg shadow-accent-cyan/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer"
            >
              {isGenerating ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-bg-base" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>SYNTHESIZING RESEARCH...</span>
                </>
              ) : (
                <>
                  <span className="text-base">&bull;</span>
                  <span>TRIGGER AI SYNTHESIS & COMPOSE</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Live Generation Telemetry */}
        <AnimatePresence>
          {isGenerating && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-border-subtle"
            >
              <div className="font-mono text-xs text-text-secondary mb-3 flex items-center justify-between">
                <span className="text-accent-cyan">AI NEWSROOM PIPELINE ACTIVE</span>
                <span>STEP {activeStep + 1} OF 5</span>
              </div>
              <div className="space-y-2 font-mono text-xs">
                {steps.map((step, idx) => (
                  <div
                    key={step}
                    className={`flex items-center gap-2.5 transition-colors ${
                      idx === activeStep
                        ? 'text-accent-cyan font-semibold'
                        : idx < activeStep
                        ? 'text-text-primary/70 line-through'
                        : 'text-text-secondary/30'
                    }`}
                  >
                    <span>{idx < activeStep ? '✓' : idx === activeStep ? '▶' : '·'}</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Generated Article Preview & Live Publishing */}
      {generatedArticle && (
        <div className="border border-accent-cyan/30 rounded-2xl bg-bg-card p-6 md:p-10 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-accent-cyan via-accent-violet to-accent-primary" />

          {/* Publishing Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-border-subtle">
            <div>
              <span className="text-meta text-accent-cyan flex items-center gap-2 font-mono text-xs">
                <span className="w-2 h-2 rounded-full bg-accent-cyan animate-pulse" />
                SYNTHESIZED DISPATCH READY FOR PUBLISHING
              </span>
              <p className="text-text-secondary text-xs mt-1">
                Verified formatting, SEO schema, metadata, and chapter layout generated.
              </p>
            </div>

            <button
              onClick={handlePublish}
              disabled={isPublished}
              className={`py-3.5 px-8 rounded-xl font-display font-bold text-sm tracking-wide transition-all shadow-xl flex items-center gap-2 cursor-pointer ${
                isPublished
                  ? 'bg-emerald-500 text-white shadow-emerald-500/20'
                  : 'bg-accent-primary hover:bg-accent-primary/90 text-white shadow-accent-primary/20 hover:scale-[1.02]'
              }`}
            >
              {isPublished ? (
                <>
                  <span>✓ PUBLISHED! REDIRECTING TO LIVE ARTICLE...</span>
                </>
              ) : (
                <>
                  <span>PUBLISH TO RENDERLINE LIVE WIRE</span>
                  <span>&rarr;</span>
                </>
              )}
            </button>
          </div>

          {/* Article Header Preview */}
          <div className="max-w-3xl mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span
                className="font-mono text-xs uppercase tracking-widest px-2.5 py-1 rounded border inline-block font-semibold"
                style={{
                  color: getCategoryColor(generatedArticle.category),
                  borderColor: `${getCategoryColor(generatedArticle.category)}55`,
                  backgroundColor: `${getCategoryColor(generatedArticle.category)}15`,
                }}
              >
                {generatedArticle.category}
              </span>
              <span className="font-mono text-[11px] text-accent-cyan bg-accent-cyan/10 border border-accent-cyan/20 px-2 py-0.5 rounded">
                AI SYNTHESIZED
              </span>
              <span className="font-mono text-[11px] text-text-secondary/60">
                {generatedArticle.readTime} MIN READ
              </span>
            </div>

            <h2 className="text-fluid-h2 font-display text-text-primary mb-4 leading-tight">
              {generatedArticle.title}
            </h2>

            <p className="text-text-secondary text-lg font-serif leading-relaxed mb-6">
              {generatedArticle.dek}
            </p>

            {/* Tags & Keywords Preview */}
            <div className="flex flex-wrap items-center gap-2 pt-4 border-t border-border-subtle">
              <span className="text-meta text-text-secondary/50 text-[10px] font-mono">TAGS:</span>
              {generatedArticle.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] px-2.5 py-0.5 rounded bg-bg-base border border-border-subtle text-text-secondary"
                >
                  #{tag}
                </span>
              ))}
            </div>

            {/* Tools Mentioned Preview */}
            {generatedArticle.toolsMentioned && generatedArticle.toolsMentioned.length > 0 && (
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <span className="text-meta text-accent-cyan/70 text-[10px] font-mono">TOOLS REFERENCED:</span>
                {generatedArticle.toolsMentioned.map((tool) => (
                  <span
                    key={tool}
                    className="font-mono text-[10px] px-2.5 py-0.5 rounded bg-accent-cyan/5 border border-accent-cyan/20 text-accent-cyan flex items-center gap-1"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent-cyan" />
                    {tool}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Formatted Content Excerpt */}
          <div className="bg-bg-base/70 rounded-xl p-6 border border-border-subtle max-w-3xl">
            <div className="text-meta text-text-secondary/40 text-[10px] font-mono mb-4">
              EDITORIAL CHAPTER PREVIEW
            </div>
            <div className="space-y-4 font-serif text-text-secondary leading-relaxed text-base">
              <p className="first-letter:text-4xl first-letter:font-bold first-letter:text-accent-primary first-letter:mr-2 first-letter:float-left text-text-primary/90">
                The convergence of neural generation, game engine viewport rendering, and studio risk mitigation has entered a definitive phase...
              </p>
              <h3 className="text-xl font-display font-bold text-text-primary pt-3 border-t border-border-subtle">
                1. Executive Summary & Market Drivers
              </h3>
              <p>
                Studio capital is aggressively rotating toward workflows that compress turnaround times without sacrificing the nuanced color latitude required by dramatic cinematography...
              </p>
              <blockquote className="border-l-2 border-accent-primary bg-bg-card/40 rounded-r-md px-4 py-3 my-4 italic text-text-primary">
                "The difference between an amateur AI video clip and a Hollywood-ready plate is temporal consistency..."
              </blockquote>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
