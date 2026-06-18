import { useQuery } from '@tanstack/react-query';
import { getJob } from '../api/jobsApi';
import { isActiveJobStatus } from './jobStatus';
import { jobQueries } from './jobQueries';
import type { JobRecord } from './jobTypes';

export function useJobPolling(jobId?: string | null, initialJob?: JobRecord | null) {
  return useQuery({
    queryKey: jobId ? jobQueries.detail(jobId) : jobQueries.detail('idle'),
    queryFn: () => getJob(jobId!),
    enabled: Boolean(jobId && initialJob && isActiveJobStatus(initialJob.status)),
    initialData: initialJob ?? undefined,
    refetchInterval: (query) => {
      const job = query.state.data;
      return job && isActiveJobStatus(job.status) ? 2500 : false;
    },
    refetchIntervalInBackground: true,
    retry: 1,
  });
}
