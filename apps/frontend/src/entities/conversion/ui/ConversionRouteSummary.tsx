import type { ConversionPair } from '../model/conversionTypes';
import { ConversionIcon } from './ConversionIcon';

interface ConversionRouteSummaryProps {
  pair: ConversionPair;
}

export function ConversionRouteSummary({ pair }: ConversionRouteSummaryProps) {
  return (
    <div className="selected-route">
      <ConversionIcon category={pair.category} />
      <div>
        <strong>{pair.label}</strong>
        <span>{pair.engine} en worker ECS Fargate</span>
      </div>
    </div>
  );
}

