import { ArrowDownToLine, Loader2 } from 'lucide-react';
import { useDownloadJobResult } from '../model/useDownloadJobResult';
import type { JobRecord } from '../../../entities/job';

interface DownloadJobButtonProps {
  job: JobRecord;
  variant?: 'icon' | 'text';
  onError?: (message: string) => void;
}

export function DownloadJobButton({ job, variant = 'text', onError }: DownloadJobButtonProps) {
  const download = useDownloadJobResult(onError);
  const disabled = job.status !== 'COMPLETED' || download.isPending;

  if (variant === 'icon') {
    return (
      <button className="icon-button" type="button" onClick={() => download.mutate(job)} disabled={disabled} aria-label="Descargar resultado">
        {download.isPending ? <Loader2 className="spin" aria-hidden="true" /> : <ArrowDownToLine aria-hidden="true" />}
      </button>
    );
  }

  return (
    <button className="secondary-action" type="button" onClick={() => download.mutate(job)} disabled={disabled}>
      {download.isPending ? <Loader2 className="spin" aria-hidden="true" /> : <ArrowDownToLine aria-hidden="true" />}
      Descargar
    </button>
  );
}

