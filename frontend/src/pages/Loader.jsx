const Loader = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex justify-center items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/20 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-cyan-500/10 rounded-full blur-2xl animate-ping"></div>
      </div>

      {/* Main loader container */}
      <div className="relative z-10 flex flex-col items-center justify-center space-y-8">
        {/* Spinning rings loader */}
        <div className="relative">
          {/* Outer ring */}
          <div className="w-24 h-24 border-4 border-transparent border-t-blue-500 border-r-purple-500 rounded-full animate-spin"></div>

          {/* Middle ring */}
          <div className="absolute top-2 left-2 w-20 h-20 border-4 border-transparent border-t-purple-500 border-r-cyan-500 rounded-full animate-spin animate-reverse"></div>

          {/* Inner ring */}
          <div className="absolute top-4 left-4 w-16 h-16 border-4 border-transparent border-t-cyan-500 border-r-blue-500 rounded-full animate-spin"></div>

          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse"></div>
        </div>

        {/* Loading text with gradient */}
        <div className="text-center">
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
            Loading...
          </h2>
          <p className="text-gray-400 mt-2 animate-bounce">
            Please wait while we prepare everything for you
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-cyan-500 rounded-full animate-bounce delay-200"></div>
        </div>

        {/* Progress bar */}
        <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-full animate-pulse"></div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="absolute top-10 left-10 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-300"></div>
      <div className="absolute top-32 right-16 w-1 h-1 bg-purple-400 rounded-full animate-ping delay-500"></div>
      <div className="absolute bottom-32 left-32 w-3 h-3 bg-cyan-400 rounded-full animate-ping delay-700"></div>
      <div className="absolute bottom-16 right-40 w-2 h-2 bg-blue-300 rounded-full animate-ping delay-1000"></div>
    </div>
  );
};

export default Loader;
