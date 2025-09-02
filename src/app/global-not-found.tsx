// Import global styles and fonts
import { Geist, Geist_Mono } from 'next/font/google'
import type { Metadata } from 'next'
import Link from 'next/link'
import './global-not-found.css'
 
const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
 
export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}
 
export default function GlobalNotFound() {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <h1>404</h1>
        <p>Cette page n&apos;existe pas</p>
        <Link href="/">Retourner à l&apos;accueil</Link>
      </body>
    </html>
  )
}