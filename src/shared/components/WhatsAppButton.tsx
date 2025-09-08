import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const WhatsAppButton: React.FC = () => {
  const phoneNumber = "573177688456"; 
  const message = "Hola, quiero más información";

  const handleClick = () => {
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed z-20 flex items-center justify-center text-white transition-transform transform bg-green-500 rounded-full shadow-lg cursor-pointer bottom-6 right-6 hover:bg-green-400 w-14 h-14 hover:scale-110"
      aria-label="WhatsApp"
    >
      <FaWhatsapp size={28} />
    </button>
  );
};

export default WhatsAppButton;