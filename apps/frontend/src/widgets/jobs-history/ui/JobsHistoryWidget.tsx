import { useState } from 'react';
import { Clock3, Loader2, RefreshCw } from 'lucide-react';
import { ConversionIcon, findConversionPair } from '../../../entities/conversion';
import { JobHistoryRow, useJobsHistory } from '../../../entities/job';
import { DeleteJobButton } from '../../../features/delete-job';
import { DownloadJobButton } from '../../../features/download-job-result';
import { EmptyState } from '../../../shared/ui/EmptyState';
import { ErrorBanner } from '../../../shared/ui/ErrorBanner';

export function JobsHistoryWidget() {
  const jobs = useJobsHistory();
  const [actionError, setActionError] = useState<string | null>(null);

  return (
    <section className="history-section" aria-label="Conversion history">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Historial</p>
          <h2>Conversiones recientes</h2>
        </div>
        <button className="secondary-action" type="button" onClick={() => void jobs.refetch()} disabled={jobs.isFetching}>
          {jobs.isFetching ? <Loader2 className="spin" aria-hidden="true" /> : <RefreshCw aria-hidden="true" />}
          Actualizar
        </button>
      </div>

      <div className="history-list">
        {jobs.data?.length === 0 && <EmptyState icon={<Clock3 aria-hidden="true" />} label="Sin conversiones registradas para este usuario." />}

        {jobs.data?.map((job) => {
          const pair = findConversionPair(job.source_format, job.target_format);

          return (
            <JobHistoryRow
              key={job.job_id}
              job={job}
              leadingIcon={<ConversionIcon category={pair?.category} />}
              actions={
                <>
                  <DownloadJobButton job={job} variant="icon" onError={setActionError} />
                  <DeleteJobButton jobId={job.job_id} onError={setActionError} />
                </>
              }
            />
          );
        })}

        {jobs.error && <ErrorBanner message={jobs.error instanceof Error ? jobs.error.message : 'No se pudo consultar el historial.'} />}
        {actionError && <ErrorBanner message={actionError} />}
      </div>
    </section>
  );
}

