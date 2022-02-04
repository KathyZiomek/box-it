import { Link } from "react-router-dom";

export const DeleteAllLink = () => {
  return {
    label: "Delete All",
    icon: "p-menuitem-icon pi-menu-icon pi pi-fw pi-trash",
    template: (item, options) => {
      return (
        <Link className={options.className} to="/delete-all">
          <span className={(options.iconClassName, item.icon)}></span>
          <span className={options.labelClassName}>{item.label}</span>
        </Link>
      );
    },
  };
};
