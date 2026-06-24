import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { normalizeExtension } from '../../../entities/conversion';
import { isActiveJobStatus, jobQueries, useJobPolling, type JobRecord } from '../../../entities/job';
import { env } from '../../../shared/config/env';
import { createJob, getUploadUrl, startJob, uploadFile } from '../api/convertFileApi';
import { busyFlowStates, type FlowState } from './convertFileTypes';

function upsertJob(previous: JobRecord[] | undefined, job: JobRecord): JobRecord[] {
  if (!previous) return [job];
  return [job, ...previous.filter((item) => item.job_id !== job.job_id)];
}

export function useConvertFile() {
  const queryClient = useQueryClient();
  const [file, setFile] = useState<File | null>(null);
  const [currentJob, setCurrentJob] = useState<JobRecord | null>(null);
  const [flowState, setFlowState] = useState<FlowState>('idle');
  const [error, setError] = useState<string | null>(null);

  const sourceFormat = file ? normalizeExtension(file.name) : '';
  const fileTooLarge = Boolean(file && file.size > env.maxFileSizeBytes);
  const polledJob = useJobPolling(currentJob?.job_id, currentJob);

  const visibleJob = polledJob.data ?? currentJob;
  const canStart = useMemo(
    () => Boolean(file && !fileTooLarge && !busyFlowStates.includes(flowState)),
    [file, fileTooLarge, flowState],
  );

  useEffect(() => {
    if (!polledJob.data) return;

    setCurrentJob(polledJob.data);
    queryClient.setQueryData<JobRecord[]>(jobQueries.list(), (previous) => upsertJob(previous, polledJob.data));

    if (polledJob.data.status === 'COMPLETED') {
      setFlowState('ready');
      void queryClient.invalidateQueries({ queryKey: jobQueries.list() });
    }

    if (polledJob.data.status === 'FAILED') {
      setFlowState('failed');
      setError(polledJob.data.error_message || 'No fue posible convertir el archivo.');
      void queryClient.invalidateQueries({ queryKey: jobQueries.list() });
    }
  }, [polledJob.data, queryClient]);

  useEffect(() => {
    if (polledJob.error) {
      setFlowState('failed');
      setError(polledJob.error instanceof Error ? polledJob.error.message : 'No se pudo consultar el estado.');
    }
  }, [polledJob.error]);

  function selectFile(nextFile: File | null) {
    setFile(nextFile);
    setCurrentJob(null);
    setFlowState('idle');
    setError(null);
  }

  async function convert(targetFormat: string) {
    if (!file || !targetFormat || fileTooLarge) return;

    setError(null);
    setFlowState('creating');

    try {
      const created = await createJob(file, targetFormat);
      setCurrentJob(created.job);
      queryClient.setQueryData<JobRecord[]>(jobQueries.list(), (previous) => upsertJob(previous, created.job));

      setFlowState('uploading');
      const upload = await getUploadUrl(created.job.job_id, file.type);
      await uploadFile(upload, file);

      setFlowState('starting');
      const started = await startJob(created.job.job_id);
      setCurrentJob(started);
      queryClient.setQueryData<JobRecord[]>(jobQueries.list(), (previous) => upsertJob(previous, started));
      setFlowState(isActiveJobStatus(started.status) ? 'polling' : 'ready');
      void queryClient.invalidateQueries({ queryKey: jobQueries.list() });
    } catch (conversionError) {
      setFlowState('failed');
      setError(conversionError instanceof Error ? conversionError.message : 'La conversión no pudo iniciarse.');
    }
  }

  return {
    file,
    sourceFormat,
    fileTooLarge,
    currentJob: visibleJob,
    flowState,
    error,
    canStart,
    maxFileSizeMb: env.maxFileSizeMb,
    selectFile,
    convert,
    setError,
  };
}
