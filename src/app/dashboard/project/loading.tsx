export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return <div className="flex items-center justify-center h-full">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-200"></div>
  </div>;
}