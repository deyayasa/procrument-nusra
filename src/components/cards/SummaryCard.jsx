import {
  FaChartPie,
  FaUniversity,
  FaFileAlt,
  FaTimesCircle,
} from "react-icons/fa";

const icons = {
  total: <FaChartPie size={38} />,
  bank: <FaUniversity size={38} />,
  dok: <FaFileAlt size={38} />,
  cancel: <FaTimesCircle size={38} />,
};

const SummaryCard = ({
  type,
  title,
  value,
  subtitle,
  bgColor,
}) => {
  return (
    <div
      className="rounded-2xl p-8 min-h-[170px] text-white shadow-xl hover:scale-105 transition-all duration-300"
      style={{ background: bgColor }}
    >
      <div className="flex items-center gap-6 h-full">

        {/* ICON */}
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-gray-700 flex-shrink-0">
          {icons[type]}
        </div>

        {/* TEXT */}
        <div className="flex flex-col flex-1">

          <h3 className="text-xl font-bold uppercase">
            {title}
          </h3>

          <h2 className="text-3xl font-extrabold mt-3 whitespace-nowrap">
            {value}
          </h2>

          <p className="mt-4 text-sm opacity-90">
            {subtitle}
          </p>

        </div>

      </div>
    </div>
  );
};

export default SummaryCard;