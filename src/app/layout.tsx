
import '@/src/styles/globals.css';

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
      </body>
    </html>
  );
}
