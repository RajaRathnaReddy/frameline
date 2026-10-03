import ToolsContent from '@/components/tools/ToolsContent';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tool Directory — RENDERLINE',
  description: 'The definitive directory of VFX, AI, and filmmaking software — tracked, reviewed, and compared.',
};

export default function ToolsPage() {
  return <ToolsContent />;
}
