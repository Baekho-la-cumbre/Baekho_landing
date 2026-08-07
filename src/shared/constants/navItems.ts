export type NavItem = {
  label: string;
  id: string;
  href: string;
  isRoute?: boolean;
};

export const navItems: NavItem[] = [
  { label: "Inicio", id: "inicio", href: "/#inicio" },
  { label: "Historia", id: "historia", href: "/#historia" },
  { label: "Filosofía", id: "filosofia", href: "/#filosofia" },
  { label: "Galería", id: "galeria", href: "/#galeria" },
  { label: "Logros", id: "logros", href: "/logros", isRoute: true },
  { label: "Deportistas", id: "deportistas", href: "/deportistas", isRoute: true },
  { label: "Contacto", id: "contacto", href: "/#contacto" },
];

export const sectionNavItems = navItems.filter((item) => !item.isRoute);
