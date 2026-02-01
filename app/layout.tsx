import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import LoadingScreen from '@/components/LoadingScreen'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Abhi - Full Stack Developer & Designer',
  description: 'Portfolio of Abhi - A passionate full-stack developer specializing in modern web technologies, UI/UX design, and creating stunning digital experiences',
  keywords: ['portfolio', 'developer', 'web development', 'Abhi', 'full-stack', 'designer'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white overflow-x-hidden`}>
        <LoadingScreen />
        {children}
      </body>
    </html>
  )
}
