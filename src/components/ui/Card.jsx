const Card = ({
  children,
  title,
  className = '',
  titleClassName = '',
  bodyClassName = '',
  ...props
}) => {
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 ${className}`}
      {...props}
    >
      {title && (
        <div className={`px-4 py-3 bg-purple-50 border-b border-gray-100 ${titleClassName}`}>
          <h3 className="text-lg font-medium text-purple-800">{title}</h3>
        </div>
      )}
      <div className={`p-4 ${bodyClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Card;
