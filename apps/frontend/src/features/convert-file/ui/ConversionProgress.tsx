import type { JobRecord } from '../../../entities/job';
import type { FlowState } from '../model/convertFileTypes';

interface ConversionProgressProps {
  currentJob: JobRecord | null;
  flowState: FlowState;
}

export function ConversionProgress({ currentJob, flowState }: ConversionProgressProps) {
  const progressSteps = [
    { key: 'creating', label: 'Job', active: Boolean(currentJob), done: Boolean(currentJob) },
    { key: 'uploading', label: 'Upload', active: flowState === 'uploading', done: ['starting', 'polling', 'ready'].includes(flowState) },
    { key: 'polling', label: 'Worker', active: flowState === 'polling', done: flowState === 'ready' },
    { key: 'ready', label: 'Download', active: flowState === 'ready', done: flowState === 'ready' },
  ];

  return (
    <div className="progress-strip" aria-label="Conversion progress">
      {progressSteps.map((step) => (
        <div key={step.key} className={`progress-step ${step.active ? 'active' : ''} ${step.done ? 'done' : ''}`}>
          <span />
          <small>{step.label}</small>
        </div>
      ))}
    </div>
  );
}

