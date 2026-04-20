function Button({ children, onClick, type = "button" }) {
  return (
    <button
      type={type}
      onClick={onClick}
      className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 transition"
    >
      {children}click
    </button>
  );
}

export default Button;