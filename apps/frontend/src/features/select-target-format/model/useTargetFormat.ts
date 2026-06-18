import { useEffect, useMemo, useState } from 'react';
import { findConversionPair, targetsForSource } from '../../../entities/conversion';

export function useTargetFormat(sourceFormat: string) {
  const [targetFormat, setTargetFormat] = useState('');
  const targetOptions = useMemo(() => targetsForSource(sourceFormat), [sourceFormat]);
  const selectedPair = findConversionPair(sourceFormat, targetFormat);

  useEffect(() => {
    if (!sourceFormat) {
      setTargetFormat('');
      return;
    }

    setTargetFormat(targetsForSource(sourceFormat)[0]?.target || '');
  }, [sourceFormat]);

  return {
    targetFormat,
    targetOptions,
    selectedPair,
    setTargetFormat,
  };
}

