import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'StephensCode Custom Solutions - SaaS, Web Apps, Automation';
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
              fontSize: 64,
              fontWeight: 'bold',
              background: 'linear-gradient(to right, #60a5fa, #22d3ee)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '24px',
            }}
          >
            StephensCode
          </div>

          {/* Main Heading */}
          <div
            style={{
              display: 'flex',
              fontSize: 56,
              fontWeight: 'bold',
              color: '#ffffff',
              textAlign: 'center',
              marginBottom: '24px',
            }}
          >
            Custom Solutions
          </div>

          {/* Features */}
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              color: '#cbd5e1',
              textAlign: 'center',
              maxWidth: '900px',
              marginBottom: '32px',
            }}
          >
            SaaS Platforms • Web Applications • Data Scrapers
          </div>

          {/* Pricing badge */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '16px',
            }}
          >
            <div
              style={{
                display: 'flex',
                padding: '20px 40px',
                background: 'rgba(34, 211, 238, 0.1)',
                border: '2px solid rgba(34, 211, 238, 0.3)',
                borderRadius: '12px',
                fontSize: 28,
                color: '#22d3ee',
                fontWeight: 600,
              }}
            >
              $50/hour • Flat-Rate Quotes • No Hourly Billing
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
