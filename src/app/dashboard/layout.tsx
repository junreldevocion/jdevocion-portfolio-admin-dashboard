import Sidebar from '@/src/modules/dashboard/sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="relative w-full h-screen">
      <div className="bg-indigo-400 absolute w-full h-2/4 -z-1"></div>
      <div className="container m-auto  grid grid-cols-12 pt-8 relative h-full">
        <Sidebar />
        <div className="col-span-10 ml-4">
          {children}
        </div>
      </div>
    </div>
  );
}