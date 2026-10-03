import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center text-center px-4">
      <div>
        <div className="text-meta text-accent-primary mb-4">ERROR 404</div>
        <h1 className="text-fluid-h1 font-display text-text-primary mb-4">
          Lost in the render.
        </h1>
        <p className="text-text-secondary text-lg font-serif mb-8 max-w-md mx-auto">
          The page you&apos;re looking for doesn&apos;t exist or has been moved to a different timeline.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-accent-primary hover:bg-accent-primary/90 text-white font-display font-semibold text-sm px-6 py-3 rounded-full transition-colors"
        >
          ← Back to RENDERLINE
        </Link>
      </div>
    </div>
  );
}
