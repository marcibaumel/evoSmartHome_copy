import './globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Inter } from 'next/font/google'
import { Logo } from '@/src/components/Logo/Logo';
import Footer from '../layout/Footer/Footer';
import Navbar from '@/src/layout/Navbar/Navbar'
import StoreProvider from '../store/StoreProvider';
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'evoHome',
  description: 'evoHome Application',
}

const RootLayout = ({
  children,
}: {
  children: React.ReactNode
}) => {
  return (
    <StoreProvider>
      <html lang="en">
        <body className={inter.className}>
          <div>
            <Logo />
            <Navbar />
            <div style={{ margin: 30}}>{children}</div>
          </div>
        </body>
      </html>
    </StoreProvider>
  )
}

export default RootLayout