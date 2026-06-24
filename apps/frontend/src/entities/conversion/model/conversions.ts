import type { ConversionPair } from './conversionTypes';

export const SUPPORTED_CONVERSIONS: ConversionPair[] = [
  { source: 'docx', target: 'pdf', label: 'Word a PDF', description: 'Documento listo para compartir', category: 'documents' },
  { source: 'xlsx', target: 'pdf', label: 'Excel a PDF', description: 'Hoja de cálculo con presentación final', category: 'documents' },
  { source: 'pptx', target: 'pdf', label: 'PowerPoint a PDF', description: 'Presentación estable para enviar', category: 'documents' },
  { source: 'pdf', target: 'docx', label: 'PDF a Word', description: 'Archivo editable para continuar trabajando', category: 'documents' },
  { source: 'csv', target: 'xlsx', label: 'CSV a Excel', description: 'Datos organizados en formato de hoja', category: 'documents' },
  { source: 'xlsx', target: 'csv', label: 'Excel a CSV', description: 'Datos limpios para importar o analizar', category: 'documents' },
  { source: 'png', target: 'jpg', label: 'PNG a JPG', description: 'Imagen liviana y compatible', category: 'images' },
  { source: 'jpg', target: 'png', label: 'JPG a PNG', description: 'Imagen preparada para edición', category: 'images' },
  { source: 'jpg', target: 'webp', label: 'JPG a WebP', description: 'Imagen optimizada para web', category: 'images' },
  { source: 'png', target: 'webp', label: 'PNG a WebP', description: 'Imagen moderna y eficiente', category: 'images' },
  { source: 'mp4', target: 'mp3', label: 'MP4 a MP3', description: 'Audio extraído del video', category: 'media' },
  { source: 'mp4', target: 'webm', label: 'MP4 a WebM', description: 'Video preparado para web', category: 'media' },
  { source: 'mov', target: 'mp4', label: 'MOV a MP4', description: 'Video compatible con más plataformas', category: 'media' },
  { source: 'wav', target: 'mp3', label: 'WAV a MP3', description: 'Audio comprimido para compartir', category: 'media' },
  { source: 'mp3', target: 'wav', label: 'MP3 a WAV', description: 'Audio en formato de trabajo', category: 'media' },
];

export function targetsForSource(source: string): ConversionPair[] {
  return SUPPORTED_CONVERSIONS.filter((conversion) => conversion.source === source);
}

export function acceptedExtensions(): string {
  return Array.from(new Set(SUPPORTED_CONVERSIONS.map((conversion) => `.${conversion.source}`))).join(',');
}

export function findConversionPair(source?: string, target?: string): ConversionPair | undefined {
  return SUPPORTED_CONVERSIONS.find((conversion) => conversion.source === source && conversion.target === target);
}
