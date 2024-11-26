export default function CardLoading() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="h-12 w-52 bg-gray-400/80 animate-pulse rounded-xl" />
        <div className="h-12 w-52 bg-gray-400/80 animate-pulse rounded-xl" />
      </div>
      <div className="flex gap-2">
        <div className="min-h-[23rem] h-56 bg-gray-300/80 rounded-xl max-h-56 w-72">
          <div className="w-full h-[60%] bg-gray-400/80 animate-pulse rounded-xl" />
          <div className="w-full h-[40%] bg-gray-300/80 rounded-xl animate-pulse flex flex-col items-center justify-around">
            <div className="rounded w-52 h-8 bg-gray-400/80"></div>
            <div className="rounded w-32 h-8 bg-gray-400/80"></div>
          </div>
        </div>
        <div className="min-h-[23rem] h-56 bg-gray-300/80 rounded-xl max-h-56 w-72">
          <div className="w-full h-[60%] bg-gray-400/80  animate-pulse rounded-xl" />
          <div className="w-full h-[40%] bg-gray-300/80  animate-pulse rounded-xl flex flex-col items-center justify-around">
            <div className="rounded w-52 h-8 bg-gray-400/80"></div>
            <div className="rounded w-32 h-8 bg-gray-400/80"></div>
          </div>
        </div>
        <div className="min-h-[23rem] h-56 bg-gray-300/80  rounded-xl max-h-56 w-72">
          <div className="w-full h-[60%] bg-gray-400/80 animate-pulse rounded-xl" />
          <div className="w-full h-[40%] bg-gray-300/80 animate-pulse rounded-xl flex flex-col items-center justify-around">
            <div className="rounded w-52 h-8 bg-gray-400/80"></div>
            <div className="rounded w-32 h-8 bg-gray-400/80"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
