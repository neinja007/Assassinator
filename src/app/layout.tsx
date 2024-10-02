import { Rubik } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { metadata as appMetadata } from '@/data/metadata';
import '@/app/globals.css';
const rubik = Rubik({ subsets: ['latin'] });

export const metadata = appMetadata;

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <body className={rubik.className}>
        <div className='min-h-screen pt-16'>
          <div className='container mx-auto'>{children}</div>
        </div>
      </body>
      <Analytics />
    </html>
  );
};

export default RootLayout;
