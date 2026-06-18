import type { JobStatus } from './jobTypes';

export const statusLabel: Record<JobStatus, string> = {
  PENDING: 'Pendiente',
  UPLOAD_REQUESTED: 'Subida autorizada',
  UPLOADED: 'Archivo cargado',
  PROCESSING: 'Procesando',
  COMPLETED: 'Completado',
  FAILED: 'Fallido',
  EXPIRED: 'Expirado',
  DELETED: 'Eliminado',
};

export const statusTone: Record<JobStatus, string> = {
  PENDING: 'neutral',
  UPLOAD_REQUESTED: 'accent',
  UPLOADED: 'accent',
  PROCESSING: 'warn',
  COMPLETED: 'success',
  FAILED: 'danger',
  EXPIRED: 'danger',
  DELETED: 'neutral',
};

export function isActiveJobStatus(status: JobStatus): boolean {
  return ['PENDING', 'UPLOAD_REQUESTED', 'UPLOADED', 'PROCESSING'].includes(status);
}

