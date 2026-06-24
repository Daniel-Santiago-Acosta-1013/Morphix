import type { JobRecord } from '../../../entities/job';
import { Progress } from '../../../shared/ui/progress';
import type { FlowState } from '../model/convertFileTypes';

interface ConversionProgressProps {
  currentJob: JobRecord | null;
  flowState: FlowState;
}

export function ConversionProgress({ currentJob, flowState }: ConversionProgressProps) {
  const progressSteps = [
    { key: 'creating', label: 'Archivo', active: Boolean(currentJob), done: Boolean(currentJob) },
    { key: 'uploading', label: 'Carga', active: flowState === 'uploading', done: ['starting', 'polling', 'ready'].includes(flowState) },
    { key: 'polling', label: 'Conversión', active: flowState === 'polling', done: flowState === 'ready' },
    { key: 'ready', label: 'Resultado', active: flowState === 'ready', done: flowState === 'ready' },
  ];

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-4" aria-label="Conversion progress">
      {progressSteps.map((step) => (
        <div key={step.key} className="grid gap-2">
          <Progress value={step.done ? 100 : step.active ? 62 : 0} className="h-1.5" />
          <span className="text-xs text-muted-foreground">{step.label}</span>
        </div>
      ))}
    </div>
  );
}
