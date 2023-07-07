import React from "react";

function Button({ title, onClick, variant = "primary-contained", disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
     px-5 h-10
     ${
       variant === "primary-contained" &&
       "bg-primary text-white rounded hover:bg-indigo-300 hover:text-primary hover:border"
     }
     ${
       variant === "primary-outlined" &&
       "border-primary text-primary bg-white border rounded hover:bg-primary hover:text-white"
     }
     ${disabled && "opacity-50 cursor-not-allowed"}
     `}
    >
      {title}
    </button>
  );
}

export default Button;
