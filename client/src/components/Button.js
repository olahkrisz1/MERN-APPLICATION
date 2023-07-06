import React from "react";

function Button({ title, onClick, variant = "primary-contained", disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
     px-5 h-10
     ${variant === "primary-contained" && "bg-primary text-white rounded"}
     ${
       variant === "primary-outlined" &&
       "border-primary text-primary bg-white border rounded"
     }
     ${disabled && "opacity-50 cursor-not-allowed"}
     `}
    >
      {title}
    </button>
  );
}

export default Button;
