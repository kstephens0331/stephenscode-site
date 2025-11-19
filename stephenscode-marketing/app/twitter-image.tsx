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
          backgroundColor: '#1e3a5f',
          backgroundImage: 'linear-gradient(135deg, #1e3a5f 0%, #2d4a6f 50%, #1e3a5f 100%)',
        }}
      >
        {/* Main content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '60px',
          }}
        >
          {/* Logo/Brand */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '32px',
            }}
          >
            <div
              style={{
                width: 70,
                height: 70,
                backgroundColor: '#f59e0b',
                borderRadius: 14,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: 16,
              }}
            >
              <span style={{ fontSize: 42, fontWeight: 'bold', color: 'white' }}>S</span>
            </div>
            <span
              style={{
                fontSize: 56,
                fontWeight: 'bold',
                color: 'white',
              }}
            >
              StephensCode
            </span>
          </div>

          {/* Tagline */}
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              color: '#f59e0b',
              textAlign: 'center',
              marginBottom: '16px',
              fontWeight: 600,
            }}
          >
            Veteran-Owned Web Development
          </div>

          {/* Subtext */}
          <div
            style={{
              display: 'flex',
              fontSize: 24,
              color: '#e5e7eb',
              textAlign: 'center',
              maxWidth: '800px',
              marginBottom: '8px',
            }}
          >
            Custom Websites • Local SEO • E-Commerce
          </div>

          {/* Location */}
          <div
            style={{
              display: 'flex',
              fontSize: 20,
              color: '#9ca3af',
              marginTop: '20px',
            }}
          >
            Serving Houston, Conroe & The Woodlands
          </div>

          {/* Pricing badge */}
          <div
            style={{
              display: 'flex',
              marginTop: '32px',
              padding: '12px 24px',
              background: 'rgba(245, 158, 11, 0.15)',
              border: '2px solid #f59e0b',
              borderRadius: '8px',
              fontSize: 20,
              color: '#f59e0b',
              fontWeight: 600,
            }}
          >
            Flat-Rate Pricing Starting at $250
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
