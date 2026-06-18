export interface ConversionPair {
  source: string;
  target: string;
  label: string;
  engine: string;
  category: 'documents' | 'images' | 'media';
}

