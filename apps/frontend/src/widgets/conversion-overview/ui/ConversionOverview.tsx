import { FileArchive, ShieldCheck } from 'lucide-react';

export function ConversionOverview() {
  return (
    <aside className="side-panel" aria-label="Morphix overview">
      <div className="brand-block">
        <div className="brand-mark">
          <FileArchive aria-hidden="true" />
        </div>
        <div>
          <p className="eyebrow">Morphix</p>
          <h1>Conversion asincrona de archivos</h1>
        </div>
      </div>

      <div className="metric-grid" aria-label="Supported conversion coverage">
        <div>
          <strong>15</strong>
          <span>pares MVP</span>
        </div>
        <div>
          <strong>100 MB</strong>
          <span>limite inicial</span>
        </div>
        <div>
          <strong>S3</strong>
          <span>upload directo</span>
        </div>
        <div>
          <strong>ECS</strong>
          <span>worker aislado</span>
        </div>
      </div>

      <div className="engine-list" aria-label="Conversion engines">
        <div>
          <ShieldCheck aria-hidden="true" /> LibreOffice
        </div>
        <div>
          <ShieldCheck aria-hidden="true" /> FFmpeg
        </div>
        <div>
          <ShieldCheck aria-hidden="true" /> ImageMagick
        </div>
        <div>
          <ShieldCheck aria-hidden="true" /> PyMuPDF
        </div>
      </div>
    </aside>
  );
}

