import { Loader2, RefreshCw } from 'lucide-react';
import { busyFlowStates, type FlowState } from '../model/convertFileTypes';

interface ConvertButtonProps {
  disabled: boolean;
  flowState: FlowState;
  onClick: () => void;
}

export function ConvertButton({ disabled, flowState, onClick }: ConvertButtonProps) {
  const busy = busyFlowStates.includes(flowState);

  return (
    <button className="primary-action" type="button" disabled={disabled} onClick={onClick}>
      {busy ? <Loader2 className="spin" aria-hidden="true" /> : <RefreshCw aria-hidden="true" />}
      <span>{flowState === 'polling' ? 'Procesando' : 'Iniciar conversion'}</span>
    </button>
  );
}

