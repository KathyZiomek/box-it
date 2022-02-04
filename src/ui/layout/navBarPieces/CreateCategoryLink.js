import { Link } from "react-router-dom";

export const CreateCategoryLink = () => {
  return {
    label: "Create a Category",
    icon: "p-menuitem-icon pi-menu-icon pi pi-fw pi-plus",
    template: (item, options) => {
      return (
        <Link className={options.className} to="/create-category">
          <span className={(options.iconClassName, item.icon)}></span>
          <span className={options.labelClassName}>{item.label}</span>
        </Link>
      );
    },
  };
};
