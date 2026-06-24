export interface ConversionPair {
  source: string;
  target: string;
  label: string;
  description: string;
  category: 'documents' | 'images' | 'media';
}
