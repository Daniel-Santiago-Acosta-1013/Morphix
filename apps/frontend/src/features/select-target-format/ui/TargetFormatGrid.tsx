import { ConversionIcon, type ConversionPair } from '../../../entities/conversion';

interface TargetFormatGridProps {
  options: ConversionPair[];
  targetFormat: string;
  onSelect: (targetFormat: string) => void;
}

export function TargetFormatGrid({ options, targetFormat, onSelect }: TargetFormatGridProps) {
  return (
    <div className="format-grid" aria-label="Target formats">
      {options.map((option) => (
        <button
          key={`${option.source}-${option.target}`}
          className={`format-option ${targetFormat === option.target ? 'selected' : ''}`}
          type="button"
          onClick={() => onSelect(option.target)}
        >
          <ConversionIcon category={option.category} />
          <span>{option.target.toUpperCase()}</span>
          <small>{option.engine}</small>
        </button>
      ))}
    </div>
  );
}

