const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  onClick,
  fullWidth = false,
  ...props
}) => {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variantClasses = {
    primary: 'bg-purple-500 text-white hover:bg-purple-600 focus:ring-purple-500',
    secondary: 'bg-teal-500 text-white hover:bg-teal-600 focus:ring-teal-500',
    danger: 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-500',
    outline: 'bg-transparent border border-purple-500 text-purple-500 hover:bg-purple-50 focus:ring-purple-500',
    ghost: 'bg-transparent text-purple-500 hover:bg-purple-50 focus:ring-purple-500',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : '';

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
