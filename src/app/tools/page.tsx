import ToolsContent from '@/components/tools/ToolsContent';
import type { Metadata } from 'next';
import { SITE_NAME } from '@/lib/config';

export const metadata: Metadata = {
  title: `Tool Directory — ${SITE_NAME}`,
  description: 'The definitive directory of VFX, AI, and filmmaking software — tracked, reviewed, and compared.',
};

export default function ToolsPage() {
  return <ToolsContent />;
}
