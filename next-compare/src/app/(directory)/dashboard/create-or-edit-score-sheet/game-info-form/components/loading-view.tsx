export default function AddScoreBoardSkeleton() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-[50rem] h-96 bg-gray-200 rounded-xl shadow-lg p-2 flex gap-2">
        <div className="flex flex-col w-[50%] h-80 rounded bg-gray-300 gap-2 p-4">
          <div className="h-12 w-full bg-gray-400 rounded animate-pulse"></div>
          <div className="h-12 w-full bg-gray-400 rounded animate-pulse"></div>
          <div className="h-12 w-full bg-gray-400 rounded animate-pulse"></div>
          <div className="flex w-full h-12 justify-between">
            <div className="h-full w-[40%] bg-gray-400 rounded animate-pulse"></div>
            <div className="h-full w-[40%] bg-gray-400 rounded animate-pulse"></div>
          </div>
        </div>
        <div className="w-[50%] h-96">
          <div className="border-2 border-gray-300 h-56 w-full rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
