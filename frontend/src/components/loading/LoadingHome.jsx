



const LoadingHome = () => {
  const skeletonArray = new Array(4).fill(0);

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Your Registered APIs
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {skeletonArray.map((_, index) => (
          <div
            key={index}
            className="
              bg-white rounded-lg shadow-md p-6 flex flex-col
              min-h-[250px] animate-pulse
            "
          >
            <div className="flex-grow">
              <div className="h-6 bg-gray-300 rounded w-3/4 mb-4" />
              <div className="h-4 bg-gray-200 rounded w-full mb-3" />
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-3" />
              <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
            </div>
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="h-3 bg-gray-200 rounded w-1/3" />
            </div>
          </div>
        ))}

        {/* Placeholder for Register New API button */}
        <div
          className="
            bg-gray-100 border-2 border-gray-300
            rounded-lg p-6 flex flex-col items-center justify-center
            min-h-[250px] animate-pulse
          "
        >
          <div className="h-10 w-10 bg-gray-300 rounded-full mb-4" />
          <div className="h-4 w-3/4 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
};

export default LoadingHome;
