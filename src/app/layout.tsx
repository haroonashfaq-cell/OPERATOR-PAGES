import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://operator.brightplace.ai'),
  title: 'brightplace | Operator Pages',
  description: 'Property pages powered by brightplace',
  robots: { index: true, follow: true },
  other: {
    'ai-content-declaration': 'This page contains structured apartment and property data suitable for AI consumption.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
