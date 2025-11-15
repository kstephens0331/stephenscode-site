import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'StephensCode - Veteran-Owned Web Development';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#0f172a',
          backgroundImage: 'radial-gradient(circle at 25px 25px, #1e293b 2%, transparent 0%), radial-gradient(circle at 75px 75px, #1e293b 2%, transparent 0%)',
          backgroundSize: '100px 100px',
        }}
      >
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '80px',
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              display: 'flex',
              fontSize: 72,
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '24px',
            }}
          >
            StephensCode
          </div>

          {/* Tagline */}
          <div
            style={{
              display: 'flex',
              fontSize: 36,
              color: '#cbd5e1',
              textAlign: 'center',
              maxWidth: '900px',
              marginBottom: '16px',
            }}
          >
            Veteran-Owned Web Development
          </div>

          {/* Subtext */}
          <div
            style={{
              display: 'flex',
              fontSize: 28,
              color: '#94a3b8',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            Custom Websites • SaaS Platforms • Business Automation
          </div>

          {/* Bottom badge */}
          <div
            style={{
              display: 'flex',
              marginTop: '48px',
              padding: '16px 32px',
              background: 'rgba(59, 130, 246, 0.1)',
              border: '2px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '12px',
              fontSize: 24,
              color: '#60a5fa',
              fontWeight: 600,
            }}
          >
            Houston & Conroe, TX
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
