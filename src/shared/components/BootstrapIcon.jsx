import React from 'react';

/**
 * Componente reutilizable para Bootstrap Icons
 * 
 * Ejemplos de uso:
 * <BootstrapIcon name="play-circle-fill" size="1.5rem" />
 * <BootstrapIcon name="house" className="text-red-500" />
 * <BootstrapIcon name="arrow-right" size="2rem" />
 * 
 * Nombres de íconos disponibles: https://icons.getbootstrap.com/
 */
const BootstrapIcon = ({ name, className = "", size = "1em", ...props }) => {
  return (
    <i 
      className={`bi bi-${name} ${className}`} 
      style={{ fontSize: size }}
      {...props}
    />
  );
};

export default BootstrapIcon;
