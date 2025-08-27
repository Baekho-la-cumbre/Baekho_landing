import React from "react";

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

export interface BootstrapIconProps extends React.HTMLAttributes<HTMLElement> {
  /** Nombre del ícono (ej: "play-circle-fill", "house", etc.) */
  name: string;
  /** Tamaño del ícono, cualquier valor válido en CSS (ej: "1em", "2rem", "24px") */
  size?: string | number;
  /** Clases adicionales de Tailwind o CSS */
  className?: string;
}

const BootstrapIcon: React.FC<BootstrapIconProps> = ({
  name,
  className = "",
  size = "1em",
  ...props
}) => {
  return (
    <i
      className={`bi bi-${name} ${className}`}
      style={{ fontSize: size }}
      {...props}
    />
  );
};

export default BootstrapIcon;
