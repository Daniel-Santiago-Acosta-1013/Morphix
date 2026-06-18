import { FileAudio, FileImage, FileText } from 'lucide-react';
import type { ConversionPair } from '../model/conversionTypes';

interface ConversionIconProps {
  category?: ConversionPair['category'];
}

export function ConversionIcon({ category }: ConversionIconProps) {
  if (category === 'images') return <FileImage aria-hidden="true" />;
  if (category === 'media') return <FileAudio aria-hidden="true" />;
  return <FileText aria-hidden="true" />;
}

