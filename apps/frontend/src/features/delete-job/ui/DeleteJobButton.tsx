import { Loader2, Trash2 } from 'lucide-react';
import { useDeleteJob } from '../model/useDeleteJob';

interface DeleteJobButtonProps {
  jobId: string;
  onDeleted?: (jobId: string) => void;
  onError?: (message: string) => void;
}

export function DeleteJobButton({ jobId, onDeleted, onError }: DeleteJobButtonProps) {
  const deletion = useDeleteJob(onDeleted, onError);

  return (
    <button className="icon-button danger" type="button" onClick={() => deletion.mutate(jobId)} disabled={deletion.isPending} aria-label="Eliminar job">
      {deletion.isPending ? <Loader2 className="spin" aria-hidden="true" /> : <Trash2 aria-hidden="true" />}
    </button>
  );
}

