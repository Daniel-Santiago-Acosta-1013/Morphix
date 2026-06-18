import { CheckCircle2, XCircle } from 'lucide-react';
import { statusLabel, statusTone } from '../model/jobStatus';
import type { JobStatus } from '../model/jobTypes';

interface JobStatusBadgeProps {
  status: JobStatus;
  withIcon?: boolean;
}

export function JobStatusBadge({ status, withIcon = false }: JobStatusBadgeProps) {
  return (
    <span className={`status-pill ${statusTone[status]}`}>
      {withIcon && status === 'COMPLETED' && <CheckCircle2 aria-hidden="true" />}
      {withIcon && status === 'FAILED' && <XCircle aria-hidden="true" />}
      {statusLabel[status]}
    </span>
  );
}

