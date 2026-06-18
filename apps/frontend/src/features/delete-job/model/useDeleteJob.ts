import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteJob, jobQueries, type JobRecord } from '../../../entities/job';

export function useDeleteJob(onDeleted?: (jobId: string) => void, onError?: (message: string) => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteJob,
    onSuccess: (_, jobId) => {
      queryClient.setQueryData<JobRecord[]>(jobQueries.list(), (previous) => previous?.filter((job) => job.job_id !== jobId) ?? []);
      queryClient.removeQueries({ queryKey: jobQueries.detail(jobId) });
      onDeleted?.(jobId);
    },
    onError: (error) => {
      onError?.(error instanceof Error ? error.message : 'No se pudo eliminar el job.');
    },
  });
}
