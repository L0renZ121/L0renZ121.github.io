import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LoadingScreen from '@/components/LoadingScreen'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Abhi - Full Stack Developer & Designer',
  description: 'Portfolio of Abhi - A passionate full-stack developer specializing in modern web technologies, UI/UX design, and creating stunning digital experiences',
  keywords: ['portfolio', 'developer', 'web development', 'Abhi', 'full-stack', 'designer'],
  openGraph: {
    title: 'Abhi - Full Stack Developer & Designer',
    description: 'Portfolio of Abhi - A passionate full-stack developer specializing in modern web technologies, UI/UX design, and creating stunning digital experiences',
    url: 'https://www.abhi88.com.np',
    siteName: 'Abhi Portfolio',
    type: 'website',
    images: [
      {
        url: '/thumbnails/portfolio-preview.png',
        width: 1200,
        height: 630,
        alt: 'Abhi - Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Abhi - Full Stack Developer & Designer',
    description: 'Portfolio of Abhi - A passionate full-stack developer specializing in modern web technologies, UI/UX design, and creating stunning digital experiences',
    images: ['/thumbnails/portfolio-preview.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('scrollRestoration' in window.history) {
                window.history.scrollRestoration = 'manual';
              }
              window.scrollTo(0, 0);
            `,
          }}
        />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-x-hidden`}>
        <LoadingScreen />
        <div className="page-transition">
          {children}
        </div>
      </body>
    </html>
  )
}
