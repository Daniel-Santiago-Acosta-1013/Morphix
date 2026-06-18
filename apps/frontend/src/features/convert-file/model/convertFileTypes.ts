export type FlowState = 'idle' | 'creating' | 'uploading' | 'starting' | 'polling' | 'ready' | 'failed';

export const busyFlowStates: FlowState[] = ['creating', 'uploading', 'starting', 'polling'];

