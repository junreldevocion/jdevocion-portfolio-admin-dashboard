import Sidebar from '@/src/modules/dashboard/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="relative w-full h-screen">
      {/* <div className="bg-indigo-400 absolute w-full h-2/4 -z-1"></div> */}
      <div className="m-auto grid grid-cols-12 relative h-full gap-4">
        <Sidebar />
        <div className="md:col-span-9 lg:col-span-10 mr-4">
          {children}
        </div>
      </div>
    </div>
  );
}