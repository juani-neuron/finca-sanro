import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

export const runtime = 'nodejs';
export const alt = 'Finca Sanro — Gestión Ecuestre Premium';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  const logoData = await readFile(join(process.cwd(), 'public', 'logo.png'));
  const logoBase64 = `data:image/png;base64,${logoData.toString('base64')}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0A0A0A',
          gap: '24px',
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoBase64}
          alt="Logo"
          width={280}
          height={280}
          style={{ objectFit: 'contain' }}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <span
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: '#C8A04A',
              letterSpacing: '6px',
              textTransform: 'uppercase',
            }}
          >
            Finca Sanro
          </span>
          <span
            style={{
              fontSize: '20px',
              color: '#A0A0A0',
              letterSpacing: '2px',
            }}
          >
            Gestión Ecuestre Premium
          </span>
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '4px',
            background: 'linear-gradient(90deg, #0A0A0A, #C8A04A, #0A0A0A)',
          }}
        />
      </div>
    ),
    { ...size }
  );
}
