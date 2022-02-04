import { Link } from "react-router-dom";

export const UserSettingsLink = () => {
  return {
    label: "User Settings",
    icon: "p-menuitem-icon pi-menu-icon pi pi-fw pi-user",
    template: (item, options) => {
      return (
        <Link className={options.className} to="/user-settings">
          <span className={(options.iconClassName, item.icon)}></span>
          <span className={options.labelClassName}>{item.label}</span>
        </Link>
      );
    },
  };
};
