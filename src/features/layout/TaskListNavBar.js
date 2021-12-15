/*NOTE: The file that handles the navigation bar for the Tasklist Pages
uses react routing*/

/*TODO: add better styling, add the rest of the pages */

/**TODO: only display this nav bar if a user is signed in */

import { React } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { selectCategoryIds } from "../tasklist/categories/categorySlice";

import { Button } from "primereact/button";
import { Menubar } from "primereact/menubar";

const TaskListNavBar = () => {
  const categoryCount = useSelector(selectCategoryIds);

  const items = [
    {
      label: "Home",
      icon: "pi-menu-icon pi pi-fw pi-home",
      template: (item, options) => {
        return (
          <Link className={options.className} to="/">
            <span className={(options.iconClassName, item.icon)}></span>
            <span className={options.labelClassName}>{item.label}</span>
          </Link>
        );
      },
    },
    {
      label: "Task List",
      icon: "pi-menu-icon pi pi-fw pi-file",
      items: [
        {
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
        },
        {
          separator: true,
        },
        {
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
        },
        {
          ...(categoryCount.length > 0 && {
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
          }),
        },
        {
          separator: true,
        },
        {
          label: "Delete All",
          icon: "p-menuitem-icon pi-menu-icon pi pi-fw pi-trash",
        },
      ],
    },

    {
      label: "User Settings",
      icon: "pi-menu-icon pi pi-fw pi-user",
    },
  ];
  const start = <h3>Box It</h3>;
  const end = <Button>Logout</Button>;

  return (
    <header>
      <nav>
        <div>
          <div className="card">
            <Menubar model={items} start={start} end={end} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default TaskListNavBar;
