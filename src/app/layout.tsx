
import '@/src/styles/globals.css';
import { Toaster } from 'sonner';

export const metadata = {
  title: 'Admin Dashboard',
  description: 'Portfolio Admin Panel',
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className="">
        {children}
        <Toaster position='top-center' richColors />
      </body>
    </html>
  );
}
