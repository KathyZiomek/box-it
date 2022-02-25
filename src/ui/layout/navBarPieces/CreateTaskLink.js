import { Link } from "react-router-dom";

export const CreateTaskLink = () => {
  return {
    label: "Create a Task",
    icon: "p-menuitem-icon pi-menu-icon pi pi-fw pi-plus",
    template: (item, options) => {
      return (
        <Link className={options.className} to="/create-task">
          <span className={(options.iconClassName, item.icon)}></span>
          <span className={options.labelClassName}>{item.label}</span>
        </Link>
      );
    },
  };
};
