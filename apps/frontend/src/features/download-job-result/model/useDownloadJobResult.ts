import { useMutation } from '@tanstack/react-query';
import { getDownloadUrl, type JobRecord } from '../../../entities/job';

export function useDownloadJobResult(onError?: (message: string) => void) {
  return useMutation({
    mutationFn: async (job: JobRecord) => getDownloadUrl(job.job_id),
    onSuccess: (download) => {
      window.location.href = download.download_url;
    },
    onError: (error) => {
      onError?.(error instanceof Error ? error.message : 'No se pudo crear la URL de descarga.');
    },
  });
}

