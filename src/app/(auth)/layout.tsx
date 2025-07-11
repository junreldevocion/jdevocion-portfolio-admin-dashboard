export default function RootLayout({ children }: { children: React.ReactNode }) {

  return (
    <div className="h-screen w-full">
      <div className="bg-indigo-400 h-1/4 absolute w-full -z-1 top-0"></div>
      <div className="mt-32">
        {children}
      </div>
    </div>
  );
}