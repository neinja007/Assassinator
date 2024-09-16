import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
const rubik = Rubik({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'PROJECT NAME',
  description: 'PROJECT DESCRIPTION'
};

const RootLayout = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html lang='en'>
      <body className={rubik.className}>
        <div className='min-h-screen pb-16 pt-24'>
          {/* <Navbar /> */}
          <div className='container mx-auto'>{children}</div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
