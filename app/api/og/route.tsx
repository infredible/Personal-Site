import { ImageResponse } from 'next/og'
import { siteConfig } from '@/app/config/site'

export const runtime = 'edge'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title')
    const date = searchParams.get('date')

    if (!title) {
      throw new Error('Title is required')
    }

    // Add some basic font loading
    const interBold = await fetch(
      new URL('https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap')
    ).then((res) => res.arrayBuffer())

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
            fontFamily: 'Inter',
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
        fonts: [
          {
            name: 'Inter',
            data: interBold,
            weight: 700,
          },
        ],
      }
    )
  } catch (error: unknown) {
    console.error('OG Image generation error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred'
    return new Response(`Failed to generate image: ${errorMessage}`, {
      status: 500,
    })
  }
} 