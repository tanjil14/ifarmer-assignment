const LoadingSpinner = ({ fullScreen = true, bg = 'bg-white' }) => {
  return (
    <div
      className={`flex justify-center items-center ${
        fullScreen ? 'h-screen' : 'h-32'
      } ${bg}`}
    >
      <div className="relative flex space-x-2">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="w-4 h-4 bg-blue-500 rounded-full animate-bounce"
            style={{
              animationDelay: `${0.2 * index}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default LoadingSpinner;
