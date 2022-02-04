import { Link } from "react-router-dom";

export const HomeLink = () => {
  return {
    label: "Home",
    icon: "p-menuitem-icon pi-menu-icon pi pi-fw pi-home",
    template: (item, options) => {
      return (
        <Link className={options.className} to="/">
          <span className={(options.iconClassName, item.icon)}></span>
          <span className={options.labelClassName}>{item.label}</span>
        </Link>
      );
    },
  };
};
