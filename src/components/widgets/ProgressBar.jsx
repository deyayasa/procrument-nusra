const data = [
  {
    title: "NDK DOK",
    value: "7.440.606.448",
    color: "bg-red-500",
    width: "76%",
  },
  {
    title: "OPEN DOK",
    value: "9.784.571.316",
    color: "bg-blue-500",
    width: "100%",
  },
];

const ProgressBar = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5 h-full">
      <h2 className="text-lg font-bold mb-5">
        TOTAL OPEN
      </h2>

      <div className="space-y-6">
        {data.map((item, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="font-semibold">
                {item.title}
              </span>

              <span>{item.value}</span>
            </div>

            <div className="bg-gray-200 rounded-full h-6">
              <div
                className={`${item.color} h-6 rounded-full`}
                style={{ width: item.width }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;