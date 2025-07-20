export const metadata = {
  title: 'Auth page',
  description: 'Portfolio Auth Page',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-full">
      <div className="bg-indigo-400 h-1/2 absolute w-full -z-1 top-0"></div>
      <div className="flex items-center flex-col justify-center h-full">
        <h1 className="text-white font-extrabold text-2xl">JdevAdmin</h1>
        {children}
      </div>
    </div>
  );
}