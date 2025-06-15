const CardSkeleton = () => (
  <div className="w-full max-w-xl bg-grey text-white p-6 rounded-xl animate-pulse">
    <div className="h-6 w-1/3 bg-gray-600 mb-4 rounded" />
    <div className="space-y-2">
      <div className="h-4 w-3/4 bg-gray-700 rounded" />
      <div className="h-4 w-1/2 bg-gray-700 rounded" />
      <div className="h-4 w-2/3 bg-gray-700 rounded" />
    </div>
  </div>
);

export default CardSkeleton;
