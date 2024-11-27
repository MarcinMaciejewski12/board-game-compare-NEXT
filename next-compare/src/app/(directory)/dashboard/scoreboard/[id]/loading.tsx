export default function Loading() {
  return (
    <div className="w-full h-full">
      <div className="w-full h-32 items-center justify-center flex">
        <div className="w-1/2 bg-gray-300 rounded-2xl animate-pulse h-20" />
      </div>
      <div className="w-full h-full flex items-center justify-center flex-col gap-2">
        <div className="p-2 flex items-center justify-center w-52 rounded-xl h-16 bg-gray-200 animate-pulse">
          <div className="w-[70%] h-7 bg-gray-300 rounded" />
        </div>
        <div className="p-2 flex items-center justify-center w-52 rounded-xl h-16 bg-gray-200 animate-pulse">
          <div className="w-[70%] h-7 bg-gray-300 rounded" />
        </div>
        <div className="p-2 flex items-center justify-center w-52 rounded-xl h-16 bg-gray-200 animate-pulse">
          <div className="w-[70%] h-7 bg-gray-300 rounded" />
        </div>
        <div className="p-2 flex items-center justify-center w-52 rounded-xl h-16 bg-gray-200 animate-pulse">
          <div className="w-[70%] h-7 bg-gray-300 rounded" />
        </div>
      </div>
      <div className="w-full flex flex-col gap-4 items-center justify-center mt-5">
        <div className="w-52 rounded animate-pulse flex items-center justify-center h-10 border border-gray-400">
          <div className="h-7 w-32 bg-gray-400 rounded-l" />
        </div>
        <div className="w-52 rounded animate-pulse flex items-center justify-center h-10 bg-buttonAndShadowColor">
          <div className="h-7 w-32 bg-gray-400 rounded-l" />
        </div>
      </div>
    </div>
  );
}
