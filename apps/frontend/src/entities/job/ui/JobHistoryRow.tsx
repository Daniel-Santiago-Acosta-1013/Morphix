import type { ReactNode } from 'react';
import { formatBytes } from '../../../shared/lib/formatBytes';
import type { JobRecord } from '../model/jobTypes';
import { JobStatusBadge } from './JobStatusBadge';

interface JobHistoryRowProps {
  job: JobRecord;
  leadingIcon: ReactNode;
  actions: ReactNode;
}

export function JobHistoryRow({ job, leadingIcon, actions }: JobHistoryRowProps) {
  return (
    <article className="history-row">
      <div className="history-icon">{leadingIcon}</div>
      <div className="history-main">
        <strong>
          {job.source_format.toUpperCase()} a {job.target_format.toUpperCase()}
        </strong>
        <span>
          {new Date(job.created_at).toLocaleString()} · {formatBytes(job.file_size)}
        </span>
      </div>
      <JobStatusBadge status={job.status} withIcon />
      <div className="row-actions">{actions}</div>
    </article>
  );
}
