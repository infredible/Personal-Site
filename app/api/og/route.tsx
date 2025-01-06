import { ImageResponse } from 'next/og'
import { siteConfig } from '@/app/config/site'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title')
    const date = searchParams.get('date')

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            backgroundColor: '#1a1a1a',
            padding: '40px 80px',
          }}
        >
          <div
            style={{
              color: 'white',
              fontSize: 60,
              fontWeight: 800,
              marginBottom: 24,
              lineHeight: 1.2,
            }}
          >
            {title}
          </div>
          {date && (
            <div
              style={{
                color: '#888888',
                fontSize: 30,
              }}
            >
              {new Date(date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          )}
          <div
            style={{
              color: '#888888',
              fontSize: 30,
              marginTop: 'auto',
            }}
          >
            {siteConfig.name}
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    )
  } catch (e) {
    return new Response(`Failed to generate image`, {
      status: 500,
    })
  }
} 