import { Link } from "react-router-dom";

export const ViewAllTasksLink = () => {
  return {
    label: "View All Tasks",
    icon: "p-menuitem-icon pi-menu-icon pi pi-fw pi-external-link",
    template: (item, options) => {
      return (
        <Link className={options.className} to="/tasklist">
          <span className={(options.iconClassName, item.icon)}></span>
          <span className={options.labelClassName}>{item.label}</span>
        </Link>
      );
    },
  };
};
