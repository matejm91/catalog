type Button = {
  onClick: () => void,
  title: string,
  disabled?: boolean,
  className?: string
}

const Button = ({ onClick, title, disabled, className }: Button) => {
  return <button
    className={`mx-2 border border-[#ddd] p-3 rounded-lg ${disabled ? "text-[#ddd]" : ""} ${className}`}
    onClick={onClick}
    disabled={disabled}
  >
    {title}
  </button>
}

export default Button;