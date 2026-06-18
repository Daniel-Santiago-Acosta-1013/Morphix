import { useRef } from 'react';
import { UploadCloud } from 'lucide-react';
import { acceptedExtensions, ConversionRouteSummary } from '../../../entities/conversion';
import { JobStatusBadge } from '../../../entities/job';
import { ConvertButton, ConversionProgress, useConvertFile } from '../../../features/convert-file';
import { DownloadJobButton } from '../../../features/download-job-result';
import { TargetFormatGrid, useTargetFormat } from '../../../features/select-target-format';
import { env } from '../../../shared/config/env';
import { formatBytes } from '../../../shared/lib/formatBytes';
import { ErrorBanner } from '../../../shared/ui/ErrorBanner';

export function ConversionWorkspace() {
  const inputRef = useRef<HTMLInputElement>(null);
  const conversion = useConvertFile();
  const target = useTargetFormat(conversion.sourceFormat);

  return (
    <section className="converter-panel" aria-label="File converter">
      <div className="panel-heading">
        <div>
          <p className="eyebrow">Nuevo job</p>
          <h2>Convierte un archivo</h2>
        </div>
        <button className="icon-button" type="button" onClick={() => inputRef.current?.click()} aria-label="Seleccionar archivo">
          <UploadCloud aria-hidden="true" />
        </button>
      </div>

      <label
        className={`drop-zone ${conversion.file ? 'has-file' : ''}`}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => {
          event.preventDefault();
          conversion.selectFile(event.dataTransfer.files.item(0));
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept={acceptedExtensions()}
          onChange={(event) => conversion.selectFile(event.currentTarget.files?.item(0) ?? null)}
        />
        <UploadCloud aria-hidden="true" />
        <span>{conversion.file ? conversion.file.name : 'Arrastra o selecciona un archivo'}</span>
        <small>
          {conversion.file
            ? `${formatBytes(conversion.file.size)} · ${conversion.sourceFormat.toUpperCase()}`
            : acceptedExtensions().replaceAll('.', '').toUpperCase()}
        </small>
      </label>

      {conversion.fileTooLarge && <p className="error-text">El archivo supera el limite configurado de {env.maxFileSizeMb} MB.</p>}
      {conversion.file && target.targetOptions.length === 0 && (
        <p className="error-text">El formato {conversion.sourceFormat.toUpperCase()} no esta soportado por el MVP.</p>
      )}

      <TargetFormatGrid options={target.targetOptions} targetFormat={target.targetFormat} onSelect={target.setTargetFormat} />

      <ConvertButton
        flowState={conversion.flowState}
        disabled={!conversion.canStart || !target.targetFormat}
        onClick={() => void conversion.convert(target.targetFormat)}
      />

      <ConversionProgress currentJob={conversion.currentJob} flowState={conversion.flowState} />

      {target.selectedPair && <ConversionRouteSummary pair={target.selectedPair} />}

      {conversion.currentJob && (
        <div className="current-job">
          <div>
            <JobStatusBadge status={conversion.currentJob.status} />
            <strong>
              {conversion.currentJob.source_format.toUpperCase()} a {conversion.currentJob.target_format.toUpperCase()}
            </strong>
            <small>{conversion.currentJob.job_id}</small>
          </div>
          {conversion.currentJob.status === 'COMPLETED' && <DownloadJobButton job={conversion.currentJob} onError={conversion.setError} />}
        </div>
      )}

      {conversion.error && <ErrorBanner message={conversion.error} />}
    </section>
  );
}

