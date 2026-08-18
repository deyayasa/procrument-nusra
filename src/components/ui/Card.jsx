const Card = ({ title, children }) => {
  return (
    <div
      className="
      bg-white
      rounded-xl
      border
      border-gray-200
      shadow-sm
      "
    >

      {title && (

        <div className="bg-blue-900 text-white font-bold text-center py-3 rounded-t-xl">

          {title}

        </div>

      )}

      <div className="p-5">

        {children}

      </div>

    </div>
  );
};

export default Card;